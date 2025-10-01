import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import {Topic} from '../../model/topic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private limit: Number = 5;
  hotTopics: Topic[] = [];
  error: Boolean = false;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.getHotTopics();
  }

  getHotTopics(): void {
    this.topicService.getAllTopics(this.limit).subscribe((allTopics) => {
      this.hotTopics = allTopics;
    },
    (err) => {
      this.error = true;
    }
  );
  }
}
