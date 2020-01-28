import { Injectable } from '@angular/core';
import { ScriptLoadError } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoadService {
  constructor() {}

  loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      script.onload = () => {
        resolve({ script: url, status: 'loaded' });
      };

      script.onerror = (error: any) => reject({ script: url, status: 'falied', error } as ScriptLoadError);
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
