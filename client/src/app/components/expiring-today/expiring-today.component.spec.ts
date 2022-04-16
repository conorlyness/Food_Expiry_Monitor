import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringTodayComponent } from './expiring-today.component';

describe('ExpiringTodayComponent', () => {
  let component: ExpiringTodayComponent;
  let fixture: ComponentFixture<ExpiringTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiringTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiringTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
