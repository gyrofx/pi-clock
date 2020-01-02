import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MomentModule } from 'ngx-moment';
import { SleepTimerWidgetComponent } from './components/sleep-timer-widget/sleep-timer-widget.component';
import { SleepComponent } from './components/sleep/sleep.component';
import { SleepTimerWidgetContainerComponent } from './containers/sleep-timer-widget-container/sleep-timer-widget-container.component';

@NgModule({
  declarations: [SleepComponent, SleepTimerWidgetContainerComponent, SleepTimerWidgetComponent],
  imports: [CommonModule, ReactiveFormsModule, MomentModule, MatSliderModule],
  exports: [SleepComponent, SleepTimerWidgetContainerComponent],
})
export class SleepModule {}
