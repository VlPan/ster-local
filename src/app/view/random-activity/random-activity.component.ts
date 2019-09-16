import { ActivityHistory } from './../../services/activity-history.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { RunningActivityService } from 'src/app/services/running-activity.service';
import { ActivityService } from 'src/app/services/activity.service';
import { MatDialog } from '@angular/material';
import { Activity, ActivityHistoryItem } from 'src/app/models';
import { Formatter } from 'src/app/helpers/timeFormatter';
import { ActivtyDoneDialogComponent } from 'src/app/components/activty-done-dialog/activty-done-dialog.component';

@Component({
  selector: 'st-random-activity',
  templateUrl: './random-activity.component.html',
  styleUrls: ['./random-activity.component.scss']
})
export class RandomActivityView implements OnInit {
  isSelectActivityMenuOpened = false;
  activities: Activity[];

  constructor(
    public ts: TimerService,
    private ra: RunningActivityService,
    private activityService: ActivityService,
    private dialog: MatDialog,
    private ah: ActivityHistory
  ) {}

  pryoritizedActivities: Activity[] = [];
  activityStartedTimerFirst = true;

  @ViewChild('circle', {static: true}) circleEl: ElementRef;

  get currentActivity() {
    return this.ra.getCurrentActivity();
  }

  set currentActivity(activity: Activity) {
    this.ra.setCurrentActivity(activity);
  }


  ngOnInit() {
    this.activities = this.activityService.getActivities();
    this.pryoritizedActivities = this.activityService.pryoritizeActivities(this.activityService.getActivities());
    if (!this.currentActivity) {
      this.getNextActivity();
    }
  }

  getRandomActivity() {
    this.currentActivity = this.activityService.getRandomActivity(this.pryoritizedActivities);
    this.clearTimer();
  }

  getPrevActivity() {
    this.clearTimer();
    this.ra.getPrevActivity();
  }

  hasNext() {
    return this.ra.hasNext();
  }

  hasPrev() {
    return this.ra.hasPrev();
  }
  getNextActivity() {
    if (this.ra.hasNext()) {
      this.clearTimer();
      this.activityStartedTimerFirst = true;
      this.ra.getNextActivity();
    } else {
      this.clearTimer();
      this.activityStartedTimerFirst = true;
      this.getRandomActivity();
    }
  }

  toggleTimer() {
    if (!this.ts.running) {
      if (this.activityStartedTimerFirst) {
        this.ts.setStartTime();
        this.activityStartedTimerFirst = false;
      }
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  pauseTimer() {
    this.ts.pauseTimer();
  }

  startTimer() {
    this.ts.perc.subscribe((value) => {
      this.circleEl.nativeElement.style.strokeDashoffset = value;
    });
    this.ts.startTimer();
  }

  resetTimer() {
    this.ts.resetTimer();
  }

  clearTimer() {
    this.ts.clearTimer();
  }

  format(time: number) {
    return Formatter.formatTimeNumber(time);
  }

  activityDone() {
    this.openActivityDoneDialog();
  }

  selectActivity(activity: Activity) {
    this.ra.setCurrentActivity(activity);
  }

  closeMenu() {
    this.isSelectActivityMenuOpened = false;
  }

  toggleSelectActivityMenu() {
    this.isSelectActivityMenuOpened = !this.isSelectActivityMenuOpened;
  }
  public openActivityDoneDialog() {
    const dialogRef = this.dialog.open(ActivtyDoneDialogComponent, {
      data: {
        activity: this.currentActivity,
        time: this.ts.secs + this.ts.mins * 60 + this.ts.hours * 60 * 60 + this.ts.days * 60 * 60 * 24
      }
    });

    const subsriber = dialogRef.afterClosed().subscribe((history: ActivityHistoryItem) => {
      if (history) {
        this.ah.addActivityHistory(history);
        this.clearTimer();
        this.getNextActivity();
        subsriber.unsubscribe();
      }
    });
  }

}
