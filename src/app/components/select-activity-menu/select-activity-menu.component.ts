import { Activity } from 'src/app/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'st-select-activity-menu',
  templateUrl: './select-activity-menu.component.html',
  styleUrls: ['./select-activity-menu.component.scss']
})
export class SelectActivityMenuComponent implements OnInit {

  @Input() activities: Activity[];
  @Output() activitySelected: EventEmitter<Activity> = new EventEmitter();
  @Output() menuClosed: EventEmitter<Activity> = new EventEmitter();

  closeMenu() {
    this.menuClosed.emit();
  }

  constructor() { }

  ngOnInit() {
  }

  selectActivity(activity: Activity) {
    this.activitySelected.emit(activity);
  }

}
