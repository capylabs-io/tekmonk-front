import { z } from "zod";

const phoneRegex = /^(\+84|0)\d{9,10}$/;

const UpdateInfoStep1Schema = z.object({
  fullName: z
    .string({ required_error: "Họ tên là bắt buộc" })
    .min(5, "Họ tên phải có ít nhất 5 ký tự")
    .min(1, "Họ tên là bắt buộc"),
  schoolName: z
    .string({ required_error: "Trường học là bắt buộc" })
    .min(1, "Trường học là bắt buộc"),
  studentAddress: z.string().optional(),
  dateOfBirth: z.date({ required_error: "Ngày sinh là bắt buộc" }),
  className: z
    .string({ required_error: "Tên lớp học là bắt buộc" })
    .min(1, "Tên lớp học là bắt buộc"),
  schoolAddress: z
    .string({ required_error: "Địa chỉ của trường là bắt buộc" })
    .min(1, "Địa chỉ của trường là bắt buộc"),
  parentName: z
    .string({ required_error: "Họ và tên phụ huynh là bắt buộc" })
    .min(1, "Họ và tên phụ huynh là bắt buộc"),
  parentPhoneNumber: z
    .string({ required_error: "Số điện thoại của phụ huynh là bắt buộc" })
    .min(1, "Số điện thoại của phụ huynh là bắt buộc")
    .regex(phoneRegex, "Số điện thoại không hợp lệ"),
  parentEmail: z
    .string({ required_error: "Email của phụ huynh là bắt buộc" })
    .email("Email không hợp lệ")
    .min(1, "Email là bắt buộc"),
});

const UpdateInfoStep2Schema = z
  .object({
    email: z
      .string({ required_error: "Email là bắt buộc" })
      .email("Email không hợp lệ")
      .min(1, "Email là bắt buộc"),
    username: z
      .string({ required_error: "Tên đăng nhập là bắt buộc" })
      .min(5, "Tên đăng nhập tối thiếu 5 ký tự")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Tên đăng nhập chỉ được chứa chữ cái không dấu và số"
      ),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only validate if both password fields are filled
      if (!data.password && !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"],
    }
  );

export const updateUserInfoSchema = z.object({
  stepOne: UpdateInfoStep1Schema,
  stepTwo: UpdateInfoStep2Schema,
});

export type UpdateUserInfoSchema = z.infer<typeof updateUserInfoSchema>;
