import { CertificateHistory } from "@/types/certificate";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";

export const ReqGetCertificateHistories = async (query: string = "") => {
  const res = await tekdojoAxios.get(`certificate-histories?${query}`);
  return res.data as StrapiResponse<CertificateHistory[]>;
};
