import { z } from "zod";

const Step1Shema = z.object({
  fullName: z
    .string({required_error: "Họ tên học sinh là bắt buộc"})
    .min(5, "Họ tên học sinh phải có ít nhất 5 ký tự")
    .min(1, "Họ tên học sinh là bắt buộc"),
  schoolName: z.string({required_error: "Trường học là bắt buộc"}).min(1, "Trường học là bắt buộc"),
  studentAddress: z.string().optional(),
  dateOfBirth: z.date().optional(), //đang bị lỗi => nếu nhập sẽ không bấm tiếp tục được:w
  className: z.string({required_error: "Tên lớp học là bắt buộc"}).min(1, "Tên lớp học là bắt buộc"),
  schoolAddress: z.string({required_error: "Địa chỉ của trường là bắt buộc"}).min(1, "Địa chỉ của trường là bắt buộc"),
  parentName: z.string({required_error: "Họ và tên phụ huynh là bắt buộc"}).min(1, "Họ và tên phụ huynh là bắt buộc"),
  parentPhoneNumber: z
    .string({required_error: "Số điện thoại của phụ huynh là bắt buộc"})
    .min(1, "Số điện thoại của phụ huynh là bắt buộc"),
});

const Step2Shema = z
  .object({
    email: z.string({required_error: "Email là bắt buộc"}).email("Email không hợp lệ").min(1, "Email là bắt buộc"),
    username: z.string({required_error: "Tên đăng nhập là bắt buộc"}).min(5, "Tên đăng nhập tối thiếu 5 ký tự"),
    password: z.string({required_error: "Mật khẩu là bắt buộc"}).min(5, "Mật khẩu tối thiểu 5 ký tự"),
    confirmPassword: z.string({required_error: "Xác nhận mật khẩu là bắt buộc"}).min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

const Step3Shema = z.object({
    //set contest_group_stage default value is 1
    contest_group_stage: z.string().default("1"),
});

export const wizardSchema = z.object({
  stepOne: Step1Shema,
  stepTwo: Step2Shema,
  stepThree: Step3Shema,
});

export type WizardSchema = z.infer<typeof wizardSchema>;