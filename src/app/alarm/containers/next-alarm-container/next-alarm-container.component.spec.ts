import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextAlarmContainerComponent } from './next-alarm-container.component';

describe('NextAlarmContainerComponent', () => {
  let component: NextAlarmContainerComponent;
  let fixture: ComponentFixture<NextAlarmContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextAlarmContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextAlarmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
