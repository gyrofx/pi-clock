import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimerWidgetComponent } from './sleep-timer-widget.component';

describe('SleepTimerWidgetComponent', () => {
  let component: SleepTimerWidgetComponent;
  let fixture: ComponentFixture<SleepTimerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepTimerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
