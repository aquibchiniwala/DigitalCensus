import { Component, OnInit } from '@angular/core';
import { OwnershipStatus } from 'src/Models/Enums';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  model: any = {};
  // tslint:disable-next-line: max-line-length
  states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'];
  ownershipStatuses = OwnershipStatus;

  constructor(private service: DataService, private route: Router, private shareData: ShareDataService,private authService:AuthService) { }

  ngOnInit() {
    $('#noOfRooms').keypress(
      function (event) {
        if (event.which == 45) {
          event.preventDefault();
        }
      });
  }

  onSubmit() {
    this.shareData.House = this.model;
    this.route.navigateByUrl('dashboard/person');
  }

  ownerships(): Array<string> {
    let keys = Object.keys(this.ownershipStatuses);
    return keys.slice(keys.length / 2);
  }
}
