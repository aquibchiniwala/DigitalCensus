import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { IVolunteer } from 'src/Models/IVolunteer';
import * as $ from 'jquery';
import { ApprovalStatus, Role } from 'src/Models/Enums';
@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnChanges, OnInit {

  Volunteers: Array<IVolunteer> = new Array<IVolunteer>();
  @Input()
  status: ApprovalStatus;

  defaultImg: string = '../../assets/default-img.png';

  constructor(private service: DataService) { }

  ngOnInit() {
    this.getAllVolunteers();

    $('.filterable .btn-filter').click(function () {
      const $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
      if ($filters.prop('disabled') == true) {
        $filters.prop('disabled', false);
        $filters.first().focus();
      } else {
        $filters.val('').prop('disabled', true);
        $tbody.find('.no-result').remove();
        $tbody.find('tr').show();
      }
    });

    $('.filterable .filters input').keyup(function (e) {
      /* Ignore tab key */
      const code = e.keyCode || e.which;
      if (code.toString() == '9') { return; }
      /* Useful DOM data and selectors */
      // tslint:disable-next-line: one-variable-per-declaration
      const $input = $(this),
        inputContent = $input.val().toString().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
      /* Dirtiest filter function ever ;) */
      const $filteredRows = $rows.filter(function () {
        const value = $(this).find('td').eq(column).text().toLowerCase();
        return value.indexOf(inputContent) === -1;
      });
      /* Clean previous no-result if exist */
      $table.find('tbody .no-result').remove();
      /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
      $rows.show();
      $filteredRows.hide();
      /* Prepend no-result row if all rows are filtered */
      if ($filteredRows.length === $rows.length) {
        // tslint:disable-next-line: max-line-length
        $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
      }
    });
  }

  ngOnChanges() {
    console.log(this.status);
    this.getAllVolunteers();

  }

  getAllVolunteers() {
    this.service.GetAllVolunteers(this.status).subscribe((response: Array<IVolunteer>) => {
      this.Volunteers = new Array<IVolunteer>();
      let i = 0;
      response.forEach(volunteer => {
        if (volunteer.Role == Role.Volunteer) {
          this.Volunteers[i++] = volunteer;
        }
      });
      // this.Volunteers = response;
      console.log(this.Volunteers);
    },
      (error) => {
        console.log(error);
      });
  }

  decline(UserID: number) {
    this.service.ChangeApprovalStatus(UserID, ApprovalStatus.Declined).subscribe(response => {
      this.getAllVolunteers();
    }, (error) => {
      console.log(error);
    });

  }

  approve(UserID: number) {
    this.service.ChangeApprovalStatus(UserID, ApprovalStatus.Approved).subscribe(response => {
      this.getAllVolunteers();
    }, (error) => {
      console.log(error);
    });
  }
}
