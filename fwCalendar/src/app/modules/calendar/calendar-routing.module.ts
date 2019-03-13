import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../../auth/auth.guard';
import {ListTimetableComponent} from './list-timetable/list-timetable.component';
import {AddDaylistComponent} from './add-daylist/add-daylist.component';
import {OverviewComponent} from './overview/overview.component';
import {CalendarComponent} from './calendar.component';

const routes: Routes = [
  {
    path: 'main',
    component: CalendarComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        outlet: 'cal'
      },
      {
        path: 'listTimetable',
        component: ListTimetableComponent,
        outlet: 'cal'
      },
      {
        path: 'addDaylist',
        component: AddDaylistComponent,
        outlet: 'cal'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {
}
