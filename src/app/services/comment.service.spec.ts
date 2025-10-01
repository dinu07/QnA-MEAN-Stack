import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { CommentService } from './comment.service';

import { Question } from '../model/question';
import { Topic } from '../model/topic';
import {Comment} from '../model/comment';

import { topicsBaseUrl } from './config';

describe('CommentService', () => {

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

  const dummyComment: Comment = {
    id: '1',
    description: 'comment-desc-1',
    createdDate: new Date(),
    question: dummyQuestion
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [CommentService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('save Comment', inject([HttpTestingController, CommentService], (httpMock: HttpTestingController, service: CommentService) => {

    service.saveComment(dummyQuestion, dummyComment).subscribe((data) => {
      expect(data.id).toBe('1');
      expect(data.description).toBe('comment-desc-1');
      expect(data.question).toBe(dummyQuestion);
      expect(data.createdDate).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/questions/1/comments');
    expect(req.request.method).toEqual('POST');

    req.flush(dummyComment);
  }));

  it('delete comment', inject([HttpTestingController, CommentService], (httpMock: HttpTestingController, service: CommentService) => {

    service.deleteComment(dummyComment).subscribe((obj) => {
      expect(obj).not.toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/comments/1');
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  }));

  it('get comments', inject([HttpTestingController, CommentService], (httpMock: HttpTestingController, service: CommentService) => {

    service.getComments('1').subscribe((comments) => {
      expect(comments).toContain(dummyComment);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/questions/1/comments');
    expect(req.request.method).toEqual('GET');

    req.flush([dummyComment]);
  }));
});
