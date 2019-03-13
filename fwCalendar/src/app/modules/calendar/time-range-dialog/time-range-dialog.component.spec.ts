import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeDialogComponent } from './time-range-dialog.component';

describe('EventDialogComponent', () => {
  let component: TimeRangeDialogComponent;
  let fixture: ComponentFixture<TimeRangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
