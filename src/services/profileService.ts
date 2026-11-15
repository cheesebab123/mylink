import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProfileData } from "@/types";
import { DUMMY_PROFILE } from "@/data/mockData";

const PROFILES_DOC_PATH = ["users", "anonymous", "profiles", "main"] as const;

/**
 * undefined 값을 Firestore 저장에 안전하게 제거하는 헬퍼 함수
 */
function cleanUndefinedFields<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      result[key] = val;
    }
  }
  return result as Partial<T>;
}

/**
 * Firestore users/anonymous/profiles/main 경로에서 프로필 데이터 1회 조회 (getDoc)
 * 문서가 없을 경우 기본 프로필 데이터를 Firestore에 자동 생성합니다.
 */
export async function getProfile(): Promise<ProfileData> {
  try {
    const profileDocRef = doc(db, PROFILES_DOC_PATH[0], PROFILES_DOC_PATH[1], PROFILES_DOC_PATH[2], PROFILES_DOC_PATH[3]);
    const snapshot = await getDoc(profileDocRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        name: data.name ?? DUMMY_PROFILE.name,
        handle: data.handle ?? DUMMY_PROFILE.handle,
        avatarText: data.avatarText ?? DUMMY_PROFILE.avatarText,
        avatarUrl: data.avatarUrl ?? DUMMY_PROFILE.avatarUrl,
        role: data.role ?? DUMMY_PROFILE.role,
        bio: data.bio ?? DUMMY_PROFILE.bio,
        email: data.email ?? DUMMY_PROFILE.email,
        statusBadge: data.statusBadge ?? DUMMY_PROFILE.statusBadge,
        isStatusOn: data.isStatusOn ?? DUMMY_PROFILE.isStatusOn,
        skills: Array.isArray(data.skills) ? data.skills : DUMMY_PROFILE.skills,
      };
    }

    // 문서가 아예 없을 경우 기본 데이터를 Firestore에 생성(Auto-seeding)
    await updateProfileInFirestore(DUMMY_PROFILE);
    return DUMMY_PROFILE;
  } catch (error) {
    console.error("Failed to fetch profile from Firestore users/anonymous/profiles/main:", error);
    return DUMMY_PROFILE;
  }
}

/**
 * Firestore users/anonymous/profiles/main 경로에 프로필 데이터 저장 및 업데이트 (setDoc merge)
 */
export async function updateProfileInFirestore(profile: ProfileData): Promise<void> {
  try {
    const profileDocRef = doc(db, PROFILES_DOC_PATH[0], PROFILES_DOC_PATH[1], PROFILES_DOC_PATH[2], PROFILES_DOC_PATH[3]);
    const cleanData = cleanUndefinedFields({
      name: profile.name.trim(),
      handle: profile.handle.trim(),
      avatarText: profile.avatarText?.trim() || profile.name.charAt(0) || "최",
      avatarUrl: profile.avatarUrl || "",
      role: profile.role?.trim() || "",
      bio: profile.bio?.trim() || "",
      email: profile.email.trim(),
      statusBadge: profile.statusBadge?.trim() || "",
      isStatusOn: profile.isStatusOn ?? true,
      skills: profile.skills || [],
      updatedAt: new Date().toISOString(),
    });

    await setDoc(profileDocRef, cleanData, { merge: true });
  } catch (error) {
    console.error("Failed to update profile in Firestore users/anonymous/profiles/main:", error);
    throw error;
  }
}
