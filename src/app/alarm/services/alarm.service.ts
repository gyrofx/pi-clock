import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Alarm, NextAlarm } from '../models';
import { AlarmStorageService } from './alarm-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  private alarmListSubject: BehaviorSubject<Alarm[]> = new BehaviorSubject([]);
  private nextAlarmSubject: BehaviorSubject<NextAlarm> = new BehaviorSubject(null);

  constructor(private storageService: AlarmStorageService) {
    this.alarmListSubject.subscribe(alarmList => {
      this.determineNextAlarm();
    });
  }

  alarmList(): Observable<Alarm[]> {
    return this.alarmListSubject.asObservable();
  }

  get(index: number) {
    return of(this.alarmListSubject.value[index]);
  }

  load() {
    const list = this.storageService.load();

    // we always want 5 alarm entites
    const missingAlarms = _.difference(
      list.map(alarm => alarm.index),
      [0, 1, 2, 3, 4]
    );
    const alarmList = [...list, ...missingAlarms.map(index => this.createAlarm(index))];

    this.alarmListSubject.next(_.sortBy(alarmList, alarm => alarm.index));
  }

  save(alarm: Alarm) {
    const newList = _.sortBy(
      [alarm, ...this.alarmListSubject.value.filter(a => a.index !== alarm.index)],
      (obj: Alarm) => obj.index
    );

    this.saveAll(newList);
  }

  saveAll(alarms: Alarm[]) {
    this.storageService.store(alarms);
    this.alarmListSubject.next(alarms);
  }

  private createAlarm(index: number): Alarm {
    return {
      index,
      enabled: false,
      hour: 7,
      minute: 0,
      daysOfWeek: [true, true, true, true, true, true, true],
      duration: 30,
      playlist: null,
      volume: 10,
    };
  }

  get nextAlarm() {
    return this.nextAlarmSubject.asObservable();
  }

  determineNextAlarm() {
    const alarmList: Alarm[] = this.alarmListSubject.value;

    const now = new Date();
    const nextAlarams: NextAlarm[] = _.sortBy(
      alarmList
        .filter(alarm => alarm.enabled)
        .map(alarm => {
          return { alarm, date: this.getNextAlarmDate(now, alarm) };
        }),
      item => item.nextAlarmDate
    );
    if (nextAlarams.length) {
      const nextAlarm = nextAlarams[0];
      this.nextAlarmSubject.next(nextAlarm);
    } else {
      this.nextAlarmSubject.next(null);
    }
  }

  private getNextAlarmDate(now: Date, alarm: Alarm): Date {
    const dayOfWeek = now.getDay();
    const dayOfWeekFromToday = [
      ...alarm.daysOfWeek.slice(dayOfWeek),
      ...alarm.daysOfWeek.slice(0, dayOfWeek > 0 ? dayOfWeek : 0),
    ];
    const alarmLaterToday = now.getHours() * 60 + now.getMinutes() < alarm.hour * 60 + alarm.minute;

    const daysInTheFuture = dayOfWeekFromToday.findIndex(
      (value, index) => value && (alarmLaterToday || (!alarmLaterToday && index > 0))
    );
    const nextAlarmDate = moment().add(daysInTheFuture >= 0 ? daysInTheFuture : 0, 'days');

    nextAlarmDate.hours(alarm.hour);
    nextAlarmDate.minutes(alarm.minute);
    nextAlarmDate.seconds(0);
    nextAlarmDate.milliseconds(0);
    const ii = nextAlarmDate.toDate();
    return nextAlarmDate.toDate();
  }
}
