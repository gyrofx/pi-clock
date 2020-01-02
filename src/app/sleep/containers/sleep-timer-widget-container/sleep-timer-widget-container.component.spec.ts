import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTimerWidgetContainerComponent } from './sleep-timer-widget-container.component';

describe('SleepTimerWidgetContainerComponent', () => {
  let component: SleepTimerWidgetContainerComponent;
  let fixture: ComponentFixture<SleepTimerWidgetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepTimerWidgetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTimerWidgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
