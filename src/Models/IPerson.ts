import { MaritalStatus, Gender, RelationToHead, Occupation } from './Enums';

export interface IPerson {
    FullName: string;
    CensusHouseNumber: number;
    RelationToHead: RelationToHead;
    Gender: Gender;
    DateOfBirth: Date;
    MaritalStatus: MaritalStatus;
    AgeAtMarriage: number;
    Occupation: Occupation;
    OccupationIndustry: string;
}
