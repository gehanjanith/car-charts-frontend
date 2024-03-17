import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalInboxComponent } from './appraisal-inbox.component';

describe('AppraisalInboxComponent', () => {
  let component: AppraisalInboxComponent;
  let fixture: ComponentFixture<AppraisalInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalInboxComponent]
    });
    fixture = TestBed.createComponent(AppraisalInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
