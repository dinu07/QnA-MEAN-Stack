import { Injectable } from '@angular/core';
import {Comment} from '../model/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {commentBaseUrl, questionBaseUrl} from './config';
import { Question } from '../model/question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  saveComment(question: Question, newComment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${questionBaseUrl}/${question.id}/comments`, newComment, httpOptions);
  }

  deleteComment(existingComment: Comment): Observable<Object> {
    return this.httpClient.delete<Object>(`${commentBaseUrl}/${existingComment.id}`);
  }


  getComments(questionId: String): Observable<Array<Comment>> {
    return this.httpClient.get<Array<Comment>>(`${questionBaseUrl}/${questionId}/comments`);
  }
}
