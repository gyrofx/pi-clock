import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdleScreenComponent } from './idle-screen/components/idle-screen/idle-screen.component';
import { AlarmOverviewComponent } from './alarm/components/alarm-overview/alarm-overview.component';
import { PlayerModule } from './player/player.module';
import { PlayerComponent } from './player/components/player/player.component';
import { SleepModule } from './sleep/sleep.module';
import { SleepComponent } from './sleep/components/sleep/sleep.component';
import { WakeUpContainerComponent } from './wake-up/containers';

const routes: Routes = [
  { path: 'idle', component: IdleScreenComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'sleep', component: SleepComponent },
  { path: 'wakeup', component: WakeUpContainerComponent },
  // { path: '**', component: IdleScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
