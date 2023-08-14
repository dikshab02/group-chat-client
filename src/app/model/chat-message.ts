import { ILogin } from "./login-detail";

export interface IChatMessage {

    chatGrpId: string;
    user: ILogin;
    time: Date;
    message: string;
    _id?: string;
}

