import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaramFormComponent } from './alaram-form.component';

describe('AlaramFormComponent', () => {
  let component: AlaramFormComponent;
  let fixture: ComponentFixture<AlaramFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlaramFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
