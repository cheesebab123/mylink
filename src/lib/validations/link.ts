import { z } from "zod";

export const addLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "링크 제목을 입력해주세요." })
    .max(50, { message: "제목은 50자 이내로 입력해주세요." }),
  url: z
    .string()
    .trim()
    .min(1, { message: "URL 주소를 입력해주세요." })
    .refine(
      (val) => {
        try {
          const formatted =
            val.startsWith("http://") ||
            val.startsWith("https://") ||
            val.startsWith("mailto:")
              ? val
              : `https://${val}`;
          const parsed = new URL(formatted);
          return Boolean(parsed.hostname && parsed.hostname.includes("."));
        } catch {
          return false;
        }
      },
      {
        message: "올바른 웹사이트 URL 형식을 입력해주세요. (예: https://github.com 또는 velog.io)",
      }
    ),
  description: z
    .string()
    .trim()
    .max(100, { message: "설명은 100자 이내로 입력해주세요." })
    .optional(),
  icon: z.string(),
  badge: z
    .string()
    .trim()
    .max(20, { message: "뱃지 태그는 20자 이내로 입력해주세요." })
    .optional(),
});

export type AddLinkFormValues = z.infer<typeof addLinkSchema>;
