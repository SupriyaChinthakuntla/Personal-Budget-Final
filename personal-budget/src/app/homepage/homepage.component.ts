import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

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

  constructor(private http: HttpClient, public dataService: DataService) { }

  ngAfterViewInit(): void {
    this.dataService.getData()
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

}
