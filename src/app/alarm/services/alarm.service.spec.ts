import { fakeAsync, TestBed, tick, async } from '@angular/core/testing';
import { Alarm } from '../models';
import { AlarmService } from './alarm.service';
import { AlarmStorageService } from './alarm-storage.service';

describe('AlarmService', () => {
  let alarmService: AlarmService;
  let alarmStorageServiceSpy: jasmine.SpyObj<AlarmStorageService>;
  const baseTime = new Date(2020, 1, 5, 14, 22); // Wednesday, 5. Februray 2020

  const alarm1 = {
    index: 1,
    enabled: true,
    hour: 16,
    minute: 50,
    daysOfWeek: [true, true, true, true, true, true, true],
    duration: 20,
    volume: 7,
    playlist: { uri: 'playlist', name: 'MyPlaylist' },
  };

  const alarm2 = {
    index: 1,
    enabled: true,
    hour: 16,
    minute: 50,
    daysOfWeek: [true, true, true, true, true, true, true],
    duration: 20,
    volume: 7,
    playlist: { uri: 'playlist', name: 'MyPlaylist' },
  };

  const alarm3 = {
    index: 1,
    enabled: true,
    hour: 16,
    minute: 50,
    daysOfWeek: [true, true, true, true, true, true, true],
    duration: 20,
    volume: 7,
    playlist: { uri: 'playlist', name: 'MyPlaylist' },
  };

  const alarm4 = {
    index: 1,
    enabled: true,
    hour: 16,
    minute: 50,
    daysOfWeek: [true, true, true, true, true, true, true],
    duration: 20,
    volume: 7,
    playlist: { uri: 'playlist', name: 'MyPlaylist' },
  };

  beforeEach(() => {
    const spyAlarmStorageService = jasmine.createSpyObj('AlarmStorageService', ['load']);

    TestBed.configureTestingModule({
      providers: [AlarmService, { provide: AlarmStorageService, useValue: spyAlarmStorageService }],
    });

    alarmService = TestBed.get(AlarmService);
    alarmStorageServiceSpy = TestBed.get(AlarmStorageService);
  });

  it('should be created', () => {
    expect(alarmService).toBeTruthy();
  });

  it('should have mocked date', () => {
    jasmine.clock().mockDate(baseTime);

    const now = new Date();
    expect(now.getFullYear()).toBe(2020);
    expect(now.getMonth()).toBe(1);
    expect(now.getDate()).toBe(5);
    expect(now.getHours()).toBe(14);
    expect(now.getMinutes()).toBe(22);
  });

  describe('nextAlarm', () => {
    const setAlarmList = (alarmList: Alarm[]) => {
      alarmStorageServiceSpy.load.and.returnValue(alarmList);
      alarmService.load();
    };

    describe('with an empty alarmList', () => {
      it('should be null', done => {
        setAlarmList([]);

        alarmService.nextAlarm.subscribe(data => {
          expect(data).toEqual(null);
          done();
        });
      });
    });

    describe('with all alarms disabled', () => {
      it('should be null', done => {
        const alarmList = [alarm1, alarm2, alarm3, alarm4].map(alarm => {
          return { ...alarm, enabled: false };
        });
        setAlarmList(alarmList);

        alarmService.nextAlarm.subscribe(data => {
          expect(data).toEqual(null);
          done();
        });
      });
    });

    describe('with an alarmList', () => {
      const testAlarmList = (alarmList: Alarm[], expectedNextAlarm: Date, done) => {
        jasmine.clock().mockDate(baseTime);
        setAlarmList(alarmList);

        // tick();
        alarmService.nextAlarm.subscribe(data => {
          expect(data).toBeTruthy();
          const { alarm, date } = data;
          // const expectedNextAlarm = new Date(2020, 1, 5, 16, 50, 0);
          expect(alarm).toBe(alarmList[0]);
          expect(date).toEqual(expectedNextAlarm);

          // const diff = expectedNextAlarm.getTime() - baseTime.getTime();
          // expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), diff);
          done();
        });
      };

      describe('with 1 alarm set to run', () => {
        describe('on all day', () => {
          it('should have set a nextAlarm to 5.2.2020', done => {
            testAlarmList([alarm1], new Date(2020, 1, 5, 16, 50, 0), done);
          });
        });

        describe('only on Wednesday', () => {
          it('should have set a nextAlarm to 5.2.2020', done => {
            const alarmList = [{ ...alarm1, daysOfWeek: [false, false, false, true, false, false, false] }];
            testAlarmList(alarmList, new Date(2020, 1, 5, 16, 50, 0), done);
          });
        });

        describe('only on Thursday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarmList = [{ ...alarm1, daysOfWeek: [false, false, false, false, true, false, false] }];
            testAlarmList(alarmList, new Date(2020, 1, 6, 16, 50, 0), done);
          });
        });

        describe('only on Tuesday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarmList = [{ ...alarm1, daysOfWeek: [false, false, true, false, false, false, false] }];
            testAlarmList(alarmList, new Date(2020, 1, 11, 16, 50, 0), done);
          });
        });

        describe('on Monday and Thursday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarmList = [{ ...alarm1, daysOfWeek: [false, false, true, false, true, false, false] }];
            testAlarmList(alarmList, new Date(2020, 1, 6, 16, 50, 0), done);
          });
        });

        describe('on all day expect Wednesday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarmList = [{ ...alarm1, daysOfWeek: [true, true, true, false, true, true, true] }];
            testAlarmList(alarmList, new Date(2020, 1, 6, 16, 50, 0), done);
          });
        });

        describe('on Wednesday in a week', () => {
          it('should have set a nextAlarm to 12.2.2020', done => {
            const alarmList = [{ ...alarm1, hour: 8, daysOfWeek: [false, false, false, true, false, false, false] }];
            testAlarmList(alarmList, new Date(2020, 1, 12, 8, 50, 0), done);
          });
        });
      });
    });
  });
});
