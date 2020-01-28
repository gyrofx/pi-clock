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
      [0, 1, 2, 3, 4],
      list.map(alarm => alarm.index)
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
      daysOfWeek: [false, false, false, false, false, false, false],
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
        .filter(alarm => alarm.daysOfWeek.some(day => day))
        .map(alarm => {
          return {
            alarm,
            date: _.head(this.getNextAlarmDates(now, alarm)),
          } as NextAlarm;
        }),
      item => item.date
    );
    console.log('AlarmService', 'determineNextAlarm', 'nextAlarams', nextAlarams);
    const nextAlarm = _.head(nextAlarams);
    console.log('AlarmService', 'determineNextAlarm', 'nextAlarm', nextAlarm);
    this.nextAlarmSubject.next(nextAlarm ? nextAlarm : null);
  }

  private getNextAlarmDates(now: Date, alarm: Alarm): Date[] {
    const dayOfWeek = now.getDay();

    // Iterate through all week days and calculate the alarm date for that day (if enaled)
    const nextAlarmDates = _.sortBy(
      alarm.daysOfWeek
        .map((enable, index) => {
          if (enable) {
            const alarmDate = moment(now);
            alarmDate.hours(alarm.hour);
            alarmDate.minutes(alarm.minute);
            alarmDate.seconds(0);
            alarmDate.milliseconds(0);
            alarmDate.add(index - dayOfWeek, 'days');
            if (alarmDate.toDate() < now) {
              alarmDate.add(1, 'week');
            }
            return alarmDate.toDate();
          }

          return null;
        })
        .filter(item => item)
    );

    return nextAlarmDates;
  }
}
