import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatGroupComponent } from './create-chat-group.component';

describe('CreateChatGroupComponent', () => {
  let component: CreateChatGroupComponent;
  let fixture: ComponentFixture<CreateChatGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChatGroupComponent]
    });
    fixture = TestBed.createComponent(CreateChatGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
