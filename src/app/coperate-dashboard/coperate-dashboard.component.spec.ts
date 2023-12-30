import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoperateDashboardComponent } from './coperate-dashboard.component';

describe('CoperateDashboardComponent', () => {
  let component: CoperateDashboardComponent;
  let fixture: ComponentFixture<CoperateDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoperateDashboardComponent]
    });
    fixture = TestBed.createComponent(CoperateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
