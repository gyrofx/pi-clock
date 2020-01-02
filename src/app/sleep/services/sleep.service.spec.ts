import { TestBed } from '@angular/core/testing';

import { SleepService } from './sleep.service';
import { MopidyService } from 'src/app/mopidy/services/mopidy.service';

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
});
