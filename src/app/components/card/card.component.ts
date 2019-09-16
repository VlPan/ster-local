import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Activity } from 'src/app/models';
import { DeleteActivityDialogComponent } from '../delete-dialog';
import { UpdateActivityDialogComponent } from '../update-activity-dialog/update-activity-dialog.component';



@Component({
  selector: 'st-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit {

  showTooltipDesc: boolean;
  showTooltipTitle: boolean;
  cardSettingsMenuOpen = false;
  @Input() activity: Activity;
  @Output() deleted: EventEmitter < any > = new EventEmitter();
  @Output() updated: EventEmitter < any > = new EventEmitter();
  @ViewChild('desc', {static: false}) descEl: ElementRef;
  @ViewChild('title', {static: false}) titleEl: ElementRef;
  @ViewChild('cardMenu', {static: false}) cardMenuEl: ElementRef;

  constructor(private cd: ChangeDetectorRef, public dialog: MatDialog) {}


  ngAfterViewInit() {

    const scrollHeight = this.descEl.nativeElement.scrollHeight;
    const offsetHeight = this.descEl.nativeElement.offsetHeight;

    const scrollWidth = this.titleEl.nativeElement.scrollWidth;
    const offsetWidth = this.titleEl.nativeElement.offsetWidth;

    if (scrollHeight > offsetHeight) {
        this.showTooltipDesc = true;
        this.cd.detectChanges();
    }

    if (scrollWidth > offsetWidth) {
      this.showTooltipTitle = true;
      this.cd.detectChanges();
    }
  }

  deleteCard(activity: Activity) {
    this.deleted.emit(activity.id);
  }

  updateCard(updatedActivity: Activity) {
    this.updated.emit(updatedActivity);
  }

  toggleCardSettingsMenu() {
    this.cardSettingsMenuOpen = !this.cardSettingsMenuOpen;
  }
  closeCardSettingsMenu() {
    this.cardSettingsMenuOpen = false;
  }

  openCardSettingsMenu() {
    this.cardSettingsMenuOpen = true;
    this.cardMenuEl.nativeElement.focus();
  }

  openActivityDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteActivityDialogComponent, {
      data: { activity: this.activity }
    });

    const subsriber = dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteCard(this.activity);
        subsriber.unsubscribe();
      }
    });
  }

  openActivityUpdateDialog() {
    const dialogRef = this.dialog.open(UpdateActivityDialogComponent, {
      data: { activity: this.activity }
    });

    const subsriber = dialogRef.afterClosed().subscribe(updatedActivty => {
      if (updatedActivty) {
        console.log(updatedActivty);
        this.updateCard(updatedActivty);
        subsriber.unsubscribe();
      }
    });
  }

}
