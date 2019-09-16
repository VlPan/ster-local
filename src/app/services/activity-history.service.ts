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

  addActivityHistory(activityHistory: ActivityHistoryItem) {
    const oldActivityHistory = this.ls.get(this.HISTORY_KEY);
    const newActivityHistory = [...oldActivityHistory, activityHistory];
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
    const newActivityHistory = [...oldActivityHistory, newActivityHistoryItem];
    this.ls.set(this.HISTORY_KEY, newActivityHistory);
  }
}
