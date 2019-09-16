import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesView } from './view/actvities/actvities.view';
import { HistoryView } from './view/history/history.component';
import { RandomActivityView } from './view/random-activity/random-activity.component';


const routes: Routes = [
  { path: 'activities', component: ActivitiesView },
  { path: 'history', component: HistoryView },
  { path: '',
    component: RandomActivityView,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
