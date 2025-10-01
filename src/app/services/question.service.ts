import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {questionBaseUrl, topicsBaseUrl} from './config';
import { Observable } from 'rxjs/Observable';

import {Topic} from '../model/topic';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(`${questionBaseUrl}`);
  }

  getQuestionsUnderTopic(topicId: String): Observable<Array<Question>> {
    return this.http.get<Array<Question>>(`${topicsBaseUrl}/${topicId}/questions`);
  }

  getQuestion(questionId: String): Observable<Question> {
    return this.http.get<Question>(`${questionBaseUrl}/${questionId}`);
  }

  deleteQuestion(existingQuestion: Question): Observable<Object> {
    const questionId = existingQuestion.id;
    return this.http.delete<Object>(`${questionBaseUrl}/${questionId}`);
  }

  saveQuestion(topic: Topic, newQuestion: Question): Observable<Question> {
    return this.http.post<Question>(`${topicsBaseUrl}/${topic.id}/questions`, newQuestion, httpOptions);
  }
}
