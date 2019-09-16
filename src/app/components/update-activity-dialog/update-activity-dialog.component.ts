import { Component, OnInit, AfterContentInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, ErrorStateMatcher, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Activity } from 'src/app/models';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface UpdateActivityDialogData {
  activity: Activity;
}


@Component({
  selector: 'st-update-activity-dialog',
  templateUrl: './update-activity-dialog.component.html',
  styleUrls: ['./update-activity-dialog.component.scss']
})
export class UpdateActivityDialogComponent implements AfterContentInit {

  constructor(
    public dialogAddRef: MatDialogRef<UpdateActivityDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: UpdateActivityDialogData,
  ) { }

  titleFormControl: FormControl;
  descFormControl: FormControl;
  frequencyFormControl: FormControl;
  priorityFormControl: FormControl;
  formControls: FormControl[];
  visibleData: any;
  isOneValChanged = false;
  matcher: MyErrorStateMatcher;

  ngAfterContentInit(): void {
    this.titleFormControl = new FormControl('', [
      Validators.required
    ]);

    this.descFormControl = new FormControl();
    this.frequencyFormControl = new FormControl();
    this.priorityFormControl = new FormControl();

    this.formControls = [
      this.titleFormControl,
      this.descFormControl,
      this.frequencyFormControl,
      this.priorityFormControl,
    ];

    this.titleFormControl.setValue(this.data.activity.title || '');
    this.descFormControl.setValue(this.data.activity.desc || '');
    this.frequencyFormControl.setValue(this.data.activity.frequency || '');
    this.priorityFormControl.setValue(this.data.activity.priority || '');

    this.visibleData = {
      title:  this.data.activity.title,
      desc: this.data.activity.desc,
      frequency: this.data.activity.frequency,
      priority: this.data.activity.priority
    };
  }

  submit() {
    const title = this.titleFormControl.value;
    const frequency = this.frequencyFormControl.value;
    const desc = this.descFormControl.value;
    const priority = this.priorityFormControl.value;

    const userOptions = this.data.activity.userOptions;
    const tags = this.data.activity.tags;
    const comments = this.data.activity.comments;
    const playlists = this.data.activity.playlists;
    const id = this.data.activity.id;

    const updatedActivityData: Activity = {
      id,
      title,
      desc,
      frequency,
      priority,
      userOptions,
      tags,
      comments,
      playlists
    };

    Object.keys(updatedActivityData).forEach(key => {
      if (updatedActivityData[key] === undefined) {
        delete updatedActivityData[key];
      }
    });

    this.dialogAddRef.close(updatedActivityData);
  }


  oneValueChanged() {
    let counter = 0;
    for (const key in this.visibleData) {
      if (this.visibleData.hasOwnProperty(key)) {
        this.visibleData[key] = this.visibleData[key] || '';
        if (this.visibleData[key].toString() !== this.formControls[counter].value) {
          return this.isOneValChanged = true;
        }
        counter++;
      }
    }
    return this.isOneValChanged = false;
  }
}
