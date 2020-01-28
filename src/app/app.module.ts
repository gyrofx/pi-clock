import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { ScriptsModule } from './utils/scripts/scripts.module';
import { MopidyService } from './mopidy/services';
import { ElectronService } from './electron/services';
import { skipWhile, take } from 'rxjs/operators';
import { ScriptLoadService } from './utils/scripts/services/script-load.service';

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
    ScriptsModule,
  ],
  providers: [
    MopidyService,
    {
      provide: APP_INITIALIZER,
      useFactory: mopidyProviderFactory,
      deps: [MopidyService, ElectronService, ScriptLoadService],
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

export function mopidyProviderFactory(mopidy: MopidyService, electron: ElectronService) {
  return () =>
    new Promise((resolve, reject) => {
      electron.config
        .pipe(
          skipWhile(config => !config),
          take(1)
        )
        .subscribe(config => {
          mopidy.init(config.mopidy.host, config.mopidy.port).then(resolve, reject);
        });
    });
}
