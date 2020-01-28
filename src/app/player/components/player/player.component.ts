import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ElectronService } from 'src/app/electron/services';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {
  url$: Observable<SafeUrl>;

  constructor(electronService: ElectronService, private sanitizer: DomSanitizer) {
    this.url$ = electronService.config.pipe(
      filter(config => !!config),
      map(config =>
        this.sanitizer.bypassSecurityTrustResourceUrl(`http://${config.mopidy.host}:${config.mopidy.port}/iris/`)
      )
    );
  }

  ngOnInit() {}
}
