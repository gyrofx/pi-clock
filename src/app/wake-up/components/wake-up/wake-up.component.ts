import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AlaramFormComponent } from 'src/app/alarm/components/alaram-form/alaram-form.component';
import { Alarm } from 'src/app/alarm/models';

@Component({
  selector: 'app-wake-up',
  templateUrl: './wake-up.component.html',
  styleUrls: ['./wake-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUpComponent implements OnInit {
  @Input() alarm: Alarm;
  @Output() stop = new EventEmitter<void>();

  currentTime = new Date();

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
