import * as moment from 'moment';

export interface EventAction {
  id: number;
  action: string;
  timetable: Timetable;
  device: number[];
}

export interface Timetable {
  id: number;
  name: string;
  condition: Daylist[];
}

export interface Daylist {
  id: string;
  name: string;
  validity: Validity[];
  priority: number;
}

export interface Validity {
  dateRanges: DateRange[]; //Datumsbereich
  recurrences: string[]; //Cron String, Wiederholungsschema
  timeRanges: TimeRange[]; //Zeitbereich von 0-24 h
}

export interface TimeRange {
  id?: string;
  start: any;
  end: any;
}

export interface DateRange {
  start: any;
  end: any;
}

export interface Camera {
  id: number;
  name?: string;
}

export interface CalEvents {
  id?: string;
  title: string;
  start: any;
  end: any;
}
