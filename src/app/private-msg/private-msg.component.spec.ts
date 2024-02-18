import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMsgComponent } from './private-msg.component';

describe('PrivateMsgComponent', () => {
  let component: PrivateMsgComponent;
  let fixture: ComponentFixture<PrivateMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateMsgComponent]
    });
    fixture = TestBed.createComponent(PrivateMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
