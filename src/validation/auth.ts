import { z } from "zod";

export const siginChema = z.object({
  email: z
    .string({ required_error: "Tên tài khoản là bắt buộc" })
    .min(1, "Tên tài khoản là bắt buộc"),
  password: z
    .string({ required_error: "Mật khẩu là bắt buộc" })
    .min(5, "Mật khẩu tối thiểu 5 ký tự"),
});
export const sigUpChema = z
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
    password: z
      .string({ required_error: "Mật khẩu là bắt buộc" })
      .min(5, "Mật khẩu tối thiểu 5 ký tự"),
    confirmPassword: z
      .string({ required_error: "Xác nhận mật khẩu là bắt buộc" })
      .min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
