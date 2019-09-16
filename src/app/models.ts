import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export interface NavigationConfig {
  links: Link[];
}

export interface Link {
  value: string;
  name: string;
  icon?: string;
}

export interface ActivityHistoryItem {
  id: string;
  activity: Activity;
  savedOptions: SavedOption[];
  time: number;
  scores: number;
}

export interface SavedOption {
  name: string;
  value: number;
}

export interface Option {
  name: string;
  min: number;
  max: number;
}

export interface Activity {
  id?: string;
  title: string;
  desc?: string;
  tags?: string[];
  comments?: string;
  frequency?: number;
  priority?: number;
  color?: string;
  playlists?: Playlist[];
  userOptions?: Option[];
}

export interface Option {
  name: string;
  min: number;
  max: number;
}
export interface Playlist {
  activities: Activity[];
  icon: string;
  color: string;
}
export interface STERModel {
  selfLessNess: number;
  timeLessNess: number;
  effortLessNess: number;
  richNess: number;
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
