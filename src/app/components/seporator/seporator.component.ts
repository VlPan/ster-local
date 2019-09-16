import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'st-seporator',
  templateUrl: './seporator.component.html',
  styleUrls: ['./seporator.component.scss']
})
export class SeporatorComponent {

  @Input() marginTop = 10;
  @Input() marginBottom = 10;
  constructor() { }

}
