import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models';

@Component({
  selector: 'st-miny-activity-card',
  templateUrl: './miny-activity-card.component.html',
  styleUrls: ['./miny-activity-card.component.scss']
})
export class MinyActivityCardComponent implements OnInit {

  constructor() { }

  @Input() activity: Activity;
  @Output() activitySelected: EventEmitter<Activity> = new EventEmitter();

  ngOnInit() {
  }

  selectActivity() {
    this.activitySelected.emit(this.activity);
  }

}
