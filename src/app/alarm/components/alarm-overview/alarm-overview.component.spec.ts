import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmOverviewComponent } from './alarm-overview.component';

describe('AlarmOverviewComponent', () => {
  let component: AlarmOverviewComponent;
  let fixture: ComponentFixture<AlarmOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
