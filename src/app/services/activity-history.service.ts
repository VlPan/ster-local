import { LocalStorage } from './local-storage.service';
import { Injectable } from '@angular/core';
import {of } from 'rxjs';
import { ActivityHistoryItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ActivityHistory {

constructor(private ls: LocalStorage) {}

public readonly HISTORY_KEY = 'activityHistory';

  getHistory() {
    return this.ls.get(this.HISTORY_KEY);
  }

  getHistoryAtDate(d: Date) {
    return this.ls.get(this.HISTORY_KEY).filter(
      h => {
        const savedDay = new Date(h.savedAt).getDate();
        const savedMonth = new Date(h.savedAt).getMonth();
        const savedYear = new Date(h.savedAt).getFullYear();

        const specificDay = new Date(d).getDate();
        const specificMonth = new Date(d).getMonth();
        const specificYear = new Date(d).getFullYear();

        return (
          savedDay   === specificDay     &&
          savedMonth === specificMonth   &&
          savedYear  === specificYear
        );
      }
    )
  }

  getTodaysHistory() {
    return this.ls.get(this.HISTORY_KEY).filter(
      h => {
        const savedDay = new Date(h.savedAt).getDate();
        const savedMonth = new Date(h.savedAt).getMonth();
        const savedYear = new Date(h.savedAt).getFullYear();

        const todayDay = new Date().getDate();
        const todayMonth = new Date().getMonth();
        const todayYear = new Date().getFullYear();

        return (
          savedDay   === todayDay     &&
          savedMonth === todayMonth   &&
          savedYear  === todayYear
        );
      }
    )
  }

  addActivityHistory(activityHistory: ActivityHistoryItem) {
    const oldActivityHistory = this.ls.get(this.HISTORY_KEY);
    const newActivityHistory = [activityHistory, ...oldActivityHistory];
    this.ls.set(this.HISTORY_KEY, newActivityHistory);
  }

  deleteActivityHistoryByActivityId(id: string) {
    const oldActivityHistory = this.ls.get(this.HISTORY_KEY);
    const newActivityHistory = oldActivityHistory.filter(a => a.id !== id);
    this.ls.set(this.HISTORY_KEY, newActivityHistory);
  }

  updateActivityHistory(activityHistoryItem: ActivityHistoryItem) {
    let oldActivityHistory = this.ls.get(this.HISTORY_KEY);
    const activityHistoryToUpdate = oldActivityHistory.find(a => a.id === activityHistoryItem.id);
    const newActivityHistoryItem = Object.assign(activityHistoryItem, activityHistoryToUpdate);
    oldActivityHistory = oldActivityHistory.filter(a => a.id !== activityHistoryItem.id);
    const newActivityHistory = [newActivityHistoryItem, ...oldActivityHistory];
    this.ls.set(this.HISTORY_KEY, newActivityHistory);
  }
}
