import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../services';
import { Observable } from 'rxjs';
import { NextAlarm } from '../../models';

@Component({
  selector: 'app-next-alarm-container',
  template: `
    <app-next-alarm [nextAlarm]="nextAlarm$ | async"> </app-next-alarm>
  `,
  styles: [],
})
export class NextAlarmContainerComponent implements OnInit {
  nextAlarm$: Observable<NextAlarm>;

  constructor(private alarmService: AlarmService) {}

  ngOnInit() {
    this.nextAlarm$ = this.alarmService.nextAlarm;
  }
}
