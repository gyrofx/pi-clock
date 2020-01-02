import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NextAlarm } from '../../models';

@Component({
  selector: 'app-next-alarm',
  templateUrl: './next-alarm.component.html',
  styleUrls: ['./next-alarm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextAlarmComponent implements OnInit {
  @Input()
  nextAlarm: NextAlarm;

  constructor() {}

  ngOnInit() {}
}
