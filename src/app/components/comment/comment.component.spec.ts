import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';

import {Comment} from '../../model/comment';
import {Topic} from '../../model/topic';
import {Question} from '../../model/question';
import { By } from '@angular/platform-browser';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  const sampleT: Topic = {
    id: 'id-1',
    name: 'Foo bar',
    description: 'test desc',
    createdDate: new Date()
  };

  const sampleQ: Question = {
    id: 'id-1',
    description: 'test desc',
    createdDate: new Date(),
    topic: sampleT
  };

  const sampleC: Comment = {
    id: 'id-1',
    description: 'test desc',
    createdDate: new Date(),
    question: sampleQ
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    component.comment = sampleC;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display comment', () => {
    expect(fixture.debugElement.query(By.css('.comment-description')).nativeElement.innerHTML).toContain(sampleC.description);
    expect(fixture.debugElement.query(By.css('.comment-date')).nativeElement.innerHTML).not.toBeNull();
  });

  it('should be able to delete comment', () => {
    let eventData: Comment;

    component.deleteCommentRequest.subscribe((val) => eventData = val);

    fixture.debugElement.query(By.css('.delete-comment')).triggerEventHandler('click', null);

    expect(eventData).toBe(sampleC);
  });
});
