import { Injectable } from '@angular/core';
import { Alarm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AlarmStorageService {
  load(): Alarm[] {
    try {
      const alarms = localStorage.getItem('alarms') || '[]';
      return JSON.parse(alarms);
    } catch (e) {
      console.error('AlarmStorageService.load', 'JSON parse error :', e);
      return [];
    }
  }

  store(items: Alarm[]) {
    localStorage.setItem('alarms', JSON.stringify(items));
  }
}
