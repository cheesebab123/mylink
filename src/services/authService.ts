import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthUser } from "@/types";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Firebase User 객체를 앱 내부 AuthUser 타입으로 변환
 */
export function mapFirebaseUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
}

/**
 * Google 소셜 로그인 (팝업)
 */
export async function loginWithGoogle(): Promise<AuthUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return mapFirebaseUser(result.user);
  } catch (error) {
    console.error("Google 소셜 로그인 실패:", error);
    throw error;
  }
}

/**
 * 로그아웃
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
}

/**
 * onAuthStateChanged로 로그인 상태 변화 감지 구독
 */
export function subscribeAuthState(
  callback: (user: AuthUser | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(mapFirebaseUser(firebaseUser));
  });
}
