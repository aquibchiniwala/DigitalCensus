import { ApprovalStatus, Role } from './Enums';
import { IHouse } from './IHouse';

export interface IVolunteer {
    UserID: number;
    Email: string;
    FirstName: string;
    LastName: string;
    AadharNumber: string;
    ApprovalStatus: ApprovalStatus;
    Role: Role;
    Houses: Array<IHouse>;
}
