import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IToken } from 'src/Models/IToken';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: IToken;
  constructor(private service: DataService, private route: Router, private router: ActivatedRoute, private authService: AuthService, private sharedService: ShareDataService) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.polingForNet();

  }

  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  polingForNet() {
    let id = setInterval(() => {
      this.service.serverIsAlive();
      let cache = JSON.parse(localStorage.getItem('cache'));
      if (this.sharedService.netConnectivity == true && cache != null) {
        this.syncData();
      }
    }, 5000);
  }

  syncData() {
    window.alert("Syncing Data...");
    let cache = JSON.parse(localStorage.getItem('cache'));
    cache.forEach(entry => {
      if (this.sharedService.netConnectivity == true) {
        this.service.RegisterHouse(entry).subscribe(response => {
          console.log('1 Record Synced');
          cache.shift();
        });
      }
      else {
        localStorage.setItem('cache', JSON.stringify(cache));
        return;
      }
    });
    localStorage.removeItem('cache');

  }

}
