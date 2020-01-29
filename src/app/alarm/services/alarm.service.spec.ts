import { TestBed } from '@angular/core/testing';
import { Alarm, NextAlarm } from '../models';
import { AlarmService } from './alarm.service';
import { AlarmStorageService } from './alarm-storage.service';

describe('AlarmService', () => {
  let alarmService: AlarmService;
  let alarmStorageServiceSpy: jasmine.SpyObj<AlarmStorageService>;
  const baseTime = new Date(2020, 1, 5, 14, 22); // Wednesday, 5. Februray 2020 14:22

  const defaultAlarm = {
    index: 1,
    enabled: false,
    hour: 0,
    minute: 0,
    daysOfWeek: [true, true, true, true, true, true, true],
    duration: 20,
    volume: 7,
    playlist: null,
  };

  const testData = {
    alarm0: {
      index: 0,
      enabled: true,
      hour: 16,
      minute: 50,
      daysOfWeek: [true, true, true, true, true, true, true],
      duration: 20,
      volume: 7,
      playlist: { uri: 'playlist', name: 'MyPlaylist' },
    },
    alarm1: { ...defaultAlarm },
    alarm2: {
      ...defaultAlarm,
      index: 2,
    },
    alarm3: {
      ...defaultAlarm,
      index: 3,
    },
    alarm4: {
      ...defaultAlarm,
      index: 4,
    },
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
        const alarmList = [testData.alarm0, testData.alarm1, testData.alarm2, testData.alarm3].map(alarm => {
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
      const testAlarmList = (alarmList: Alarm[], expectedNextAlarm: NextAlarm, done) => {
        jasmine.clock().mockDate(baseTime);
        setAlarmList(alarmList);

        // tick();
        alarmService.nextAlarm.subscribe(data => {
          expect(data).toBeTruthy();
          const { alarm, date } = data;
          // const expectedNextAlarm = new Date(2020, 1, 5, 16, 50, 0);
          expect(alarm.index).toBe(expectedNextAlarm.alarm.index);
          expect(alarm).toEqual(expectedNextAlarm.alarm);
          expect(date).toEqual(expectedNextAlarm.date);

          // const diff = expectedNextAlarm.getTime() - baseTime.getTime();
          // expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), diff);
          done();
        });
      };

      describe('with 1 alarm set to run', () => {
        describe('on all day', () => {
          it('should have set a nextAlarm to 5.2.2020', done => {
            testAlarmList(
              [testData.alarm0, testData.alarm1, testData.alarm2],
              { alarm: testData.alarm0, date: new Date(2020, 1, 5, 16, 50, 0) },
              done
            );
          });
        });

        describe('only on Wednesday', () => {
          it('should have set a nextAlarm to 5.2.2020', done => {
            const alarm = { ...testData.alarm0, daysOfWeek: [false, false, false, true, false, false, false] };
            const alarmList = [testData.alarm1, testData.alarm2, alarm];
            testAlarmList(alarmList, { alarm, date: new Date(2020, 1, 5, 16, 50, 0) }, done);
          });
        });

        describe('only on Thursday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarm = { ...testData.alarm0, daysOfWeek: [false, false, false, false, true, false, false] };
            const alarmList = [testData.alarm1, testData.alarm2, alarm];
            testAlarmList(alarmList, { alarm, date: new Date(2020, 1, 6, 16, 50, 0) }, done);
          });
        });

        describe('only on Tuesday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarm = { ...testData.alarm0, daysOfWeek: [false, false, true, false, false, false, false] };
            const alarmList = [testData.alarm1, testData.alarm2, alarm];
            testAlarmList(alarmList, { alarm, date: new Date(2020, 1, 11, 16, 50, 0) }, done);
          });
        });

        describe('on Monday and Thursday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarm = { ...testData.alarm0, daysOfWeek: [false, false, true, false, true, false, false] };
            const alarmList = [testData.alarm1, testData.alarm2, alarm];
            testAlarmList(alarmList, { alarm, date: new Date(2020, 1, 6, 16, 50, 0) }, done);
          });
        });

        describe('on all day expect Wednesday', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarm = { ...testData.alarm0, daysOfWeek: [true, true, true, false, true, true, true] };
            const alarmList = [testData.alarm1, testData.alarm2, testData.alarm3, alarm];
            testAlarmList(alarmList, { alarm, date: new Date(2020, 1, 6, 16, 50, 0) }, done);
          });
        });

        describe('on Wednesday in a week', () => {
          it('should have set a nextAlarm to 12.2.2020', done => {
            const alarm = { ...testData.alarm0, hour: 8, daysOfWeek: [false, false, false, true, false, false, false] };
            const alarmList = [alarm];
            testAlarmList(alarmList, { alarm, date: new Date(2020, 1, 12, 8, 50, 0) }, done);
          });
        });
      });

      describe('with multiple alarms set to run', () => {
        describe('on two days each', () => {
          it('should have set a nextAlarm to 6.2.2020', done => {
            const alarm0 = {
              ...testData.alarm0,
              enabled: true,
              hour: 7,
              minute: 5,
              daysOfWeek: [true, true, false, false, false, false, false],
            };
            const alarm1 = {
              ...testData.alarm1,
              enabled: true,
              hour: 7,
              minute: 6,
              daysOfWeek: [false, true, true, false, false, false, false],
            };
            const alarm2 = {
              ...testData.alarm2,
              enabled: true,
              hour: 7,
              minute: 7,
              daysOfWeek: [false, false, true, true, false, false, false],
            };
            const alarm3 = {
              ...testData.alarm3,
              enabled: true,
              hour: 7,
              minute: 8,
              daysOfWeek: [false, false, false, true, true, false, false],
            };
            const alarm4 = {
              ...testData.alarm4,
              enabled: true,
              hour: 7,
              minute: 9,
              daysOfWeek: [false, false, false, false, true, true, false],
            };

            const alarmList = [alarm0, alarm1, alarm2, alarm3, alarm4];
            testAlarmList(alarmList, { alarm: alarm3, date: new Date(2020, 1, 6, 7, 8, 0) }, done);
          });
        });

        describe('on two days each', () => {
          it('should have set a nextAlarm to 9.2.2020', done => {
            const alarm0 = {
              ...testData.alarm0,
              enabled: true,
              hour: 7,
              minute: 5,
              daysOfWeek: [true, true, false, false, false, false, false],
            };
            const alarm1 = {
              ...testData.alarm1,
              enabled: true,
              hour: 7,
              minute: 6,
              daysOfWeek: [false, true, true, false, false, false, false],
            };

            const alarmList = [alarm0, alarm1, testData.alarm2, testData.alarm3, testData.alarm4];
            testAlarmList(alarmList, { alarm: alarm0, date: new Date(2020, 1, 9, 7, 5, 0) }, done);
          });
        });
      });
    });
  });
});
