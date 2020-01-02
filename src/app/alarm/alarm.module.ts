import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { BsLocaleService, ButtonsModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SleepModule } from '../sleep/sleep.module';
import { AlaramFormComponent } from './components/alaram-form/alaram-form.component';
import { AlarmOverviewComponent } from './components/alarm-overview/alarm-overview.component';
import { NextAlarmComponent } from './components/next-alarm/next-alarm.component';
import { AlarmEditContainerComponent } from './containers/alarm-edit-container/alarm-edit-container.component';
import { NextAlarmContainerComponent } from './containers/next-alarm-container/next-alarm-container.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes = [
  { path: 'alarm', component: AlarmOverviewComponent },
  { path: 'alarm/:id', component: AlarmEditContainerComponent },
];

@NgModule({
  providers: [BsLocaleService],
  declarations: [
    AlarmOverviewComponent,
    AlaramFormComponent,
    AlarmEditContainerComponent,
    NextAlarmComponent,
    NextAlarmContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    SleepModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule.setLocale('de'),
  ],
  exports: [NextAlarmContainerComponent],
})
export class AlarmModule {}
