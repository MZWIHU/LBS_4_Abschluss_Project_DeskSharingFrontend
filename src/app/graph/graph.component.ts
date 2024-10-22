import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {StatisticService} from "../service/statistic.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  ApexAxisChartSeries, ApexDataLabels,
  ApexFill, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule
} from "ng-apexcharts";

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
  private times: string[] = [];
  private values1: number[] = [];
  private values2: number[] = [];
  private values3: number[] = [];
  public chart1options?: Partial<ChartOptions>;
  public chart2options?: Partial<ChartOptions>;
  public chart3options?: Partial<ChartOptions>;
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

  ngOnInit() {
    //this.initCharts()

    this.statisticService.getStatistics().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(resp => {
      resp.forEach(element => {
        this.times.push(element.date);
        this.values1.push(element.checkedIn)
        this.values2.push(element.notCheckedIn)
        this.values3.push(element.reservationAmount);
      })

      this.initCharts()

    });
  }

  public initCharts(): void {
    this.chart1options = {
      title: {
        text: "Checked In",
        align: "left",
        offsetX: 30
      },
      series: [
        {
          name: "chart1",
          data: this.generateDayWiseTimeSeries(this.times, this.values1)
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
      title: {
        text: "Not checked In",
        align: "left",
        offsetX: 30
      },
      series: [
        {
          name: "chart2",
          data: this.generateDayWiseTimeSeries(this.times, this.values2)
        },
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
      title: {
        text: "Total reservations",
        align: "left",
        offsetX: 30
      },
      series: [
        {
          name: "chart3",
          data: this.generateDayWiseTimeSeries(this.times, this.values3)
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "line",
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
