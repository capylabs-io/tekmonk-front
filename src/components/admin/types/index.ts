export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  status: string;
  role: string;
}

export interface TableHeader {
  label: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
}

export interface Tab {
  id: string;
  label: string;
}

export interface EditingUserData extends User {
  dob?: string;
  parentName?: string;
  parentPhone?: string;
}