import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-dualbar',
  templateUrl: './dualbar.component.html',
  styleUrls: ['./dualbar.component.scss']
})
export class DualbarComponent implements OnInit {

  chartOptions = {
    responsive: true
  }

  labels = [];

  chartData = [
    {
      label: 'Current Budget',
      data: []
    },
    {
      label: 'Maximum Budget',
      data: []
    }
  ];

  colors = [
    {
      backgroundColor: 'rgb(55, 22, 55, 0.8)'
    },
    {
      backgroundColor: 'rgba(110, 55, 255, 0.8)'
    }
  ]

  onChartClick(event) {

  }

  public loggedUserName:any;

  constructor(private http: HttpClient,public dataService: DataService) {

  }

  ngOnInit(): void {

    this.loggedUserName = this.dataService.loggedUserName;
    this.dataService.getData(this.loggedUserName)
    .subscribe((res: any) => {
      console.log(res[0]);
      for (let i = 0; i < res.length; i++) {

        this.chartData[0].data[i] = res[i].budget;
        this.chartData[1].data[i] = res[i].maxbudget;
        this.labels[i] = res[i].title;
      }
    });
  }

}
