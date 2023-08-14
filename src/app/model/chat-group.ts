import { ILogin } from "./login-detail";

export interface  IChatGroup {

    name: string;
    users: ILogin[];
    _id?: string;
}
