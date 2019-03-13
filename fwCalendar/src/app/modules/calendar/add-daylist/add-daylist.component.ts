import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import 'fullcalendar';
import * as moment from 'moment';

import {TimeRangeDialogComponent} from '../time-range-dialog/time-range-dialog.component';
import {MatDialog} from '@angular/material';

import {CronJobsConfig, CronJobsValidationConfig} from '../cron/contracts';
import {TimeRange, Daylist, Validity, DateRange} from '../interfaces';
import {v4 as uuid} from 'uuid';
import {CalendarService} from '../calendar.service';

@Component({
  selector: 'app-add-daylist',
  templateUrl: './add-daylist.component.html',
  styleUrls: ['./add-daylist.component.scss']
})
export class AddDaylistComponent implements OnInit, AfterViewInit {

  daylistCalElement: any;
  daylist: Daylist;

  cronConfig: CronJobsConfig = {
    multiple: true,
    option: {
      minute: false,
      hour: false
    }
  };

  cronValidate: CronJobsValidationConfig = {
    validate: true
  };

  daylistForm: FormGroup;
  dateRanges: FormArray;
  recurrences: FormArray;

  freqSec = '';
  freqControl: FormControl;

  dateRangeForm(): FormGroup {
    return this.fb.group({
      start: moment(),
      end: moment()
    });
  }

  constructor(public dialog: MatDialog,
              private fb: FormBuilder,
              protected calendarService: CalendarService) {
  }

  ngOnInit() {
    this.daylistForm = this.fb.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(3)]],
      validity: this.fb.array([
        this.fb.group({
          dateRanges: this.fb.array([]),
          recurrences: this.fb.array([]),
          timeRanges: this.fb.array([]),
        })]),
      priority: 1
    });

    console.log(this.daylistForm);
  }

  ngAfterViewInit(): void {
    const self = this;
    this.daylistCalElement = $('#daylist');

    this.daylistCalElement.fullCalendar({
      height: 'parent',
      defaultView: 'agendaDay',
      locale: 'de',
      timeFormat: 'H:mm', // uppercase H for 24-hour clock
      slotLabelFormat: [
        'dd DD MMMM YYYY ',
        'H:mm'
      ],
      slotEventOverlap: false,
      allDaySlot: false,
      header: false,
      columnHeader: false,
      nowIndicator: false,
      editable: true, // enable draggable events
      scrollTime: '08:00', // undo default 6am scrollTime
      selectable: true,
      businessHours: {
        start: '09:00', // a start time (9am in this example)
        end: '18:00', // an end time (6pm in this example)
      },
      select: function (startDate, endDate) {
        self.createNewTimeRange(startDate, endDate);
      },
      eventClick: function (event) {
        self.openTimeRangeDialog(event);
        console.log(event);
      }
    });
  }

  openTimeRangeDialog(calEvent): void {
    const dialogRef = this.dialog.open(TimeRangeDialogComponent, {
      panelClass: 'fw-align-right',
      width: 'Auto',
      data: {
        event: calEvent,
        isEditable: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      calEvent = result;
      this.daylistCalElement.fullCalendar('updateEvent', calEvent);
    });
  }

  createNewTimeRange(startTime, endTime): void {
    const timeRange: TimeRange = {
      id: uuid(),
      start: startTime.format(),
      end: endTime.format()
    };

    this.daylistCalElement.fullCalendar('renderEvent', timeRange, true);
  }

  addDateRange(): void {
    const control = <FormArray>this.daylistForm.get('validity').get('0').get('dateRanges') as FormArray;
    control.push(this.dateRangeForm());
  }

  addRecurrence(): void {
    this.freqControl = new FormControl();
    this.freqControl.setValue(this.freqSec);
    this.freqControl.setValidators([Validators.required]);
    this.freqControl.valueChanges
      .subscribe(value => this.freqSec = value);

    const control = <FormArray>this.daylistForm.get('validity').get('0').get('recurrences') as FormArray;
    control.push(this.freqControl);
  }

  deleteDateRange(control, index) {
    control.removeAt(index);
  }

  deleteRecurrence(control, index) {
    control.removeAt(index);
  }

  onDaylistFormSubmit() {
    const result: Daylist = Object.assign({}, this.daylistForm.value);

    /*const eventData: Event[] = this.daylistCalElement.fullCalendar('clientEvents').map(e => ({
      id: e._id,
      start: e.start,
      end: e.end
    }));

    //deep copy so that events object will not lose its Type
    result.timeRanges = Object.assign([], eventData);
    */
    console.log(result);

    this.calendarService.addDaylist(result)
      .subscribe(
        data => {},
        error => console.log('error addTimetable ' + error),
        () => console.log('added timetable ${result.title}')
      );
  }

}
