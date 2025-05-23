import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
import { User } from "@/types/common-types";
import { UserRankingProps, UserStatProps } from "@/types/users";

export const ReqCustomGetUsers = async (query: string = "") => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/custom-auth/users?${query}`
  );
  return response.data as StrapiResponse<User[]>;
};

export const ReqUpdateUser = async (id: string, data: any) => {
  const res = await tekdojoAxios.put(`${BASE_URL}/users/${id}`, data);
  return res.data;
};

export const ReqDeleteUser = async (id: string) => {
  return await tekdojoAxios.delete(`${BASE_URL}/users/${id}`);
};

export const ReqGetClassUserRemaining = async (query: string = "") => {
  return (await tekdojoAxios.get(
    `${BASE_URL}/custom-auth/remaining-users-in-class?${query}`
  )) as StrapiResponse<User[]>;
};

export const ReqGetUserAnalytic = async (query: string = "") => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/custom-user/analytics?${query}`
  );
  return response.data as UserStatProps;
};

export const ReqGetUserRanking = async (query: string = "") => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/custom-user/user-rank?${query}`
  );
  return response.data as StrapiResponse<UserRankingProps[]>;
};

export const updateUserProfile = async (userData: any) => {
  try {
    const response = await tekdojoAxios.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
