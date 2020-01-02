import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeWidgetComponent } from './volume-widget.component';

describe('VolumeWidgetComponent', () => {
  let component: VolumeWidgetComponent;
  let fixture: ComponentFixture<VolumeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
