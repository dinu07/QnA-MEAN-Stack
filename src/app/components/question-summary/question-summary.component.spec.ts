import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { QuestionSummaryComponent } from './question-summary.component';
import {QuestionService} from '../../services/question.service';
import { HttpClientModule } from '@angular/common/http';

import {Topic} from '../../model/topic';
import {Question} from '../../model/question';
import { By } from '@angular/platform-browser';

describe('QuestionSummaryComponent', () => {
  let component: QuestionSummaryComponent;
  let fixture: ComponentFixture<QuestionSummaryComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSummaryComponent ],
      imports: [ RouterTestingModule , HttpClientModule],
      providers: [ QuestionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSummaryComponent);
    component = fixture.componentInstance;

    component.question = sampleQ;
    component.questionIdx = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to display question', () => {
    expect(fixture.debugElement.query(By.css('.question-index')).nativeElement.innerHTML).toContain(1);
    expect(fixture.debugElement.query(By.css('.question-date')).nativeElement.innerHTML).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.question-description')).nativeElement.innerHTML).toContain(sampleQ.description);

  });

  it('should be able to delete question', () => {
    let emittedQ: Question;

    component.deleteQuestionRequest.subscribe((emittedVal) => {
      emittedQ = emittedVal;
    });

    fixture.debugElement.query(By.css('.delete-question')).triggerEventHandler('click', null);

    expect(emittedQ).toBe(sampleQ);
  });
});
