import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './components/question/question.component';
import { CommentComponent } from './components/comment/comment.component';
import { TopicService } from './services/topic.service';
import { QuestionService } from './services/question.service';
import { CommentService } from './services/comment.service';
import { TopicSummaryComponent } from './components/topic-summary/topic-summary.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { QuestionSummaryComponent } from './components/question-summary/question-summary.component';
import { CustomErrorHandler } from './services/custom.error.handler';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuestionComponent,
    CommentComponent,
    TopicSummaryComponent,
    TopicDetailComponent,
    QuestionSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TopicService, QuestionService, CommentService, {
    provide: ErrorHandler,
    useClass: CustomErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
