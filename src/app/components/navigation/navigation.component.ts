import { Component, OnInit, Input } from '@angular/core';
import { Link } from 'src/app/models';

@Component({
  selector: 'st-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() links: Link[];
  menuToggled = false;

  constructor() { }

  toggleMenu() {
    this.menuToggled = !this.menuToggled;
  }

  ngOnInit() {
  }

}
