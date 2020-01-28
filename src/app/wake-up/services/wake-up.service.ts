import { Injectable } from '@angular/core';
import { AlarmService } from '../../alarm/services';
import { SleepService } from '../../sleep/services/sleep.service';
import { MopidyService } from '../../mopidy/services/mopidy.service';
import { Alarm } from 'src/app/alarm/models';

@Injectable({
  providedIn: 'root',
})
export class WakeUpService {
  private timeoutHandle;
  constructor(
    private alarmService: AlarmService,
    private sleepService: SleepService,
    private mopidyService: MopidyService
  ) {
    this.init();
  }

  init() {
    this.alarmService.nextAlarm.subscribe(nextAlarm => {
      this.clearCurrentTimeout();

      if (nextAlarm) {
        const now = new Date();

        const timeout = nextAlarm.date.getTime() - now.getTime();
        console.log('WakeUpService', 'setting up next alarm: ', nextAlarm, timeout / 1000);

        this.timeoutHandle = setTimeout(() => {
          this.alarm(nextAlarm.alarm);
        }, timeout);
      }
    });
  }

  private alarm(alarm: Alarm) {
    console.log('WakeUpService', 'ALARM', alarm, Date());
    if (alarm.playlist) {
      this.mopidyService.volume = alarm.volume;
      this.mopidyService.playPlayList(alarm.playlist.uri);
      this.sleepService.setSleepTimer(alarm.duration);
      this.alarmService.determineNextAlarm();
    }
  }

  private clearCurrentTimeout() {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}
