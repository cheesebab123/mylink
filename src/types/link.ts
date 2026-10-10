export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  badge?: string;
  category?: string;
  clicks: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateLinkInput = Omit<LinkItem, "id" | "clicks" | "createdAt" | "updatedAt">;
export type UpdateLinkInput = Partial<CreateLinkInput>;
