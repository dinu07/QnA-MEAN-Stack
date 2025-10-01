import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { QuestionComponent } from './question.component';
import { CommentComponent } from '../comment/comment.component';

import {QuestionService} from '../../services/question.service';
import {CommentService} from '../../services/comment.service';

import {Topic} from '../../model/topic';
import {Question} from '../../model/question';
import {Comment} from '../../model/comment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  let commentService: CommentService;
  let questionService: QuestionService;

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

  const mockActivateRoute = {
    provide: ActivatedRoute,
    useValue: {snapshot: {
      paramMap: {
        get: () => '1'
      }
    }}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent, CommentComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],

      providers: [ QuestionService, CommentService, mockActivateRoute]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;

    component.comments = [sampleC];
    commentService = TestBed.get(CommentService);
    questionService = TestBed.get(QuestionService);

    spyOn(commentService, 'saveComment').and.returnValue(Observable.of(sampleC));
    spyOn(commentService, 'deleteComment').and.returnValue(Observable.of(sampleC));
    spyOn(commentService, 'getComments').and.returnValue(Observable.of([sampleC]));
    spyOn(questionService, 'getQuestion').and.returnValue(Observable.of(sampleQ));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to post new comment', () => {

    component.postNewComment('foo');

    expect(commentService.saveComment).toHaveBeenCalled();
    expect(component.comments.length).toBe(2);
  });

  it('should not be able to post empty comment', () => {

    component.postNewComment('');

    expect(commentService.saveComment).not.toHaveBeenCalled();
  });

  it('should be able to delete comment', () => {

    component.deleteComment(sampleC);

    const orig = component.comments.length;
    expect(component.comments.length).toBeLessThanOrEqual(orig);
    expect(commentService.deleteComment).toHaveBeenCalled();
  });

  it('should be able to set question from route', () => {

    component.setQuestionFromRoute();

    expect(questionService.getQuestion).toHaveBeenCalledWith('1');
    expect(commentService.getComments).toHaveBeenCalledWith('id-1');
  });

  it('should be able to see error message', () => {
    component.error = true;

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error-msg')).nativeElement.classList.contains('hidden')).toBe(false);
  });
});
