import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleModule } from '@ng-idle/core';
import { AlarmModule } from './alarm/alarm.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdleScreenModule } from './idle-screen/idle-screen.module';
import { MopidyModule } from './mopidy/mopidy.module';
import { PlayerModule } from './player/player.module';
import { SleepModule } from './sleep/sleep.module';
import { WakeUpModule } from './wake-up/wake-up.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IdleScreenModule,
    PlayerModule,
    AlarmModule,
    SleepModule,
    MopidyModule,
    NgIdleModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    WakeUpModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
