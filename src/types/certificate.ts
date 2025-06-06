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
export type CertificatePdfFieldConfig = {
  id?: number;
  label?: string;
  value?: string;
  fontSize?: string;
  color?: string;
  fontFamily?: string;
  textAlign?: string;
  fontWeight?: string;
  positionX?: number;
  positionY?: number;
  config?: CertificatePdfConfig;
};

export type CertificatePdfConfig = {
  id?: number;
  name?: string;
  backgroundUrl?: string;
  fields?: CertificatePdfFieldConfig[];
  certificates?: Certificate[];
};
