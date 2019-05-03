import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from 'src/Models/ILogin';
import { ISignup } from 'src/Models/ISignup';
import { ApprovalStatus } from 'src/Models/Enums';
import { IHouse } from 'src/Models/IHouse';
import { IPerson } from 'src/Models/IPerson';
import { ShareDataService } from './share-data.service';

@Injectable()
export class DataService {

  url = 'http://localhost:62721/api/';
  constructor(private http: HttpClient, private sharedService: ShareDataService) { }
  Authenticate(credentials: ILogin) {
    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    return this.http.post('http://localhost:62721/token', toUrlEncoded(credentials), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
  }

  SignUp(signupData: ISignup) {
    return this.http.post(`${this.url}user`, JSON.stringify(signupData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  ChangeApprovalStatus(UserID: number, newStatus: ApprovalStatus) {
    return this.http.put(`${this.url}changeapprovalstatus/${UserID}`, newStatus, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  GetAllVolunteers(status: ApprovalStatus) {
    return this.http.get(`${this.url}GetVolunteers/${status}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  RegisterHouse(data: IHouse) {
    return this.http.post(`${this.url}house`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  GetStateWisePopulation() {
    return this.http.get(`${this.url}GetStateWisePopulation`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  serverIsAlive() {
    this.http.get(`${this.url}isalive`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe((response) => {
      if (response == true) {
        this.sharedService.netConnectivity = true;
      }
    }, (error) => {
      this.sharedService.netConnectivity = false;
    });
  }
}
