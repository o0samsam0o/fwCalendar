import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import 'fullcalendar';
import * as moment from 'moment';

import {TimeRangeDialogComponent} from '../time-range-dialog/time-range-dialog.component';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {CalendarService} from '../calendar.service';
import {CalEvents, Camera, Daylist, EventAction, TimeRange, Validity} from '../interfaces';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {

  overviewCalElement: any;
  title: string;
  daylists: Daylist[];
  validity: Validity[];
  eventActions: EventAction[];
  calEvents: CalEvents[];
  daylistEvents: TimeRange[];

  displayedColumns: string[] = ['select', 'name'];
  cameras = null;

  selection = new SelectionModel<Camera>(false, []);
  showSearchBar = false;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              protected calService: CalendarService) {
  }

  ngOnInit() {
    this.getAllCameras();
    this.getDaylists();
  }

  ngAfterViewInit() {
    const self = this;
    this.overviewCalElement = $('#calendar');

    this.overviewCalElement.fullCalendar({
      height: 'parent',
      defaultView: 'agendaWeek',
      locale: 'de',
      handleWindowResize: true,
      timeFormat: 'H:mm', // uppercase H for 24-hour clock
      slotLabelFormat: [
        'dd DD MMMM YYYY ',
        'H:mm'
      ],
      slotEventOverlap: false,
      allDaySlot: false,
      editable: false,
      buttonText: {
        today: 'Heute',
        month: 'Monat',
        week: 'Woche',
        day: 'Tag',
        list: 'Liste'
      },
      now: moment(),
      nowIndicator: true,
      scrollTime: '08:00', // undo default 6am scrollTime
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'agendaDay,agendaWeek,month,listWeek'
      },
      eventClick: function (calEvent) {
        self.openEventDialog(calEvent);
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Friday

        start: '09:00', // a start time (10am in this example)
        end: '18:00', // an end time (6pm in this example)
      },
      eventSources: this.daylists
    });
  }

  openEventDialog(calEvent): void {

    const dialogRef = this.dialog.open(TimeRangeDialogComponent, {
      panelClass: 'fw-align-right',
      width: 'Auto',
      data: {
        event: calEvent,
        isEditable: false
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });

  }

  getDaylists(): void {
    this.calService.getDaylists()
      .subscribe(
        data => {
          this.daylists = data;
          // this.daylistEvents = this.daylists.map(({timeRanges}) => timeRanges);
          // this.daylistEvents = ([] as TimeRange[]).concat(...this.daylistEvents);
        },
        error => console.log('error getTimetables ' + error),
        () => {
          //this.overviewCalElement.fullCalendar('addEventSource', this.daylistEvents);
        }
      );
  }

  getAllCameras(): void {
    this.calService.getCameras()
      .subscribe(
        sources => {
          this.cameras = new MatTableDataSource(sources);
          this.cameras.sort = this.sort;
        }
      );
  }

  getEventActionForCamera(id: number): void {
    this.calService.getEventActionForCamera(id)
      .subscribe(
        result => {
          this.calEvents = result;
        },
        error => console.log('error getTimetables ' + error),
        () => {
          this.overviewCalElement.fullCalendar('removeEvents');
          this.overviewCalElement.fullCalendar('addEventSource', this.calEvents);
        }
      );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.cameras.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.cameras.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.cameras.filter = filterValue.trim().toLowerCase();
  }

  updateOverview(selection: any, cam: any) {
    if (selection.selected.length > 0) {
      this.getEventActionForCamera(cam.id);
    } else {
      this.overviewCalElement.fullCalendar('removeEvents');
    }
  }
}
