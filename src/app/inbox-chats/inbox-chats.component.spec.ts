import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxChatsComponent } from './inbox-chats.component';

describe('InboxChatsComponent', () => {
  let component: InboxChatsComponent;
  let fixture: ComponentFixture<InboxChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboxChatsComponent]
    });
    fixture = TestBed.createComponent(InboxChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
