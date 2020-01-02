import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AlarmService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { Alarm } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { Playlist } from 'src/app/mopidy/models';
import { MopidyService } from 'src/app/mopidy/services/mopidy.service';

@Component({
  selector: 'app-alarm-edit-container',
  template: `
    <app-alaram-form
      [alarm]="alarm$ | async"
      [playlists]="playlists$ | async"
      (save)="onSave($event)"
    ></app-alaram-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmEditContainerComponent implements OnInit, OnDestroy {
  alarm$: Observable<Alarm>;
  playlists$: Observable<Playlist[]> = this.mopidyService.playlists;

  private subscriptions: Subscription[] = [];

  constructor(
    private alarmService: AlarmService,
    private mopidyService: MopidyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mopidyService.getPlaylists();

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const id = +params.id;

        this.alarm$ = this.alarmService.get(id);
      })
    );
  }

  onSave(alarm: Alarm) {
    this.alarmService.save(alarm);
    this.router.navigate(['alarm']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
