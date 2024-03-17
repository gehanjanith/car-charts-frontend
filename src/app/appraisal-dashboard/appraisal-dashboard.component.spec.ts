import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalDashboardComponent } from './appraisal-dashboard.component';

describe('AppraisalDashboardComponent', () => {
  let component: AppraisalDashboardComponent;
  let fixture: ComponentFixture<AppraisalDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalDashboardComponent]
    });
    fixture = TestBed.createComponent(AppraisalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
