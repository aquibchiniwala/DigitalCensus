import { Injectable } from '@angular/core';
import { IHouse } from 'src/Models/IHouse';
import { IPerson } from 'src/Models/IPerson';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  public netConnectivity=true;
  public House: IHouse;
  public Persons: Array<IPerson> = new Array<IPerson>();
  constructor() { }
}
