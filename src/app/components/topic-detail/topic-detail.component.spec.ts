import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TopicService} from '../../services/topic.service';
import {QuestionService} from '../../services/question.service';
import { TopicDetailComponent } from './topic-detail.component';
import {QuestionSummaryComponent } from '../question-summary/question-summary.component';
import { HttpClientModule } from '@angular/common/http';

import {Topic} from '../../model/topic';
import {Question} from '../../model/question';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('TopicDetailComponent', () => {
  let component: TopicDetailComponent;
  let fixture: ComponentFixture<TopicDetailComponent>;

  let topicService: TopicService;
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
      declarations: [ TopicDetailComponent, QuestionSummaryComponent ],
      imports: [ RouterTestingModule.withRoutes([
        {path: 'topic-details/1', component: TopicDetailComponent}
      ]), HttpClientModule ],
      providers: [QuestionService, TopicService, mockActivateRoute]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailComponent);
    component = fixture.componentInstance;

    component.questions = [sampleQ];
    topicService = TestBed.get(TopicService);
    questionService = TestBed.get(QuestionService);

    spyOn(questionService, 'saveQuestion').and.returnValue(Observable.of(sampleQ));
    spyOn(questionService, 'deleteQuestion').and.returnValue(Observable.of(sampleQ));
    spyOn(questionService, 'getQuestionsUnderTopic').and.returnValue(Observable.of([sampleQ]));
    spyOn(topicService, 'getTopic').and.returnValue(Observable.of(sampleT));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to post new question', () => {

    component.postNewQuestion('foo');

    expect(questionService.saveQuestion).toHaveBeenCalled();
    expect(component.questions.length).toBe(2);
  });

  it('should not be able to post empty question', () => {

    component.postNewQuestion('');

    expect(questionService.saveQuestion).not.toHaveBeenCalled();
  });

  it('should be able to delete question', () => {

    component.deleteQuestion(sampleQ);

    const orig = component.questions.length;
    expect(component.questions.length).toBeLessThanOrEqual(orig);
    expect(questionService.deleteQuestion).toHaveBeenCalled();
  });

  it('should be able to set topic from route', () => {
    component.setTopicFromRoute();

    expect(topicService.getTopic).toHaveBeenCalledWith('1');
    expect(questionService.getQuestionsUnderTopic).toHaveBeenCalledWith('id-1');
  });

  it('should be able to show error message', () => {
    component.error = true;

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error-msg')).nativeElement.classList.contains('hidden')).toBe(false);
  });
});
