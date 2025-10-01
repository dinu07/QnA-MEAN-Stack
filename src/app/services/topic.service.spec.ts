import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Topic } from '../model/topic';

import { TopicService } from './topic.service';
import { Mock } from 'protractor/built/driverProviders';

describe('TopicService', () => {

  const dummyTopic: Topic = {
    id: '1',
    name: 'topic-1',
    description: 'topic-desc-1',
    createdDate: new Date()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TopicService]
    });
  });

  it('get all topics', inject([HttpTestingController, TopicService], (httpMock: HttpTestingController, service: TopicService) => {
    service.getAllTopics(5).subscribe((topics) => {
      expect(topics.length).toBe(1);
      expect(topics).toContain(dummyTopic);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/topics?limit=5');
    expect(req.request.method).toBe('GET');

    req.flush([dummyTopic]);
  }));

  it('get topic', inject([HttpTestingController, TopicService], (httpMock: HttpTestingController, service: TopicService) => {
    service.getTopic('1').subscribe((topic) => {
      expect(topic).toEqual(dummyTopic);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/topics/1');
    expect(req.request.method).toBe('GET');

    req.flush(dummyTopic);
  }));
});
