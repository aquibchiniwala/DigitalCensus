import { ApprovalStatus, Role } from './Enums';

export interface IToken {
    access_token: string;
    token_type: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Role: Role;
    ApprovalStatus: ApprovalStatus;
    expires_in:number;
    Image:string;
    UserID:number;
}
