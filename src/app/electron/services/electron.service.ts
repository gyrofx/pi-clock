import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipc: IpcRenderer;

  constructor(private windowRef: WindowRefService) {
    if (this.windowRef.nativeWindow.require) {
      try {
        this.ipc = this.windowRef.nativeWindow.require('electron').ipcRenderer;
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
