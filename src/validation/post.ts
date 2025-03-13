import { z } from "zod";

export const createPostschema = z.object({
  name: z
    .string({ required_error: "Tên dự án là bắt buộc" })
    .min(1, "Email là bắt buộc"),
  url: z
    .string().optional(),
  tags: z.string({ required_error: "Tên dự án là bắt buộc" })
    .min(1, "Email là bắt buộc"),
});
