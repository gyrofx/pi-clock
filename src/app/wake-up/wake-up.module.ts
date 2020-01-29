import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WakeUpComponent } from './components';
import { WakeUpContainerComponent } from './containers';

@NgModule({
  declarations: [WakeUpComponent, WakeUpContainerComponent],
  imports: [CommonModule],
  exports: [WakeUpContainerComponent],
})
export class WakeUpModule {}
