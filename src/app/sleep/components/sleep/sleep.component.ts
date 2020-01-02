import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SleepService } from '../../services/sleep.service';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SleepComponent implements OnInit {
  form = this.fb.group({
    minutes: 30,
  });

  constructor(private fb: FormBuilder, private sleepService: SleepService) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      this.sleepService.setSleepTimer(value.minutes);
    });
  }
}
