import { Component } from '@angular/core';
import { Link } from './models';

@Component({
  selector: 'st-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links: Link[] = [
    {
      name: 'Random',
      value: '/',
      icon: 'fa fa-random menu__icon'

    },
    {
      name: 'Activities',
      value: '/activities',
      icon: 'fa fa-adn menu__icon'
    },
    {
      name: 'Activities History',
      value: '/history',
      icon: 'fa fa-history menu__icon'
    },
  ];
}
