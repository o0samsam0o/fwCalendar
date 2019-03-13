import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {CalEvents, Camera, Daylist, EventAction, Timetable} from './interfaces';
import {LogService} from './log.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class CalendarService {
  private url = 'http://localhost:42000/api/';
  private q = 'query/';
  private c = 'command/';
  private getDaylistsQuery = 'get_tageslisten';
  private calEventsUrl = 'api/calEvents';
  private eventActionUrl = 'api/eventActions';
  private daylistUrl = 'api/daylists';
  private timetableUrl = 'api/timetable';
  private cameraUrl = 'api/cameras';
  private actionUrl = 'api/actions';


  private getCams = 'get_cameras';

  constructor(private http: HttpClient,
              private logService: LogService) {
  }

  /** GET daylists from the server */
  /*getTimetables(): Observable<Timetable[]> {
    return this.http.post<Timetable[]>(this.url + this.q + this.getDaylistsQuery, [])
      .pipe(
        map(val => val),
        catchError(this.handleError('getTimetables', []))
      );
  }*/

  /** GET daylists from the server */

  /*getDaylists(): Observable<Daylist[]> {
    return this.http.post<Daylist[]>(this.url + this.q + this.getDaylistsQuery, [])
      .pipe(
        map(val => val),
        catchError(this.handleError('getDaylist', []))
      );
  }

  getCameras(): Observable<Camera[]> {
    return this.http.post<Camera[]>(this.url + this.q + this.getCams, [])
      .pipe(
        map(val => val),
        tap(data => console.log(data)),
        catchError(this.handleError('getCameras', []))
      );
  }*/

  ///////// In Memory Data Calls ///////////
  /** GET timetables from the in memory data service */
  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.cameraUrl)
      .pipe(
        map(val => val),
        catchError(this.handleError('getCameras', []))
      );
  }

  getDaylists(): Observable<Daylist[]> {
    return this.http.get<Daylist[]>(this.daylistUrl)
      .pipe(
        map(val => val),
        //tap(data => console.log(data)),
        catchError(this.handleError('getDaylists', []))
      );
  }

  getTimetables(): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(this.timetableUrl)
      .pipe(
        map(val => val),
        tap(data => console.log(data)),
        catchError(this.handleError('getTimetables', []))
      );
  }

  getEventActions(): Observable<EventAction[]> {
    return this.http.get<EventAction[]>(this.eventActionUrl)
      .pipe(
        map(val => val),
        //tap(data => console.log(data)),
        catchError(this.handleError('getEventActions', []))
      );
  }

  getEventActionForCamera(id: number): Observable<CalEvents[]> {
    return this.http.get<CalEvents[]>(this.calEventsUrl + id)
      .pipe(
        map(val => val),
        tap(data => console.log(data)),
        catchError(this.handleError('CalEvents'))
      );
  }

  getAllActions(): Observable<String[]> {
    return this.http.get<String[]>(this.actionUrl)
      .pipe(
        map(val => val),
        tap(data => console.log(data)),
        catchError(this.handleError('getActions', []))
      );
  }

  /** POST: add a new eventAction to the server */
  addEventAction(eventAction: EventAction): Observable<EventAction> {
    return this.http.post<EventAction>(this.eventActionUrl, eventAction, httpOptions).pipe(
      tap((ea: EventAction) => this.log('added eventAction w/ id=' + ea.id)),
      catchError(this.handleError<EventAction>('addEventAction'))
    );
  }

  /** POST: add a new daylist to the server */
  addDaylist(daylist: Daylist): Observable<Daylist> {
    return this.http.post<Daylist>(this.daylistUrl, daylist, httpOptions).pipe(
      tap((dl: Daylist) => this.log('added Daylist w/ id=' )),
      catchError(this.handleError<Daylist>('addDaylist'))
    );
  }

  /** DELETE: delete the timetable from the server */
  deleteEventAction(eventAction: EventAction | number): Observable<EventAction> {
    const id = typeof eventAction === 'number' ? eventAction : eventAction;
    const url = `${this.eventActionUrl}/${id}`;

    return this.http.delete<EventAction>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted EventAction id=${id}`)),
      catchError(this.handleError<EventAction>('deleteEventAction'))
    );
  }


  //////// Save methods //////////

  /** POST: add a new daylist to the server */
  /*addTimetable(daylist: Timetable): Observable<Timetable> {
    return this.http.post<Timetable>(this.timetablesUrl, daylist, httpOptions).pipe(
      tap((daylist: Timetable) => this.log('added daylist w/ id=' + daylist.id)),
      catchError(this.handleError<Timetable>('addTimetable'))
    );
  }
*/
  /** DELETE: delete the daylist from the server */
  /*deleteTimetable(daylist: Timetable | number): Observable<Timetable> {
    const id = typeof daylist === 'number' ? daylist : daylist.id;
    const url = `${this.timetablesUrl}/${id}`;

    return this.http.delete<Timetable>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted daylist id=${id}`)),
      catchError(this.handleError<Timetable>('deleteTimetable'))
    );
  }
*/
  /** PUT: update the daylist on the server */

  /*updateTimetable(daylist: Timetable): Observable<any> {
    return this.http.put(this.timetablesUrl, daylist, httpOptions).pipe(
      tap(_ => this.log(`updated daylist id=${daylist.id}`)),
      catchError(this.handleError<any>('updateTimetable'))
    );
  }
*/
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TimetableService message with the LogService */
  private log(message: string) {
    this.logService.add(`TimetableService: ${message}`);
  }
}
