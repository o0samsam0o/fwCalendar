import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarService} from '../calendar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {Camera, Daylist} from '../interfaces';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.scss']
})
export class AddTimetableComponent implements OnInit {

  timetableForm: FormGroup;
  actions: String[];
  cameras: any;
  daylists: any;

  displayedColumns: string[] = ['select', 'name'];

  cameraSelection = new SelectionModel<Camera>(false, []);
  daylistSelection = new SelectionModel<Daylist>(false, []);

  showSearchBar = true;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<AddTimetableComponent>,
              private fb: FormBuilder,
              private calService: CalendarService) {
  }

  ngOnInit() {
    this.timetableForm = this.fb.group({
      id: 1,
      action: ['', Validators.required],
      timetable: this.fb.group({
        id: '',
        name: ['', Validators.required],
        condition: []
      }),
      device: []
    });

    this.getActionList();
    this.getCameras();
    this.getDaylists();
  }

  getActionList(): void {
    this.calService.getAllActions().subscribe(
      sources => this.actions = sources,
      err => console.log(err),
      () => console.log('complete eventActionList')
    );
  }

  getCameras(): void {
    this.calService.getCameras().subscribe(
      sources => {
        this.cameras = new MatTableDataSource(sources);
        this.cameras.sort = this.sort;
      },
      err => console.log(err),
      () => console.log('complete cameras')
    );
  }

  getDaylists(): void {
    this.calService.getDaylists().subscribe(
      sources => {
        this.daylists = new MatTableDataSource(sources);
        this.daylists.sort = this.sort;
      },
      err => console.log(err),
      () => console.log('complete daylists')
    );
  }

  submitTimetableForm() {
    this.timetableForm.patchValue( {
      device: this.cameraSelection.selected,
      timetable: {condition: this.daylistSelection.selected}
    });

    console.log(this.timetableForm.value);

    this.calService.addEventAction(this.timetableForm.value).subscribe(
      () => {},
    () => {},
      () => this.dialogRef.close()
    );


  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.cameraSelection.selected.length;
    const numRows = this.cameras.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.cameraSelection.clear() :
      this.cameras.data.forEach(row => this.cameraSelection.select(row));
  }

  applyFilter(filterValue: string) {
    this.cameras.filter = filterValue.trim().toLowerCase();
  }
}
