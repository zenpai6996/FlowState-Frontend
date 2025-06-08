export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  isEmailVerified: boolean;
  updatedAt: Date;
  profilePicture?: string;
}
export interface Workspace{
  _id:string;
  name:string;
  description?:string;
  owner:User | string;
  createdAt:Date;
  color:string;
  members:{
    user:User;
    role:"admin"| "member" | "owner" | "viewer";
    joinedAt:Date;
  }[];
  updatedAt:Date;
}
  