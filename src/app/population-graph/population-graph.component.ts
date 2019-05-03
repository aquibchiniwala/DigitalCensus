import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-population-graph',
  templateUrl: './population-graph.component.html',
  styleUrls: ['./population-graph.component.css']
})
export class PopulationGraphComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  constructor(private service:DataService) { }

  ngOnInit() {
    this.service.GetStateWisePopulation().subscribe((response)=>{
      this.pieChartLabels=Object.keys(response);
      this.pieChartData=Object.values(response);
    });
  }
}
