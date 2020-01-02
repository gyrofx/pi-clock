import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextAlarmComponent } from './next-alarm.component';

describe('NextAlarmComponent', () => {
  let component: NextAlarmComponent;
  let fixture: ComponentFixture<NextAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
