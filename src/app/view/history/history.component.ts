import { ActivityHistoryItem } from './../../models';
import { Component, OnInit } from '@angular/core';
import { ActivityHistory } from 'src/app/services/activity-history.service';
import { Formatter } from 'src/app/helpers/timeFormatter';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryView implements OnInit {

  constructor(private ah: ActivityHistory) { }
  activityHistory: ActivityHistoryItem[];
  selectedDay: number | string;
  selectedMonth: number | string;
  selectedYear: number | string;
  currentDate: Date;
  shouldShowNextDay = false;

  ngOnInit() {
    this.activityHistory = this.ah.getTodaysHistory();
    const today = new Date();
    this.currentDate = today;
    this.selectedDay = Formatter.formatTimeNumber(today.getDate());
    this.selectedMonth = Formatter.formatTimeNumber(today.getMonth());
    this.selectedYear = Formatter.formatTimeNumber(today.getFullYear());
  }

  getPrevDay() {
    const date = new Date(this.currentDate);
    date.setDate(date.getDate() - 1);
    this.currentDate = date;

    this.activityHistory = this.ah.getHistoryAtDate(date);
    this.selectedDay = Formatter.formatTimeNumber(date.getDate());
    this.selectedMonth = Formatter.formatTimeNumber(date.getMonth());
    this.selectedYear = Formatter.formatTimeNumber(date.getFullYear());
    this.checkNextDay();
  }

  getNextDay() {
    const date = new Date(this.currentDate);
    date.setDate(date.getDate() + 1);
    this.currentDate = date;

    this.activityHistory = this.ah.getHistoryAtDate(date);
    this.selectedDay = Formatter.formatTimeNumber(date.getDate());
    this.selectedMonth = Formatter.formatTimeNumber(date.getMonth());
    this.selectedYear = Formatter.formatTimeNumber(date.getFullYear());
    this.checkNextDay();
  }

  checkNextDay(): void {

    const todayDay = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();


    const currentDay = this.currentDate.getDate();
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();

    this.shouldShowNextDay =
    todayDay > currentDay ||
    todayMonth > currentMonth ||
    todayYear > currentYear;

  }

}
