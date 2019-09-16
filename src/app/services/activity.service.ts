import { Activity } from './../models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

public readonly ACTIVITIES_KEY = 'activities';
constructor(private ls: LocalStorage) {}

  getActivities() {
    return this.ls.get(this.ACTIVITIES_KEY);
  }

  addActivity(activity: Activity) {
    const oldActivities = this.ls.get(this.ACTIVITIES_KEY);
    const newActivities = [...oldActivities, activity];
    this.ls.set(this.ACTIVITIES_KEY, newActivities);
  }

  deleteActivity(id: string) {
    const oldActivities = this.ls.get(this.ACTIVITIES_KEY);
    const newActivities = oldActivities.filter(a => a.id !== id);
    this.ls.set(this.ACTIVITIES_KEY, newActivities);
  }

  updateActivity(activity: Activity) {
    let oldActivities = this.ls.get(this.ACTIVITIES_KEY);
    const activityToUpdate = oldActivities.find(a => a.id === activity.id);
    const newActivity = Object.assign(activityToUpdate, activity);
    oldActivities = oldActivities.filter(a => a.id !== activity.id);
    const newActivities = [...oldActivities, newActivity];
    this.ls.set(this.ACTIVITIES_KEY, newActivities);
  }

  pryoritizeActivities(activities: Activity[]): Activity[] {
    return activities.reduce((acc, cur) => {
      for (let i = 0; i < cur.frequency; i++) {
        acc.push(cur);
      }
      return acc;
    }, []);
  }

  getRandomActivity(activities) {
    const min = 0;
    const max = activities.length;
    const rand = Math.floor(Math.random() * max) + min;

    return activities[rand];
  }
}
