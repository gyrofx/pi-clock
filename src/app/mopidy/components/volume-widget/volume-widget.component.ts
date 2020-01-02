import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-volume-widget',
  templateUrl: './volume-widget.component.html',
  styleUrls: ['./volume-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolumeWidgetComponent implements OnInit {
  @Input() volume: number;
  @Output() volumeUpDown = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}
}
