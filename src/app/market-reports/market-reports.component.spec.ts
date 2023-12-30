import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketReportsComponent } from './market-reports.component';

describe('MarketReportsComponent', () => {
  let component: MarketReportsComponent;
  let fixture: ComponentFixture<MarketReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketReportsComponent]
    });
    fixture = TestBed.createComponent(MarketReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
