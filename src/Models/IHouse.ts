import { OwnershipStatus } from './Enums';
import { IVolunteer } from './IVolunteer';
import { IPerson } from './IPerson';

export interface IHouse {
    CensusHouseNumber: number;
    BuildingNumber: string;
    Address: string;
    State: string;
    HeadFullName: string;
    OwnershipStatus: OwnershipStatus;
    NumberOfRooms: number;
    Persons: Array<IPerson>;
    //  public virtual ICollection<PersonViewModel> Persons { get; set; }
}
