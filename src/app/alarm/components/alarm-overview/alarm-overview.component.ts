import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alarm } from '../../models';
import { AlarmService } from '../../services';

@Component({
  selector: 'app-alarm-overview',
  templateUrl: './alarm-overview.component.html',
  styleUrls: ['./alarm-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmOverviewComponent implements OnInit {
  alarmList$: Observable<Alarm[]>;

  daysOfWeekText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private alarmService: AlarmService, private router: Router) {
    this.alarmList$ = this.alarmService.alarmList();
  }

  ngOnInit() {}

  onChangeList(alarms: Alarm[]) {
    this.alarmService.saveAll(alarms);
    this.router.navigate(['/idle']);
  }

  onEdit(alarm: Alarm) {
    this.router.navigate(['edit', alarm.index]);
  }

  onClick(value: any, alarm: Alarm) {
    const { enabled } = alarm;
    this.alarmService.save({ ...alarm, enabled: !enabled });
  }

  daysOfWeek(alarm: Alarm) {
    if (alarm.daysOfWeek.every(day => day)) {
      return 'Every day';
    }

    return alarm.daysOfWeek
      .map((value, index) => (value ? this.daysOfWeekText[index] : null))
      .filter(day => day)
      .join(', ');
  }
}
