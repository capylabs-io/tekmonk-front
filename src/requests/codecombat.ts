import { BASE_URL } from "@/contants/api-url";
import axios from "axios";

type CreatUserReturnValue = "username" | "email" | "other" | boolean;
type UserCodeCombat = {
    name: string;
    email: string;
    role: string;
}
export const createCodeCombat = async (data: UserCodeCombat): Promise<CreatUserReturnValue> => {
    try {
        console.log(data);
        const response = await axios.post(BASE_URL + "/codecombat/user", data);
        if(response.status === 200) {
            console.log(response);
            if(response.data.status == "409") {
                return "username"
            }
            if(response.data.status == "500") {
                return "email"
            }
            return response.data;
        }
        console.log(response);
        return "other";
    } catch (error) {
        console.log(error);
        return "other";
    }
}