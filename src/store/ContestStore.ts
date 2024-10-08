//for only contest (register, userProfile, contestEntry)

import { create } from "zustand";


interface GroupMemberInfo {
    name: string;
    school: string;
    phone: string;
    dob: string;
    parentName: string;
    parentPhoneNumber: string;
}

type State = {
    fullName: string;
    school: string;
    phoneNumber: string;
    schoolAddress: string;
    parentName: string;
    parentPhoneNumber: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    contest_group_stage: string;
    groupMemberInfo?: GroupMemberInfo[];
}

type Actions = {
    register: (body: any) => Promise<void>;
}

const defaultStates: State = {
    fullName: "",
    school: "",
    phoneNumber: "",
    schoolAddress: "",
    parentName: "",
    parentPhoneNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    contest_group_stage: "",
    groupMemberInfo: []
}