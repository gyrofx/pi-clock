import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { WindowRefService } from './window-ref.service';
import { ElectronConfig } from '../models';
import { timingSafeEqual } from 'crypto';
import { BehaviorSubject, Observable } from 'rxjs';
// import * as log from 'electron-log';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private ipc: IpcRenderer;

  private devConfig: ElectronConfig = {
    mopidy: {
      host: '192.168.110.140',
      port: 6680,
    },
  };

  private configSubject = new BehaviorSubject<ElectronConfig>(null);

  constructor(private windowRef: WindowRefService) {
    if (this.windowRef.nativeWindow.require) {
      try {
        this.ipc = this.windowRef.nativeWindow.require('electron').ipcRenderer;
        const log = this.windowRef.nativeWindow.require('electron-log');

        log.transports.ipc.level = 'silly';
        console.log = log.log;
        console.warn = log.warn;
        console.error = log.error;

        console.log('ElectronService', 'Electron is available');

        this.on('config-response', (event, config: ElectronConfig) => {
          console.log('ElectronService', 'ElectronConfig', config);

          this.configSubject.next(config);
        });
        this.send('config');
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
      this.configSubject.next(this.devConfig);
    }
  }

  get config(): Observable<ElectronConfig> {
    return this.configSubject.asObservable();
  }

  public on(channel: string, listener): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this.ipc) {
      return;
    }
    console.log('ElectronService', 'send', channel, ...args);
    this.ipc.send(channel, ...args);
  }
}
