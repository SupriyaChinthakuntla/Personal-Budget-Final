import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';
import { Chart } from 'chart.js'


@Component({
  selector: 'pb-max-chart',
  templateUrl: './max-chart.component.html',
  styleUrls: ['./max-chart.component.scss']
})
export class MaxChartComponent implements OnInit {

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor : [ 'rgb(155, 29, 200, 0.8)'
        ]
    }],

    labels: [

    ]
  }




  public loggedUserName : any;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {


    this.loggedUserName = this.dataService.loggedUserName;

    this.dataService.getData(this.loggedUserName)
  .subscribe((res: any) => {
    for (let i = 0; i < res.length; i++) {
     this.dataSource.datasets[0].data[i] = res[i].maxbudget;
     this.dataSource.labels[i] = res[i].title;
    //  this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
     this.createMaxChart();
    }
  });
  }


  createMaxChart() {
    var ctx : any = document.getElementById("myMaxBudget")
    var _ = new Chart(ctx,{
        type: 'line',
        data : this.dataSource
    })
}

}
