import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from '../../auth/auth.guard';
import {CalendarRoutingModule} from './calendar-routing.module';
import {ListTimetableComponent} from './list-timetable/list-timetable.component';
import {TimeRangeDialogComponent} from './time-range-dialog/time-range-dialog.component';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {AddDaylistComponent} from './add-daylist/add-daylist.component';
import {CronJobsComponent} from './cron/cron-jobs/cron-jobs.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { OverviewComponent } from './overview/overview.component';
import {CalendarComponent} from './calendar.component';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { DeleteTimetableComponent } from './delete-timetable/delete-timetable.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  declarations: [
    CalendarComponent,
    CronJobsComponent,
    DatepickerComponent,
    TimeRangeDialogComponent,
    ListTimetableComponent,
    AddDaylistComponent,
    OverviewComponent,
    AddTimetableComponent,
    DeleteTimetableComponent
  ],
  entryComponents: [
    TimeRangeDialogComponent,
    DatepickerComponent,
    AddTimetableComponent,
    DeleteTimetableComponent
  ],
  providers: [AuthGuard]
})
export class CalendarModule {
}
