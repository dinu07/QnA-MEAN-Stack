import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { TopicSummaryComponent } from '../topic-summary/topic-summary.component';
import { RouterTestingModule } from '@angular/router/testing';
import {TopicService} from '../../services/topic.service';
import {QuestionService} from '../../services/question.service';
import { HttpClientModule } from '@angular/common/http';
import {Topic} from '../../model/topic';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const sampleTopic: Topic = {
    id: 'id-1',
    name: 'Foo bar',
    description: 'test desc',
    createdDate: new Date()
  };
  let topicService: TopicService;
  let questionService: QuestionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, TopicSummaryComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [ TopicService, QuestionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    topicService = TestBed.get(TopicService);
    spyOn(topicService, 'getAllTopics').and.returnValue(Observable.of([sampleTopic]));

    questionService = TestBed.get(QuestionService);
    spyOn(questionService, 'getQuestionsUnderTopic').and.returnValue(Observable.of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to see hot topics', () => {
    component.ngOnInit();

    expect(topicService.getAllTopics).toHaveBeenCalledWith(5);
    expect(component.hotTopics).toContain(sampleTopic);
  });

  it('should be able to see error message', () => {
    component.error = true;

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error-msg')).nativeElement.classList.contains('hidden')).toBe(false);
  });
});
