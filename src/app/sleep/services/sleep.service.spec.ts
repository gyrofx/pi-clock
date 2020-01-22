import { TestBed } from '@angular/core/testing';

import { SleepService } from './sleep.service';
import { MopidyService } from 'src/app/mopidy/services/mopidy.service';
import { SleepTimer } from '../models';

describe('SleepService', () => {
  let sleepService: SleepService;
  let mopidyServiceSpy: jasmine.SpyObj<MopidyService>;

  beforeEach(() => {
    const spyMopidyService = jasmine.createSpyObj('MopidyService', ['getVolume']);

    TestBed.configureTestingModule({
      providers: [SleepService, { provide: MopidyService, useValue: spyMopidyService }],
    });

    sleepService = TestBed.get(SleepService);
    mopidyServiceSpy = TestBed.get(MopidyService);
  });

  it('should be created', () => {
    const service: SleepService = TestBed.get(SleepService);
    expect(service).toBeTruthy();
  });

  it('should be created', done => {
    spyOn(window, 'setTimeout');

    sleepService.setSleepTimer(20);

    sleepService.sleepTimer.subscribe((sleep: SleepTimer) => {
      expect(sleep).not.toBe(null);
      const now = new Date();
      const minutes = (sleep.finishedAt.getTime() - now.getTime()) / 1000 / 60;
      expect(Math.round(minutes)).toEqual(20);

      expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 20 * 60 * 1000);

      done();
    });
  });
});
