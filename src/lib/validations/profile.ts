import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .max(30, "이름은 30자 이내로 입력해주세요."),
  handle: z
    .string()
    .min(1, "핸들을 입력해주세요.")
    .max(30, "핸들은 30자 이내로 입력해주세요."),
  avatarText: z
    .string()
    .max(4, "아바타 표시는 4자 이내로 입력해주세요.")
    .optional(),
  role: z
    .string()
    .max(40, "직무/역할은 40자 이내로 입력해주세요.")
    .optional(),
  bio: z
    .string()
    .max(200, "소개글은 200자 이내로 입력해주세요.")
    .optional(),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 주소 형식을 입력해주세요."),
  statusBadge: z
    .string()
    .max(40, "상태 문구는 40자 이내로 입력해주세요.")
    .optional(),
  isStatusOn: z.boolean(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
