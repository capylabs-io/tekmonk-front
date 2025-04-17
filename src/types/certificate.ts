import { Course, User } from "./common-types";

export type Certificate = {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  type: string;
  course: Course;
  isCommentNeeded: boolean;
  certificatePdfConfig?: any;
  user?: User;
  createdAt: string;
  updatedAt: string;
};

export type CertificateHistory = {
  id: number;
  certificate: Certificate;
  student: User;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
