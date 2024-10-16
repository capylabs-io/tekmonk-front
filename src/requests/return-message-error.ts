import { AxiosError } from "axios";

//just for register contest - (axios - strapi)
const HandleReturnMessgaeErrorAxios = (error: any) => {
    console.log("type error = ", typeof error);
    if (error.response) {
        const res = error.response.data.error.message  ;
        console.log("data error = ", res);
        return res;
    } else if (error.request) {
        console.log("request: ", error.request);
        return "Request error";
    } else {
        console.log("Error message", error.message);
        return error.message;
    }
};
export default HandleReturnMessgaeErrorAxios;