import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Alarm } from 'src/app/alarm/models';
import { WakeUpService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wake-up-container',
  template: `
    <app-wake-up [alarm]="currentAlarm$ | async" (stop)="onStop()"> </app-wake-up>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUpContainerComponent implements OnInit {
  currentAlarm$: Observable<Alarm>;

  constructor(private wakeUpService: WakeUpService, private router: Router) {}

  ngOnInit() {
    this.currentAlarm$ = this.wakeUpService.wakeUp;
  }

  onStop() {
    this.router.navigate(['/idle']);
  }
}
