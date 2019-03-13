import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTimetableComponent } from './list-timetable.component';

describe('CalendarComponent', () => {
  let component: ListTimetableComponent;
  let fixture: ComponentFixture<ListTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
