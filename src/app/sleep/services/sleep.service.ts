import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { MopidyService } from 'src/app/mopidy/services/mopidy.service';
import { SleepTimer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
  private sleepTimerSubject = new BehaviorSubject<SleepTimer>(null);

  timeoutHandle = null;

  constructor(private mopidyService: MopidyService) {}

  get sleepTimer() {
    return this.sleepTimerSubject.asObservable();
  }

  setSleepTimer(minutes: number) {
    this.clearCurrentTimeout();

    const finishedAt = moment()
      .add(minutes, 'minutes')
      .toDate();
    const sleepTime = { minutes, finishedAt };
    const timeout = minutes * 60 * 1000;
    this.sleepTimerSubject.next(sleepTime);
    console.log('SleepService.setSleepTimer', sleepTime, timeout);

    setTimeout(() => {
      this.mopidyService.stopPlay();
      this.sleepTimerSubject.next(null);
    }, timeout);
  }

  stopSleepTimer() {
    this.clearCurrentTimeout();
    this.sleepTimerSubject.next(null);
  }

  private clearCurrentTimeout() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}
