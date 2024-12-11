import tekdojoAxios from "./axios.config";

export const getResultSearchContestSubmisson = async (query: string) => {
    try {
        const res = await tekdojoAxios.get(`/contest-submission?${query}`);
        return res.data;
    } catch (error) {
        Promise.reject(error);
    }
}