import tekdojoAxios from "./axios.config";
import { BASE_URL } from "@/contants/api-url";


//for get all post (pagination)
export const getContest = async () => {
  try {
    const response = await tekdojoAxios.get(`${BASE_URL}/contests`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
};
