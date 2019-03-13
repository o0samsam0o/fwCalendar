import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDaylistComponent } from './add-daylist.component';

describe('TimetableComponent', () => {
  let component: AddDaylistComponent;
  let fixture: ComponentFixture<AddDaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
