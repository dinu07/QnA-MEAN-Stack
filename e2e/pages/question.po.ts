import { ElementFinder, by, ExpectedConditions, $, browser } from 'protractor';

export class QuestionPage {
    questionPage: ElementFinder;
    newCommentSection: ElementFinder;

    constructor(questionPage: ElementFinder) {
        this.questionPage = questionPage;
        this.newCommentSection = this.questionPage.element(by.className('post-comment-card'));
    }

    postNewComment(desc: string) {
        this.newCommentSection.element(by.id('comment-field')).sendKeys(desc);
        this.newCommentSection.element(by.id('comment-button')).click();
        browser.waitForAngular();
    }

    getAllComments() {
        return this.questionPage.all(by.className('comment-card'));
    }

    getRecentComment() {
        return this.getAllComments().get(0);
    }

    deleteRecentComment() {
        this.getRecentComment().element(by.className('delete-comment')).click();
        browser.waitForAngular();
    }
}
