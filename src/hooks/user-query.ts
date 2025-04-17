import { ReqGetUserAnalytic } from "@/requests/user";
import { useQuery } from "@tanstack/react-query";

export const useUserAnalyticQuery = () => {
    return useQuery({
        queryKey: ["user-analytic"],
        queryFn: async () => {
            return await ReqGetUserAnalytic();
        },
    });
}