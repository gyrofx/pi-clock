import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { SleepTimer } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sleep-timer-widget-container',
  template: `
    <app-sleep-timer-widget [sleepTimer]="sleepTimer$ | async"></app-sleep-timer-widget>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SleepTimerWidgetContainerComponent implements OnInit {
  sleepTimer$: Observable<SleepTimer>;

  constructor(private sleepTimerService: SleepService) {}

  ngOnInit() {
    this.sleepTimer$ = this.sleepTimerService.sleepTimer;
  }
}
