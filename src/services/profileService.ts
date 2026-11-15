import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AuthUser, ProfileData, ThemeType } from "@/types";
import { DUMMY_PROFILE } from "@/data/mockData";

const DEFAULT_USER_ID = "anonymous";

export class UsernameTakenError extends Error {
  constructor(username: string) {
    super(`이미 사용 중인 username입니다: ${username}`);
    this.name = "UsernameTakenError";
  }
}

function getProfileDocRef(userId: string = DEFAULT_USER_ID) {
  const safeUserId = userId || DEFAULT_USER_ID;
  return doc(db, "users", safeUserId, "profiles", "main");
}

function getUserRootDocRef(userId: string = DEFAULT_USER_ID) {
  const safeUserId = userId || DEFAULT_USER_ID;
  return doc(db, "users", safeUserId);
}

/**
 * 이메일 앞부분으로부터 기본 username 자동 생성
 */
export function generateUsernameFromEmail(email?: string | null, fallbackHandle?: string): string {
  const raw = email?.split("@")[0] || fallbackHandle?.replace(/^@/, "") || "user";
  const normalized = raw.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (normalized.length >= 3) return normalized.slice(0, 30);
  return `${normalized}user`.slice(0, 30);
}

/**
 * username으로 해당 사용자의 uid 조회 (공유 링크 ?u=username 용)
 */
export async function getUidByUsername(username: string): Promise<string | null> {
  const normalized = username.trim().toLowerCase();
  if (!normalized) return null;

  try {
    const usernameRef = doc(db, "usernames", normalized);
    const snapshot = await getDoc(usernameRef);
    if (!snapshot.exists()) return null;
    return (snapshot.data().uid as string) || null;
  } catch (error) {
    console.error("Failed to fetch uid by username:", error);
    return null;
  }
}

/**
 * username 사용 가능 여부(중복 체크) 확인
 */
export async function checkUsernameAvailable(
  username: string,
  currentUserId: string = DEFAULT_USER_ID
): Promise<boolean> {
  const normalized = username.trim().toLowerCase();
  if (!normalized) return false;

  const usernameRef = doc(db, "usernames", normalized);
  const snapshot = await getDoc(usernameRef);

  if (!snapshot.exists()) {
    return true;
  }

  const data = snapshot.data();
  return data.uid === currentUserId;
}

/**
 * undefined 값을 Firestore 저장에 안전하게 제거하는 헬퍼 함수
 */
function cleanUndefinedFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      result[key] = val;
    }
  }
  return result as Partial<T>;
}

/**
 * Firestore users/{userId}/profiles/main 경로에서 프로필 데이터 1회 조회 (getDoc)
 * 문서가 없을 경우 기본 프로필 데이터를 Firestore에 자동 생성합니다.
 */
export async function getProfile(
  userId: string = DEFAULT_USER_ID,
  authUser?: AuthUser | null
): Promise<ProfileData> {
  const safeUserId = userId || DEFAULT_USER_ID;
  const autoUsername = generateUsernameFromEmail(authUser?.email, DUMMY_PROFILE.handle);
  const defaultDisplayName = authUser?.displayName || DUMMY_PROFILE.name;

  const fallbackProfile: ProfileData =
    authUser && safeUserId !== DEFAULT_USER_ID
      ? {
          ...DUMMY_PROFILE,
          username: autoUsername,
          displayName: defaultDisplayName,
          name: defaultDisplayName,
          handle: `@${autoUsername}`,
          avatarText: defaultDisplayName.charAt(0),
          avatarUrl: authUser.photoURL || "",
          email: authUser.email || DUMMY_PROFILE.email,
        }
      : {
          ...DUMMY_PROFILE,
          username: DUMMY_PROFILE.handle.replace(/^@/, "").toLowerCase(),
          displayName: DUMMY_PROFILE.name,
        };

  try {
    const profileDocRef = getProfileDocRef(safeUserId);
    const snapshot = await getDoc(profileDocRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const resolvedName = data.displayName ?? data.name ?? fallbackProfile.name;
      let resolvedUsername =
        data.username ??
        generateUsernameFromEmail(data.email || authUser?.email, data.handle || fallbackProfile.handle);

      // 본인 로그인 상태인데 usernames/{username} 매핑이 누락된 기존 계정이면 자동 보정
      if (authUser && safeUserId !== DEFAULT_USER_ID) {
        try {
          const usernameRef = doc(db, "usernames", resolvedUsername);
          const usernameSnap = await getDoc(usernameRef);
          if (!usernameSnap.exists()) {
            await setDoc(usernameRef, {
              uid: safeUserId,
              updatedAt: new Date().toISOString(),
            });
            if (!data.username) {
              await setDoc(
                profileDocRef,
                { username: resolvedUsername, displayName: resolvedName },
                { merge: true }
              );
            }
          } else if (usernameSnap.data().uid !== safeUserId && !data.username) {
            resolvedUsername = `${resolvedUsername}_${safeUserId.slice(0, 4).toLowerCase()}`.slice(0, 30);
            await setDoc(doc(db, "usernames", resolvedUsername), {
              uid: safeUserId,
              updatedAt: new Date().toISOString(),
            });
            await setDoc(
              profileDocRef,
              { username: resolvedUsername, displayName: resolvedName },
              { merge: true }
            );
          }
        } catch (syncError) {
          console.error("Failed to sync missing username mapping:", syncError);
        }
      }

      return {
        username: resolvedUsername,
        displayName: resolvedName,
        theme: (data.theme as ThemeType) || "toss",
        name: resolvedName,
        handle: data.handle ?? `@${resolvedUsername}`,
        avatarText: data.avatarText ?? fallbackProfile.avatarText,
        avatarUrl: data.avatarUrl ?? fallbackProfile.avatarUrl,
        role: data.role ?? fallbackProfile.role,
        bio: data.bio ?? fallbackProfile.bio,
        email: data.email ?? fallbackProfile.email,
        statusBadge: data.statusBadge ?? fallbackProfile.statusBadge,
        isStatusOn: data.isStatusOn ?? fallbackProfile.isStatusOn,
        skills: Array.isArray(data.skills) ? data.skills : fallbackProfile.skills,
      };
    }

    // 문서가 아예 없을 경우 기본 데이터를 Firestore에 생성(Auto-seeding)
    // 초기 자동 생성 시 username 중복이 발생하면 uid 일부를 붙여 충돌 방지
    const isAvailable = await checkUsernameAvailable(fallbackProfile.username || autoUsername, safeUserId);
    if (!isAvailable && safeUserId !== DEFAULT_USER_ID) {
      const uniqueUsername = `${autoUsername}_${safeUserId.slice(0, 4).toLowerCase()}`.slice(0, 30);
      fallbackProfile.username = uniqueUsername;
      fallbackProfile.handle = `@${uniqueUsername}`;
    }

    await updateProfileInFirestore(fallbackProfile, safeUserId);
    return fallbackProfile;
  } catch (error) {
    console.error(`Failed to fetch profile from Firestore users/${safeUserId}/profiles/main:`, error);
    return fallbackProfile;
  }
}

