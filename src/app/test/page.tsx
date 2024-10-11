"use client";

import { Button } from "@/components/common/Button";
import Step1 from "@/components/register-contest/Step1";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import axios from "axios";

export default function Page() {
    const fullName = useContestRegisterStore(state => state.fullName);
    console.log("fullName", fullName);
    const data
     = useContestRegisterStore(state => {
        return {
            fullName: "vu van hieu",
            schoolName: "THCS nguyen trai",
            phoneNumber: "0123456789",
            schoolAddress: "Hai duong",
            parentName: "vu van hieu",
            parentPhoneNumber: "0123456789",
            email: "hieu@gmail.com",
            username: "hieu",
            password: "123456",
            user_role: 1,
            contest_group_stage: 1,
            // groupMemberInfo: state.groupMemberInfo
        }
    });
    const handleTest = async () => {
        const res = await axios.post("http://localhost:1337/api/auth/local/register", data);
    }
    return (
        <>
            {/* <Step1/> */}
            <Button onClick={handleTest}>test</Button>
        </>
    )
}