import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Topic} from '../../model/topic';
import {Question} from '../../model/question';
import { TopicService } from '../../services/topic.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic;
  questions: Array<Question>;
  error: Boolean = false;

  constructor(private topicService: TopicService,
    private questionService: QuestionService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.setTopicFromRoute();
  }

  setTopicFromRoute(): void {
    const id: String = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.topicService.getTopic(id).subscribe((topic) => {
        this.topic = topic;

        this.questionService.getQuestionsUnderTopic(this.topic.id).subscribe((results) => {
          this.questions = results;
        }, () => {
          this.error = true;
        });
      },
      () => {
        this.error = true;
      }
    );
    }
  }

  postNewQuestion(text: String): void {
    text = text.trim();
    // validation
    if (!text) { return; }

    const newQuestion: Question = { description: text} as Question;

    this.questionService.saveQuestion(this.topic, newQuestion).subscribe((savedQuestion) => {
      this.questions.unshift(savedQuestion);
    },
    () => {
      this.error = true;
    });
  }

  deleteQuestion(question: Question) {
    this.questions.splice(this.questions.indexOf(question), 1);
    this.questionService.deleteQuestion(question).subscribe();
  }
}
