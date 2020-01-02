import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { SleepTimer } from '../../models';

@Component({
  selector: 'app-sleep-timer-widget',
  templateUrl: './sleep-timer-widget.component.html',
  styleUrls: ['./sleep-timer-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SleepTimerWidgetComponent implements OnChanges, OnDestroy {
  @Input()
  sleepTimer: SleepTimer;

  intervalHandle = null;
  duration = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sleepTimer && changes.sleepTimer.currentValue) {
      this.intervalHandle = setInterval(() => {
        this.duration = (this.sleepTimer.finishedAt.getTime() - new Date().getTime()) / 1000;
        this.cdr.markForCheck();
      }, 1000);
    } else {
      clearInterval(this.intervalHandle);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
  }
}
