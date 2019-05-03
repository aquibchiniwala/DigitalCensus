import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShareDataService } from '../services/share-data.service';

@Injectable({
  providedIn: 'root'
})
export class PersonAuthGuard implements CanActivate {
  constructor(private sharedSerivce: ShareDataService,private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sharedSerivce.House && this.sharedSerivce.House != null) { return true; }
    else {
      this.router.navigateByUrl('dashboard/house');
      return false;
    }
  }

}
