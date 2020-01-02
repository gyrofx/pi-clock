import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeWidgetContainerComponent } from './volume-widget-container.component';

describe('VolumeWidgetContainerComponent', () => {
  let component: VolumeWidgetContainerComponent;
  let fixture: ComponentFixture<VolumeWidgetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeWidgetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeWidgetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
