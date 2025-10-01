import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {topicsBaseUrl} from './config';
import {Topic} from '../model/topic';
import { Question } from '../model/question';

@Injectable()
export class TopicService {

  private topics: Topic[] = [];

  constructor(private http: HttpClient) {
  }

  getAllTopics(limitBy: Number): Observable<Topic[]> {
    return this.http.get<Array<Topic>>(`${topicsBaseUrl}?limit=${limitBy}`);
  }

  getTopic(topicId: String): Observable<Topic> {
    return this.http.get<Topic>(`${topicsBaseUrl}/${topicId}`);
  }
}
