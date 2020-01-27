import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { WindowRefService } from './window-ref.service';
// import * as log from 'electron-log';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipc: IpcRenderer;

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
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
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
    this.ipc.send(channel, ...args);
  }
}
