import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Chart} from 'chart.js';
import { ActivityHistoryItem } from 'src/app/models';

@Component({
  selector: 'st-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input() historyItem: ActivityHistoryItem;
  @ViewChild('chart', {static: true}) chartEl: ElementRef;
  displayTime = '';

  ngOnInit() {
    this.displayTime = this.formatTime(this.historyItem.time);
  }

  formatTime(secs: number) {
    const mins = Math.floor(secs / 60);

    let finalStr = '';

    if (mins < 0) {
      finalStr = `${secs}sec`;
    } else {
      finalStr = `${mins}min`;
    }

    return finalStr;
  }

  ngAfterViewInit(): void {

    const cahrtRef = new Chart(this.chartEl.nativeElement, {
      type: 'bar',
      data: {
        labels: this.historyItem.savedOptions.map(h => h.name),
        datasets: [
          {
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: this.historyItem.savedOptions.map(h => h.value),
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: `${this.historyItem.activity.title}`
        },
        scales: {
          yAxes: [{
              ticks: {
                  min: 0,
                  max: 100
              }
          }]
        }
      }
  });
  }

}
