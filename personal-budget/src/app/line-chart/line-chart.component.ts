import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  public loggedUserName :any;


  public dataSource = {
    datasets: [{
      label: 'Original Budget',
      data: [],
      fill:false,
     lineTension:0.2,
     borderColor:"red",
     borderWidth: 1
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [

    ]
};


  constructor(private dataService : DataService) {

  }

  ngOnInit(): void {
    this.dataService.getData(this.loggedUserName)
    .subscribe((res:any)=>{
      console.log(res);
      for (let i = 0; i < res.length; i++) {
         this.dataSource.datasets[0].data[i] = res[i].budget;
         this.dataSource.labels[i] = res[i].title;

      }
    })
  }

  createChart(){
    var ctx : any = document.getElementById("lineChart")
    var myPieChart = new Chart(ctx,{
        type: 'line',
        data : this.dataSource
    })
}


}
