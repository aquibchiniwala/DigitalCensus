import { Injectable } from '@angular/core';
import { IToken } from 'src/Models/IToken';
import { Role, ApprovalStatus } from 'src/Models/Enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: IToken
  constructor(private router:Router) { 
  }

  AuthenticateUser():boolean{
    this.user  = JSON.parse(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')) as IToken;
    if (this.user && this.user!=null && (this.user.expires_in-new Date().getTime()>0)) {
      console.log("true");
      return true;
    }
    else {
      console.log("false");
      return false;
    }
  }

  AuthenticateApprover(): boolean {
    this.user  = JSON.parse(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')) as IToken;
    if (this.user && this.user!=null && this.user.Role == Role.Approver && (this.user.expires_in-new Date().getTime()>0)) {
      console.log("true");
      return true;
    }
    else {
      console.log("false");
      // this.Logout();
      return false;
    }
  }

  AuthenticateVolunteer(): boolean {
    this.user  = JSON.parse(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token')) as IToken;
    if (this.user && this.user!=null && this.user.Role == Role.Volunteer && this.user.ApprovalStatus==ApprovalStatus.Approved && (this.user.expires_in-new Date().getTime()>0)) {
      return true;
    }
    else {
      // this.Logout();
      return false;
    }
  }
}
