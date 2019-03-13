import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TimeRange} from '../interfaces';

@Component({
  selector: 'app-time-range-dialog',
  templateUrl: './time-range-dialog.component.html',
  styleUrls: ['./time-range-dialog.component.scss']
})

export class TimeRangeDialogComponent implements OnInit {
  private isEditable = true;
  timeRangeInfoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<TimeRangeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.isEditable = this.data.isEditable;

    this.timeRangeInfoForm = this.fb.group({
      start: this.data.event.start,
      end: this.data.event.end
    });
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close();
  }

  submit() {
    if (this.timeRangeInfoForm.invalid) {
      return;
    } else {
       const result: TimeRange = Object.assign({}, this.timeRangeInfoForm.value);
      /*
      this.data.event.start = moment(this.eventInfoForm.value.start, 'h:mm');
      this.data.event.end = moment(this.eventInfoForm.value.end, 'h:mm');
      */
      console.log(result);
      /* Any API call logic via services goes here */
      this.dialogRef.close(result);
    }
  }

}
