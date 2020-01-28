import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from '../models';
import { ScriptLoadService } from 'src/app/utils/scripts/services/script-load.service';
import { ScriptLoadError } from 'src/app/utils/scripts/models';

const URL = 'http://192.168.110.140:6680/mopidy/rpc';

@Injectable({
  providedIn: 'root',
})
export class MopidyService {
  id = 1;
  m = null;

  playlistsSubject = new BehaviorSubject<Playlist[]>([]);
  volumeSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private script: ScriptLoadService) {}

  init(host: string, port: number) {
    console.log('MopidyService.init');

    return this.script.loadScript(`http://${host}:${port}/mopidy/mopidy.js`).then(
      () => {
        return new Promise((resolve, reject) => {
          const w = window as any;
          this.m = new w.Mopidy({
            webSocketUrl: `ws://${host}:${port}/mopidy/ws/`,
            callingConvention: 'by-position-or-by-name',
          });

          this.m.on('state:online', () => {
            console.log('MopidyService', 'state:online');
            this.m.mixer.getVolume().then(value => {
              console.log('MopidyService', 'getVolume', value);
              this.volumeSubject.next(value);
            });

            this.m.on('websocket:incomingMessage', message => {
              console.log('websocket:incomingMessage', message);
              if (message && message.type === 'message') {
                try {
                  const data = JSON.parse(message.data);
                  switch (data.event) {
                    case 'volume_changed': {
                      this.volumeSubject.next(data.volume);
                      break;
                    }
                  }
                } catch (e) {
                  console.error('Unparasable ws message', message.data);
                }
              }
            });

            this.m.on('event:playback_state_changed', v => {
              console.log('playback_state_changed', v);
            });

            // console.log('MopidyService.constructor', 'state:online');
            // this.m.on('state', state => {
            //   console.log('MopidyService.constructor', 'state', state);
            // });
            // this.m.on('event', console.log);

            // this.m.playback.getState().then(response => {
            //   console.log('MopidyService.getState', response);
            // });

            // this.m.playback.getCurrentTrack().then(response => {
            //   console.log('MopidyService.getCurrentTrack', response);
            // });

            // this.m.playlists.asList().then(response => {
            //   console.log('MopidyService.playlists', response);
            // });
            // console.log('<<<<<<<<<<', this.m.tracklist.add.params);
            // this.playPlayList('Alarm');
            console.log('MopidyService.init finished');
            resolve();
          });
        });
      },
      (error: ScriptLoadError) => {
        console.error('MopidyService.init', 'Mopidy load Error', error.script, error.error);
      }
    );
  }

  get playlists() {
    return this.playlistsSubject.asObservable();
  }

  getVolume() {
    return this.volumeSubject.asObservable();
  }

  // fadeVolumeUp(startVolume: number, endVolume: number, fadeTime: number) {
  //   this.volume = startVolume;
  //   const interval = Math.floor((endVolume - startVolume) / fadeTime);
  //   setInterval(() => {
  //     this.volume =
  //   })
  // }

  set volume(volume: number) {
    console.log('MopidyService.volume', volume);
    this.m.mixer.setVolume({ volume });
  }

  stopPlay() {
    this.m.playback.stop();
  }

  playPlayList(uri: string) {
    this.m.playlists.asList().then(response => {
      console.log('MopidyService.playlists', response);
      const playlist = _.find(response, { uri });
      console.log('MopidyService.playlists playlist found', playlist);

      if (!playlist) {
        return;
      }

      this.m.playlists.getItems({ uri: playlist.uri }).then(tracks => {
        this.m.tracklist.add({ uris: tracks.map(t => t.uri), at_position: 0 }).then(() => {
          this.m.playback.play();
        });
      });
    });
  }

  getPlaylists() {
    console.log('MopidyService.getPlaylists');

    this.m.playlists.asList().then(playlists => {
      this.playlistsSubject.next(playlists);
    });
  }

  getState() {
    console.log('MopidyService.getState', this.m.playback);
    // return this.http.post(
    //   URL,
    //   { jsonrpc: '2.0', id: ++this.id, method: 'playback.get_state' },
    //   { headers: { 'Content-Type': 'application/json' } }
    // );
  }
}
