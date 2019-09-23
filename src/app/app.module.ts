import { SelectActivityMenuComponent } from './components/select-activity-menu/select-activity-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './meterial/material.module';
import { ActivitiesView } from './view/actvities/actvities.view';
import { HistoryView } from './view/history/history.component';
import { RandomActivityView } from './view/random-activity/random-activity.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardComponent } from './components/card/card.component';
import { AddActivityDialogComponent } from './components/add-activity-dialog/add-activity-dialog.component';
import { DeleteActivityDialogComponent } from './components/delete-dialog';
import { UpdateActivityDialogComponent } from './components/update-activity-dialog/update-activity-dialog.component';
import { ActivtyDoneDialogComponent } from './components/activty-done-dialog/activty-done-dialog.component';
import { SeporatorComponent } from './components/seporator/seporator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { MinyActivityCardComponent } from './components/miny-activity-card/miny-activity-card.component';
import { PageNotFoundView } from './view/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivitiesView,
    HistoryView,
    RandomActivityView,
    NavigationComponent,
    CardComponent,
    AddActivityDialogComponent,
    DeleteActivityDialogComponent,
    UpdateActivityDialogComponent,
    ActivtyDoneDialogComponent,
    SeporatorComponent,
    HistoryItemComponent,
    SelectActivityMenuComponent,
    MinyActivityCardComponent,
    PageNotFoundView
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddActivityDialogComponent,
    DeleteActivityDialogComponent,
    UpdateActivityDialogComponent,
    ActivtyDoneDialogComponent
  ]
})
export class AppModule { }
