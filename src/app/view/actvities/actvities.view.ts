import { ActivityHistory } from './../../services/activity-history.service';
import { Activity } from '../../models';
import { ActivityService } from 'src/app/services/activity.service';

import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddActivityDialogComponent } from 'src/app/components/add-activity-dialog/add-activity-dialog.component';

@Component({
  selector: 'st-activities',
  templateUrl: './activities.view.html',
  styleUrls: ['./activities.view.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ActivitiesView implements OnInit {

  constructor(
    private as: ActivityService, private dialog: MatDialog,
    private hs: ActivityHistory
    ) { }

  @ViewChild('toCopy', {static: false}) toCopyEl: ElementRef;

  activities: Activity[];
  showCopyMenu = false;
  lsToCopy: any;

  ngOnInit() {
    this.getActivities();
  }

  public deleteActivity(id: string) {
    this.as.deleteActivity(id);
    this.getActivities();
  }

  public updateActivity(activity: Activity) {
    this.as.updateActivity(activity);
    this.getActivities();
  }

  public getActivities() {
    this.activities = this.as.getActivities();
  }

  exportLocalStorage() {
    this.lsToCopy = {
      activities: this.as.getActivities(),
      activityHistory: this.hs.getHistory()
    };

    this.showCopyMenu = true;
  }

  public trackByFn(activity: Activity) {
    return activity && activity.id;
  }

  public openAddActivityDialog() {
    const dialogRef = this.dialog.open(AddActivityDialogComponent);

    const subsriber = dialogRef.afterClosed().subscribe(activity => {
      if (activity) {
        this.as.addActivity(activity);
        this.getActivities();
        subsriber.unsubscribe();
      }
    });
  }

  copyLs() {
    this.copyToClipboard();
    this.closeCopyPanel();
  }

   copyToClipboard() {
    if ((document as any).selection) {
      const range = (document.body as any).createTextRange();
      range.moveToElementText(this.toCopyEl.nativeElement);
      range.select().createTextRange();
      document.execCommand('copy');

    } else if (window.getSelection) {
      const range = document.createRange();
      range.selectNode(this.toCopyEl.nativeElement);
      window.getSelection().addRange(range);
      document.execCommand('copy');
    }
  }

  closeCopyPanel() {
    this.showCopyMenu = false;
  }

}
