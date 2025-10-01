import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { QuestionPage } from './question.po';

export class TopicPage {

    topicPage: ElementFinder;
    newQuestionSection: ElementFinder;


    constructor(topicPage: ElementFinder) {
        this.topicPage = topicPage;
        this.newQuestionSection = this.topicPage.element(by.className('post-question-card'));
    }

    postNewQuestion(description: string) {
        this.newQuestionSection.element(by.id('question-field')).sendKeys(description);
        this.newQuestionSection.element(by.id('question-button')).click();

        browser.waitForAngular();
    }

    deleteRecentlyPostedQuestion() {
        this.getRecentlyPostedQuestion().element(by.className('delete-question')).click();
        browser.waitForAngular();
    }

    getAllPostedQuestion() {
        return this.topicPage.all(by.className('question-wrapper-card'));
    }

    getRecentlyPostedQuestion() {
        return this.getAllPostedQuestion().get(0);
    }

    clickViewCommentsOnRecentlyPostedQuestion() {
        this.getRecentlyPostedQuestion().element(by.className('view-comments')).click();

        browser.wait(ExpectedConditions.urlContains('/question-details/'));

        const baseElt: ElementFinder = element(by.css('app-question'));
        return new QuestionPage(baseElt);
    }
}
