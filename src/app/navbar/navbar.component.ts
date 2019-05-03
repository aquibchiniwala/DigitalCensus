import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApprovalStatus } from 'src/Models/Enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  statusChange = new EventEmitter<ApprovalStatus>();
  pending = ApprovalStatus.Pending;
  approved = ApprovalStatus.Approved;
  declined = ApprovalStatus.Declined;
  constructor() { }

  ngOnInit() {
  }

  renderVolunteers(status: ApprovalStatus) {
    this.statusChange.emit(status);
  }


}
