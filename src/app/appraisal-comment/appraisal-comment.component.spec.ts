import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalCommentComponent } from './appraisal-comment.component';

describe('AppraisalCommentComponent', () => {
  let component: AppraisalCommentComponent;
  let fixture: ComponentFixture<AppraisalCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalCommentComponent]
    });
    fixture = TestBed.createComponent(AppraisalCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
