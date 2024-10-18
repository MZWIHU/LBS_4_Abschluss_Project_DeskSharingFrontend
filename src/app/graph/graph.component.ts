import {AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke, NgApexchartsModule
} from "ng-apexcharts";
import {StatisticService} from "../service/statistic.service";
import {StatisticDays} from "../domain/StatisticDays";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit {

  private statisticService: StatisticService = inject(StatisticService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private chart1: any[] = [[1,1]];
  private chart2: any[] = [[1,2]];
  private chart3: any[] = [[1,3]];


  ngOnInit() {
    //this.initCharts()

    this.statisticService.getStatistics().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(resp => {
      let times: string[] = [];
      let values1: number[] = [];
      let values2: number[] = [];
      let values3: number[] = [];
      resp.forEach(element => {
        times.push(element.date);
        values1.push(element.checkedIn)
        values2.push(element.notCheckedIn)
        values3.push(element.reservationAmount);
      })
      this.chart1 = this.generateDayWiseTimeSeries(times, values1);
      this.chart2 = this.generateDayWiseTimeSeries(times, values2);
      this.chart3 = this.generateDayWiseTimeSeries(times, values3);

      this.initCharts()
    });
  }



  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    toolbar: {
      tools: {
        selection: false
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return "";
          }
        }
      }
    },
    grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    }
  };

  public initCharts(): void {
    this.chart1options = {
      series: [
        {
          name: "chart1",
          data: this.chart1
        }
      ],
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        height: 160
      },
      colors: ["#008FFB"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart2options = {
      series: [
        {
          name: "chart2",
          data: this.chart2
        }
      ],
      chart: {
        id: "tw",
        group: "social",
        type: "line",
        height: 160
      },
      colors: ["#546E7A"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart3options = {
      series: [
        {
          name: "chart3",
          data: this.chart3
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 160
      },
      colors: ["#00E396"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
  }

  public generateDayWiseTimeSeries(times: string[], values: number[]): any[] {

    var series = [];

    for (let i = 0; i < times.length; i++) {
      series.push([new Date(times.at(i)).getTime(), values[i]])
    }
    //console.log(series + "BEFORE")
    series.sort((a, b) => a[0] - b[0]);
    //console.log(series + "AFTER")
    return series;
  }

}
