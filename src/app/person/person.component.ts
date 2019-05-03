import { Component, OnInit } from '@angular/core';
import { RelationToHead, Gender, MaritalStatus, Occupation } from 'src/Models/Enums';
import { ShareDataService } from '../services/share-data.service';
import { IPerson } from 'src/Models/IPerson';
import { Router } from '@angular/router';
import { IHouse } from 'src/Models/IHouse';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  model: any = {};
  relations = RelationToHead;
  genders = Gender;
  maritalStatuses = MaritalStatus;
  occupations = Occupation;
  House: IHouse;

  constructor(private service: DataService, private shareData: ShareDataService, private route: Router) { }

  ngOnInit() {

    this.House = this.shareData.House;

    $('#ageAtMarriage').keypress(
      function (event) {
        if (event.which == 45) {
          event.preventDefault();
        }
      });
  }
  onSubmit(form: NgForm) {
    form.value.CensusHouseNumber = this.House.CensusHouseNumber;
    form.value.dateOfBirth = new Date(`${form.value.dateOfBirth.year}-${form.value.dateOfBirth.month}-${form.value.dateOfBirth.day}`);
    this.register(form.value);
    form.reset();
    form.form.markAsPristine();
    form.form.updateValueAndValidity();
    form.form.markAsUntouched();

  }


  register(data: IPerson) {
    console.log(data);
    this.shareData.Persons.push(data);
  }

  relationShips(): Array<string> {
    let keys = Object.keys(this.relations);
    return keys.slice(keys.length / 2);
  }

  getGenders(): Array<string> {
    let keys = Object.keys(this.genders);
    return keys.slice(keys.length / 2);
  }

  getMaritalStatuses(): Array<string> {
    let keys = Object.keys(this.maritalStatuses);
    return keys.slice(keys.length / 2);
  }

  getOccupations(): Array<string> {
    let keys = Object.keys(this.occupations);
    return keys.slice(keys.length / 2);
  }

  finish() {
    let submit = confirm("Do you want Finish Registration");
    if (submit == true) {
      if (this.shareData.Persons && this.shareData.Persons.length > 0) {
        this.shareData.House.Persons = this.shareData.Persons.length > 0 ? this.shareData.Persons : undefined;
        console.log(this.shareData.House);

        this.service.RegisterHouse(this.shareData.House).subscribe((response: IHouse) => {
          console.log(response);
          this.House = response;
          window.alert("Registration Successfull.")
        }, (error) => {
          if (error.status == 0) {
            this.shareData.netConnectivity = false;
            window.alert('Connection to the server lost...');
            let cache = JSON.parse(localStorage.getItem('cache'));
            if (cache != null) {
            }
            else {
              cache = new Array<any>();
            }
            cache.push(this.shareData.House);
            localStorage.setItem('cache', JSON.stringify(cache));
            this.route.navigateByUrl('dashboard/house');
          }
          else {
            window.alert(`Some Error occoured. [ ${error.statusText} ]. Try again later.`);
            console.log(error);
          }
        });
      }
      else {
        window.alert(`Add atleast 1 person in the house.`);
      }
    }
  }
}