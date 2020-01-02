import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmEditContainerComponent } from './alarm-edit-container.component';

describe('AlarmEditContainerComponent', () => {
  let component: AlarmEditContainerComponent;
  let fixture: ComponentFixture<AlarmEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
