import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LinkItem, CreateLinkInput, UpdateLinkInput } from "@/types";

const LINKS_COLLECTION_PATH = "users/anonymous/links";

/**
 * users/anonymous/links Firestore 컬렉션 참조 반환
 */
function getLinksCollectionRef() {
  return collection(db, "users", "anonymous", "links");
}

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
 * Firestore users/anonymous/links에 새 링크 추가
 */
export async function createLink(input: CreateLinkInput): Promise<LinkItem> {
  const now = new Date().toISOString();
  const colRef = getLinksCollectionRef();

  const linkData = cleanUndefinedFields({
    title: input.title.trim(),
    url: input.url.trim(),
    description: input.description?.trim() || "",
    icon: input.icon || "Globe",
    badge: input.badge?.trim() || "",
    category: input.category || "일반",
    clicks: 0,
    isActive: input.isActive ?? true,
    order: input.order ?? Date.now(),
    createdAt: now,
    updatedAt: now,
  });

  const docRef = await addDoc(colRef, linkData);

  return {
    id: docRef.id,
    title: linkData.title as string,
    url: linkData.url as string,
    description: linkData.description as string,
    icon: linkData.icon as string,
    badge: linkData.badge as string,
    category: linkData.category as string,
    clicks: linkData.clicks as number,
    isActive: linkData.isActive as boolean,
    order: linkData.order as number,
    createdAt: linkData.createdAt as string,
    updatedAt: linkData.updatedAt as string,
  };
}

/**
 * Firestore users/anonymous/links에서 모든 링크 조회 (getDocs 사용, createdAt 최신순 정렬)
 */
export async function getLinks(): Promise<LinkItem[]> {
  try {
    const colRef = getLinksCollectionRef();
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || "",
        url: data.url || "",
        description: data.description || "",
        icon: data.icon || "Globe",
        badge: data.badge || "",
        category: data.category || "",
        clicks: data.clicks || 0,
        isActive: data.isActive ?? true,
        order: data.order || 0,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Failed to fetch links from Firestore using getDocs:", error);
    return [];
  }
}

/**
 * Firestore 링크 수정
 */
export async function updateLink(id: string, input: UpdateLinkInput): Promise<void> {
  const docRef = doc(db, LINKS_COLLECTION_PATH, id);
  const updateData = cleanUndefinedFields({
    ...input,
    updatedAt: new Date().toISOString(),
  });
  await updateDoc(docRef, updateData);
}

/**
 * Firestore 링크 활성/비활성 토글
 */
export async function toggleLinkActive(id: string, currentActive: boolean): Promise<void> {
  const docRef = doc(db, LINKS_COLLECTION_PATH, id);
  await updateDoc(docRef, {
    isActive: !currentActive,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Firestore 링크 삭제
 */
export async function deleteLink(id: string): Promise<void> {
  const docRef = doc(db, LINKS_COLLECTION_PATH, id);
  await deleteDoc(docRef);
}

/**
 * Firestore 링크 클릭수 증가
 */
export async function incrementClick(id: string): Promise<void> {
  const docRef = doc(db, LINKS_COLLECTION_PATH, id);
  await updateDoc(docRef, {
    clicks: increment(1),
    updatedAt: new Date().toISOString(),
  });
}
