import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { TopicSummaryComponent } from './topic-summary.component';
import {QuestionComponent} from '../question/question.component';
import {CommentComponent} from '../comment/comment.component';
import {Topic} from '../../model/topic';

import {QuestionService} from '../../services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('TopicSummaryComponent', () => {
  let component: TopicSummaryComponent;
  let fixture: ComponentFixture<TopicSummaryComponent>;
  const sampleTopic: Topic = {
    id: 'id-1',
    name: 'Foo bar',
    description: 'test desc',
    createdDate: new Date()
  };
  let questionService: QuestionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSummaryComponent, QuestionComponent, CommentComponent ],
      imports: [ RouterTestingModule,  HttpClientModule],
      providers: [ QuestionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSummaryComponent);
    component = fixture.componentInstance;

    component.topic = sampleTopic;
    component.totalQuestionsPosted = 10;

    questionService = TestBed.get(QuestionService);
    spyOn(questionService, 'getQuestionsUnderTopic').and.returnValue(Observable.of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the topic', () => {
    expect(fixture.debugElement.query(By.css('.topic-name')).nativeElement.textContent).toContain('Foo bar');
    expect(fixture.debugElement.query(By.css('.topic-description')).nativeElement.innerHTML).toContain('test desc');
    expect(fixture.debugElement.query(By.css('.view-topic-details')).nativeElement.getAttribute('href')).toEqual('/topic-details/id-1');
  });

  it('should set questions count', () => {
    component.ngOnInit();
    expect(questionService.getQuestionsUnderTopic).toHaveBeenCalled();
    expect(component.totalQuestionsPosted).toBe(0);
  });
});