/**
 * Firestore users/{userId}/profiles/main 및 users/{userId}.profile 경로에 프로필 데이터 저장 및 업데이트
 * 저장 전 username 중복 체크를 수행합니다.
 */
export async function updateProfileInFirestore(
  profile: ProfileData,
  userId: string = DEFAULT_USER_ID,
  previousUsername?: string
): Promise<void> {
  const safeUserId = userId || DEFAULT_USER_ID;
  const normalizedUsername = (
    profile.username ||
    profile.handle.replace(/^@/, "") ||
    generateUsernameFromEmail(profile.email)
  )
    .trim()
    .toLowerCase();

  const resolvedDisplayName = (profile.displayName || profile.name).trim();

  try {
    // 저장 전 username 중복 체크
    const isAvailable = await checkUsernameAvailable(normalizedUsername, safeUserId);
    if (!isAvailable) {
      throw new UsernameTakenError(normalizedUsername);
    }

    const now = new Date().toISOString();
    const profileDocRef = getProfileDocRef(safeUserId);
    const userRootDocRef = getUserRootDocRef(safeUserId);

    const cleanData = cleanUndefinedFields({
      username: normalizedUsername,
      displayName: resolvedDisplayName,
      theme: profile.theme || "toss",
      name: resolvedDisplayName,
      handle: profile.handle?.trim() || `@${normalizedUsername}`,
      avatarText: profile.avatarText?.trim() || resolvedDisplayName.charAt(0) || "최",
      avatarUrl: profile.avatarUrl || "",
      role: profile.role?.trim() || "",
      bio: profile.bio?.trim() || "",
      email: profile.email.trim(),
      statusBadge: profile.statusBadge?.trim() || "",
      isStatusOn: profile.isStatusOn ?? true,
      skills: profile.skills || [],
      updatedAt: now,
    });

    // 1. usernames/{username} 점유 등록
    await setDoc(doc(db, "usernames", normalizedUsername), {
      uid: safeUserId,
      updatedAt: now,
    });

    // 이전 username과 달라졌으면 이전 점유 해제
    if (previousUsername && previousUsername.toLowerCase() !== normalizedUsername) {
      const oldUsernameRef = doc(db, "usernames", previousUsername.toLowerCase());
      const oldSnap = await getDoc(oldUsernameRef);
      if (oldSnap.exists() && oldSnap.data().uid === safeUserId) {
        await deleteDoc(oldUsernameRef);
      }
    }

    // 2. users/{userId}/profiles/main 및 users/{userId}.profile 저장
    await setDoc(profileDocRef, cleanData, { merge: true });
    await setDoc(
      userRootDocRef,
      {
        profile: {
          username: normalizedUsername,
          displayName: resolvedDisplayName,
          bio: profile.bio?.trim() || "",
          updatedAt: now,
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.error(`Failed to update profile in Firestore users/${safeUserId}/profiles/main:`, error);
    throw error;
  }
}

/**
 * 사용자의 선택 테마(theme)를 Firestore 프로필에 저장
 */
export async function updateProfileThemeInFirestore(
  theme: ThemeType,
  userId: string = DEFAULT_USER_ID
): Promise<void> {
  const safeUserId = userId || DEFAULT_USER_ID;
  try {
    const profileDocRef = getProfileDocRef(safeUserId);
    await setDoc(
      profileDocRef,
      {
        theme,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error(`Failed to update theme in Firestore users/${safeUserId}/profiles/main:`, error);
  }
}
