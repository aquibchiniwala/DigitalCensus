import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ILogin } from '../../Models/ILogin';
import { IToken } from 'src/Models/IToken';
import { ApprovalStatus, Role } from 'src/Models/Enums';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:ILogin={
    username:'',
    password:'',
    rememberMe:false,
    grant_type:'password'
  };
  loggedIn: boolean;
  status: ApprovalStatus;
  pending = ApprovalStatus.Pending;
  approved = ApprovalStatus.Approved;
  declined = ApprovalStatus.Declined;
  constructor(
    private service: DataService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.AuthenticateUser) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    this.login(this.model);
  }

  login(loginData: ILogin) {
    this.service.Authenticate(loginData).subscribe((token: IToken) => {
      this.status = token.ApprovalStatus;
      if (token.Role == Role.Approver || token.ApprovalStatus == ApprovalStatus.Approved) {
        token.expires_in = new Date().getTime() + (token.expires_in * 1000);
        if (loginData.rememberMe) {
          localStorage.setItem('token', JSON.stringify(token));
        } else {
          sessionStorage.setItem('token', JSON.stringify(token));
        }
        // if (token.Role == Role.Approver) {
          this.router.navigate(['dashboard']);
        // }
        // else {
        //   this.router.navigate(['volunteer-dashboard']);
        // }
      }
    }, (error) => {
      if (error.status == 400) {
        this.loggedIn = false;
      }
      console.log(error);
    });
  }
}
