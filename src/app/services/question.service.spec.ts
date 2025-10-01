import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';

import { Question } from '../model/question';
import { Topic } from '../model/topic';


describe('QuestionService', () => {
  const dummyTopic: Topic = {
    id: '1',
    name: 'topic-1',
    description: 'topic-desc-1',
    createdDate: new Date()
  };

  const dummyQuestion: Question = {
    id: '1',
    description: 'question-desc-1',
    createdDate: new Date(),
    topic: dummyTopic
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionService]
    });
  });

  it('get all questions', inject([HttpTestingController, QuestionService], (httpMock: HttpTestingController, service: QuestionService) => {

    service.getAllQuestions().subscribe((questions) => {
      expect(questions.length).toBe(1);
      expect(questions).toContain(dummyQuestion);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/questions');
    expect(req.request.method).toBe('GET');

    req.flush([dummyQuestion]);
  }));

  it('get questions under topic', inject([HttpTestingController, QuestionService],
    (httpMock: HttpTestingController, service: QuestionService) => {

    service.getQuestionsUnderTopic('1').subscribe((questions) => {
      expect(questions.length).toBe(1);
      expect(questions).toContain(dummyQuestion);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/topics/1/questions');
    expect(req.request.method).toBe('GET');

    req.flush([dummyQuestion]);
  }));

  it('get question', inject([HttpTestingController, QuestionService], (httpMock: HttpTestingController, service: QuestionService) => {

    service.getQuestion('1').subscribe((question) => {
      expect(question).toEqual(dummyQuestion);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/questions/1');
    expect(req.request.method).toBe('GET');

    req.flush(dummyQuestion);
  }));


  it('delete question', inject([HttpTestingController, QuestionService], (httpMock: HttpTestingController, service: QuestionService) => {

    service.deleteQuestion(dummyQuestion).subscribe((questions) => {
      expect(questions).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/questions/1');
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  }));


  it('save question', inject([HttpTestingController, QuestionService], (httpMock: HttpTestingController, service: QuestionService) => {

    service.saveQuestion(dummyTopic, dummyQuestion).subscribe((question) => {
      expect(question).toEqual(dummyQuestion);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/topics/1/questions');
    expect(req.request.method).toBe('POST');

    req.flush(dummyQuestion);
  }));

});
