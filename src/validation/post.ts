import { z } from "zod";

import { PostVerificationType } from "@/types";

// Define the maximum file size (5MB for images, 100MB for project files)
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_PROJECT_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Define allowed file types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ACCEPTED_PROJECT_FILE_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
];

// Base schema without refinements
const baseProfileFormSchema = z.object({
  // Name is required with min and max length
  name: z
    .string()
    .min(1, "Tiêu đề dự án là bắt buộc")
    .max(100, "Tiêu đề dự án không được vượt quá 100 ký tự"),

  // URL is optional but must be a valid URL if provided
  type: z.enum(["normal", "project"]).default("normal"),

  // Image is optional but must be valid if provided
  image: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          "Kích thước tệp không được vượt quá 5MB"
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Chỉ chấp nhận các định dạng .jpg, .jpeg, .png và .webp"
        )
    )
    .default([])
    .transform((val) => (Array.isArray(val) ? val : [val].filter(Boolean))),

  // Tags is a string (will be processed as comma-separated values)
  tags: z.string().max(200, "Tags không được vượt quá 200 ký tự"),

  // Content is required with min length
  content: z
    .string()
    .min(1, "Nội dung bài viết là bắt buộc")
    .max(10000, "Nội dung bài viết không được vượt quá 10000 ký tự"),

  // Project file (ZIP) - only for project type posts
  projectFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_PROJECT_FILE_SIZE,
      "Kích thước tệp không được vượt quá 100MB"
    )
    .refine(
      (file) => ACCEPTED_PROJECT_FILE_TYPES.includes(file.type),
      "Chỉ chấp nhận tệp ZIP"
    )
    .optional(),

  // Project link - only for project type posts
  projectLink: z
    .string()
    .url("Đường dẫn không hợp lệ")
    .optional()
    .or(z.literal("")),
});

// Profile form schema with validation refinements
export const profileFormSchema = baseProfileFormSchema.refine(
  (data) => {
    // If type is "project", at least one of projectFile or projectLink should be provided
    if (data.type === "project") {
      return data.projectFile || (data.projectLink && data.projectLink !== "");
    }
    return true;
  },
  {
    message: "Dự án phải có ít nhất một tệp ZIP hoặc link dự án",
    path: ["projectFile"], // This will show the error on the projectFile field
  }
);

// Define the type based on the schema
export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// You can extend the schema for the API if needed (using base schema)
export const profileApiSchema = baseProfileFormSchema.extend({
  isVerified: z.nativeEnum(PostVerificationType),
});
