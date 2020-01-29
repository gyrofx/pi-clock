import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeUpContainerComponent } from './wake-up-container.component';

describe('WakeUpContainerComponent', () => {
  let component: WakeUpContainerComponent;
  let fixture: ComponentFixture<WakeUpContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakeUpContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakeUpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
