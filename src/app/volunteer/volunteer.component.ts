import { Component, OnInit } from '@angular/core';
import { ApprovalStatus } from 'src/Models/Enums';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  status: ApprovalStatus = ApprovalStatus.Pending;
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('[data-toggle="offcanvas"]').click(function () {
        $("#navigation").toggleClass("hidden-xs");
      });
    });
  }

  renderVolunteers(status: ApprovalStatus) {
    this.status = status;
  }

}
