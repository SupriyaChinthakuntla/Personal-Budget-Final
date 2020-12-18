import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as D3 from 'd3';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets : [
      {
       data: [],
       backgroundColor: [
       ],
      },
  ],
  labels: [],
  options: { events: [] }
  };

  public loggedUserName : any;

  constructor(private http: HttpClient, public dataService: DataService, private router : Router) { }

  ngAfterViewInit(): void {
    this.loggedUserName = this.dataService.loggedUserName;
    this.dataService.getData(this.loggedUserName)
    .subscribe((res: any) => {
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        this.dataSource.datasets[0].data[i] = res[i].budget;
        this.dataSource.labels[i] = res[i].title;
        this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
        this.createChart();
       }

    });
}

  // tslint:disable-next-line: typedef
  createChart() {

    let ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

    const myPieChart = new Chart(ctx, {
      type: 'pie',
        data: this.dataSource
    });
}

AddBudget(){
  this.router.navigate(['/addbudget']);
}


}
