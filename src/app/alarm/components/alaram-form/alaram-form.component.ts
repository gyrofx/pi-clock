import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { BsLocaleService } from 'ngx-bootstrap';
import { Playlist } from 'src/app/mopidy/models';
import { Alarm } from '../../models';

@Component({
  selector: 'app-alaram-form',
  templateUrl: './alaram-form.component.html',
  styleUrls: ['./alaram-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlaramFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  alarm: Alarm;

  @Input()
  playlists: Playlist[];

  @Output()
  save = new EventEmitter<Alarm>();

  private alive: boolean;

  form = this.fb.group({
    time: ['7:00'],
    enabled: [false],
    playlist: '',
    volume: 30,
    duration: 30,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });
  constructor(private fb: FormBuilder, private localeService: BsLocaleService) {}

  ngOnInit() {
    this.alive = true;

    this.localeService.use('de');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.alarm && changes.alarm.currentValue) {
      this.form.reset();
      this.valueToForm();
    }
  }

  onSubmit() {
    this.save.emit(this.formToValue());
  }

  private valueToForm() {
    this.form.patchValue({
      time: `${this.alarm.hour}:${this.alarm.minute}`,
      enabled: this.alarm.enabled,
      playlist: this.alarm.playlist ? this.alarm.playlist.uri : null,
      duration: this.alarm.duration,
      volume: this.alarm.volume,
      monday: this.alarm.daysOfWeek[1],
      tuesday: this.alarm.daysOfWeek[2],
      wednesday: this.alarm.daysOfWeek[3],
      thursday: this.alarm.daysOfWeek[4],
      friday: this.alarm.daysOfWeek[5],
      saturday: this.alarm.daysOfWeek[6],
      sunday: this.alarm.daysOfWeek[0],
    });
  }

  private formToValue() {
    const { time, playlist, enabled, ...rest } = this.form.value;
    const playlistObject = _.find(this.playlists, { uri: playlist });
    const [hour, minute] = time.split(':');
    const daysOfWeek = [
      !!this.form.value.sunday,
      !!this.form.value.monday,
      !!this.form.value.tuesday,
      !!this.form.value.wednesday,
      !!this.form.value.thursday,
      !!this.form.value.friday,
      !!this.form.value.saturday,
    ];

    const hasDays = daysOfWeek.some(day => day);

    return {
      ...this.alarm,
      hour: +hour,
      minute: +minute,
      playlist: playlistObject,
      daysOfWeek,
      enabled: hasDays ? enabled : false,
      ...rest,
    };
  }
}
