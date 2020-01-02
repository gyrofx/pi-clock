import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MopidyService } from '../../services/mopidy.service';

@Component({
  selector: 'app-volume-widget-container',
  template: `
    <app-volume-widget [volume]="volume$ | async" (volumeUpDown)="onVolume($event)"> </app-volume-widget>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolumeWidgetContainerComponent implements OnInit {
  volume$: Observable<number>;

  constructor(private mopidyService: MopidyService) {}

  ngOnInit() {
    this.volume$ = this.mopidyService.getVolume();
  }

  onVolume(value) {
    this.mopidyService.volume = value;
  }
}
