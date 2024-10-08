import tekdojoAxios from "./axios.config";
import { BASE_URL } from "@/contants/api-url";

export const ContestRegister = async (body: any) => {
    const response = await tekdojoAxios.post(`${BASE_URL}/auth/local/register`, body);
    return response.data;
}