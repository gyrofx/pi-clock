import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeUpComponent } from './wake-up.component';

describe('WakeUpComponent', () => {
  let component: WakeUpComponent;
  let fixture: ComponentFixture<WakeUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
