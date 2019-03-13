import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarService} from '../calendar.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {AddTimetableComponent} from '../add-timetable/add-timetable.component';
import {EventAction, Timetable} from '../interfaces';
import {DeleteTimetableComponent} from '../delete-timetable/delete-timetable.component';

@Component({
  selector: 'app-list-timetable',
  templateUrl: './list-timetable.component.html',
  styleUrls: ['./list-timetable.component.scss']
})
export class ListTimetableComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'action'];
  eventActionList = null;
  selection = new SelectionModel<EventAction>(true, []);
  showSearchBar = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private calService: CalendarService) {
  }

  ngOnInit() {
    this.getEventActionList();
  }

  getEventActionList(): void {
    this.calService.getEventActions().subscribe(
      sources => {
        this.eventActionList = new MatTableDataSource(sources);
        this.eventActionList.sort = this.sort;
        this.eventActionList.paginator = this.paginator;
        console.log(sources);
      },
      err => console.log(err),
      () => console.log('complete eventActionList')
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.getEventActionList.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    //this.isAllSelected() ?
    //this.selection.clear() :
    //this.getEventActionList.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    //this.getEventActionList.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTimetableComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.getEventActionList();
    });
  }

  openEditDialog(): void {
    /*
    const dialogRef = this.dialog.open(EditTimetableComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.getTimetableList();
    });
    */
  }

  openDeleteDialog(): void {
    console.log(this.selection);

    const dialogRef = this.dialog.open(DeleteTimetableComponent, {
      data: {selection: this.selection.selected}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ids = this.selection.selected.map(val => val.id);
        console.log(ids);

        ids.forEach(id => {
          this.calService.deleteEventAction(id).subscribe(
            () => {},
            error1 => console.log('error ' + error1),
            () => {
              this.getEventActionList();
              this.selection.clear();
            }
          );
        });
      }
    });
  }

}
