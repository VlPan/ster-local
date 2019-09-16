import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher, Activity, Option } from 'src/app/models';

import * as uuidv1 from 'uuid/v1';

@Component({
  selector: 'st-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.scss']
})
export class AddActivityDialogComponent implements AfterContentInit {

  constructor(
    public dialogAddRef: MatDialogRef<AddActivityDialogComponent>,
    public dialog: MatDialog,
  ) { }

  titleFormControl: FormControl;
  descFormControl: FormControl;
  frequencyFormControl: FormControl;
  priorityFormControl: FormControl;
  useSTERFormControl: FormControl;
  matcher: MyErrorStateMatcher;

  ngAfterContentInit(): void {
    this.titleFormControl = new FormControl('', [
      Validators.required
    ]);

    this.descFormControl = new FormControl('');
    this.frequencyFormControl = new FormControl(1);
    this.priorityFormControl = new FormControl(1);
    this.useSTERFormControl = new FormControl(true);
  }

  submit() {
    const title = this.titleFormControl.value;
    const frequency = this.frequencyFormControl.value;
    const desc = this.descFormControl.value;
    const priority = this.priorityFormControl.value;
    const useSTER = this.useSTERFormControl.value;
    const userOptions: Option[] = useSTER ? [
      {
        name: 'selflessness',
        min: 0,
        max: 100
      },
      {
        name: 'timelessness',
        min: 0,
        max: 100
      },
      {
        name: 'effortlessness',
        min: 0,
        max: 100
      },
      {
        name: 'richness',
        min: 0,
        max: 100
      }
    ] : [];

    const tags = [];
    const comments = '';
    const playlists = [];

    const activity: Activity = {
      id: uuidv1(),
      title,
      desc,
      frequency,
      priority,
      userOptions,
      tags,
      comments
    };
    this.dialogAddRef.close(activity);
  }
}
