import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../model/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.component.html',
  styleUrls: ['./question-summary.component.css']
})
export class QuestionSummaryComponent implements OnInit {

  @Input() question: Question;

  @Input() questionIdx: number;

  @Output() deleteQuestionRequest: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  deleteQuestion(): void {
    this.deleteQuestionRequest.emit(this.question);
  }
}
