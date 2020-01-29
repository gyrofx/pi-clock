import { TestBed } from '@angular/core/testing';

import { WakeUpService } from './wake-up.service';
import { MopidyService } from 'src/app/mopidy/services/mopidy.service';
import { SleepService } from 'src/app/sleep/services/sleep.service';
import { AlarmService } from 'src/app/alarm/services';
import { Router } from '@angular/router';

describe('WakeUpService', () => {
  let wakeUpService: WakeUpService;
  let sleepServiceSpy: jasmine.SpyObj<SleepService>;
  let alarmServiceSpy: jasmine.SpyObj<AlarmService>;
  let mopidyServiceSpy: jasmine.SpyObj<MopidyService>;

  beforeEach(() => {
    const spySleepService = jasmine.createSpyObj('SleepService', ['getVolume']);
    const spyAlarmService = jasmine.createSpyObj('AlarmService', ['getVolume']);
    const spyMopidyService = jasmine.createSpyObj('MopidyService', ['getVolume']);
    const spyRouter = jasmine.createSpyObj('Router', ['getVolume']);

    TestBed.configureTestingModule({
      providers: [
        WakeUpService,
        { provide: SleepService, useValue: spySleepService },
        { provide: AlarmService, useValue: spyAlarmService },
        { provide: MopidyService, useValue: spyMopidyService },
        { provide: Router, useValue: spyRouter },
      ],
    });

    wakeUpService = TestBed.get(WakeUpService);
    sleepServiceSpy = TestBed.get(SleepService);
    alarmServiceSpy = TestBed.get(AlarmService);
    mopidyServiceSpy = TestBed.get(MopidyService);
  });

  it('should be created', () => {
    const service: WakeUpService = TestBed.get(WakeUpService);
    expect(service).toBeTruthy();
  });
});
