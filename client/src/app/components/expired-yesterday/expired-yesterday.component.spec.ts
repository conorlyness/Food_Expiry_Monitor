import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredYesterdayComponent } from './expired-yesterday.component';

describe('ExpiredYesterdayComponent', () => {
  let component: ExpiredYesterdayComponent;
  let fixture: ComponentFixture<ExpiredYesterdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredYesterdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredYesterdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
