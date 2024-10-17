import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "@/requests/axios.config";
import { ContestEntry } from "@/types/common-types";

export const getOneContestEntry = async (candidateNumber: string) => {
    const response = await tekdojoAxios.get(`${BASE_URL}/contest-entries?filters[candidateNumber][$eq]=${candidateNumber}`);
    return response.data.data[0] as ContestEntry;
}