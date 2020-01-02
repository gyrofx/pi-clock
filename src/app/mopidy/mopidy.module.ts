import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { VolumeWidgetComponent } from './components/volume-widget/volume-widget.component';
import { VolumeWidgetContainerComponent } from './containers/volume-widget-container/volume-widget-container.component';
import { MopidyService } from './services/mopidy.service';

@NgModule({
  declarations: [VolumeWidgetContainerComponent, VolumeWidgetComponent],
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatIconModule, MatSliderModule],
  providers: [
    MopidyService,
    { provide: APP_INITIALIZER, useFactory: mopidyProviderFactory, deps: [MopidyService], multi: true },
  ],
  exports: [VolumeWidgetContainerComponent],
})
export class MopidyModule {}

export function mopidyProviderFactory(mopidy: MopidyService) {
  return () => mopidy.init();
}
