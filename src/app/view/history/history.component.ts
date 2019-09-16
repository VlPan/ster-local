import { ActivityHistoryItem } from './../../models';
import { Component, OnInit } from '@angular/core';
import { ActivityHistory } from 'src/app/services/activity-history.service';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryView implements OnInit {

  constructor(private ah: ActivityHistory) { }
  activityHistory: ActivityHistoryItem[];

  ngOnInit() {
    this.activityHistory = this.ah.getHistory();
  }

}
