import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ElectronModule } from '../electron/electron.module';
import { MopidyModule } from '../mopidy/mopidy.module';
import { IdleScreenComponent } from './components/idle-screen/idle-screen.component';

@NgModule({
  declarations: [IdleScreenComponent],
  imports: [CommonModule, MopidyModule, ElectronModule],
  exports: [IdleScreenComponent],
})
export class IdleScreenModule {}
