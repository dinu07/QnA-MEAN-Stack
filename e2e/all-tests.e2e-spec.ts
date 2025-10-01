import { DashboardPage } from './pages/dashboard.po';
import { TopicPage } from './pages/topic.po';
import {QuestionPage} from './pages/question.po';
import { ElementFinder, by } from 'protractor';

describe('Should be able to', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
    page.navigateTo();
  });

  it('see top 5 topics on dashboard', () => {
    expect(page.getDisplayedTopicsCount()).toEqual(5);
  });

  it('see name, description and topic details link on a dashboard topic', () => {
    page.getFirstTopicName().then((name) => {
      expect(name).not.toBeNull();
    });
    page.getFirstTopicDescription().then((desc) => {
      expect(desc).not.toBeNull();
    });
    page.getFirstTopicDetailsLinkAttr('href').then((link) => {
      expect(link).not.toBeNull();
    });
  });

  describe('able to', () => {

    let topicPage: TopicPage = null;

    beforeEach(() => {
      topicPage = page.clickFirsTopicDetailsLink();
    });

    it('post a new question, see posted questions, and delete', () => {

      topicPage.getAllPostedQuestion().then((allQuestions) => {
        const existingQuestionsSize = allQuestions.length;

        // should be able to post a new question
        const desc = 'test' + Math.random();
        topicPage.postNewQuestion(desc);

        topicPage.getAllPostedQuestion().then((questions) => {
          expect(questions.length).toBeGreaterThan(existingQuestionsSize);
        });

        const recentlyPostedQuestion: ElementFinder = topicPage.getRecentlyPostedQuestion();

        expect(recentlyPostedQuestion.element(by.className('question-date')).getText()).not.toBeNull();
        expect(recentlyPostedQuestion.element(by.className('question-description')).getText()).toEqual(desc);

        // should be able to delete the question
        topicPage.deleteRecentlyPostedQuestion();

        topicPage.getAllPostedQuestion().then((questions) => {
          expect(questions.length).toEqual(existingQuestionsSize);
        });
      });
    });

    it('post a comment, see posted comment, and delete', () => {
      // pre-steps
      const desc = 'test' + Math.random();
      topicPage.postNewQuestion(desc);

      const questionPage: QuestionPage = topicPage.clickViewCommentsOnRecentlyPostedQuestion();

      questionPage.getAllComments().then((items) => {
        const existingCommentsSize = items.length;

        // post new comment
        questionPage.postNewComment(desc);

        questionPage.getAllComments().then((allComments) => {
          expect(allComments.length).toBeGreaterThan(existingCommentsSize);
        });

        // validate posted comment details
        const recentlyPostedComment = questionPage.getRecentComment();

        expect(recentlyPostedComment.element(by.className('comment-date')).getText()).not.toBeNull();
        expect(recentlyPostedComment.element(by.className('comment-description')).getText()).toEqual(desc);

        // delete comment
        questionPage.deleteRecentComment();

        questionPage.getAllComments().then((comments) => {
          expect(comments.length).toEqual(existingCommentsSize);
        });
      });
    });

  });


});
