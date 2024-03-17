import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalRequestComponent } from './appraisal-request.component';

describe('AppraisalRequestComponent', () => {
  let component: AppraisalRequestComponent;
  let fixture: ComponentFixture<AppraisalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalRequestComponent]
    });
    fixture = TestBed.createComponent(AppraisalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
