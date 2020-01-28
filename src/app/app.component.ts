import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { MopidyService } from './mopidy/services/mopidy.service';
import { WakeUpService } from './wake-up/services/wake-up.service';
import { AlarmService } from './alarm/services';
import { ElectronService } from './electron/services/electron.service';
import { ScriptLoadService } from './utils/scripts/services/script-load.service';
// const log = require('electron-log');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'pi-clock';

  constructor(
    private idle: Idle,
    private router: Router,
    private alarmService: AlarmService,
    private wakeupService: WakeUpService
  ) {
    console.log('AppComponent');

    this.alarmService.load();

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(60);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleStart.subscribe(() => {
      console.log('AppComponent', 'goto Idle');
      this.goToIdle();
    });

    this.idle.watch();

    this.wakeupService.init();
  }

  ngOnInit(): void {
    registerLocaleData(localeDe, 'de');
  }

  goToIdle() {
    this.router.navigate(['/idle']);
  }

  goToAlarm() {
    this.router.navigate(['/alarm']);
  }

  goToPlayer() {
    this.router.navigate(['/player']);
  }

  goToSleep() {
    this.router.navigate(['/sleep']);
  }
}
