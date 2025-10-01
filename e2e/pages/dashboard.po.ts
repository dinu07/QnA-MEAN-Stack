import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { TopicPage } from './topic.po';

export class DashboardPage {
  navigateTo() {
    return browser.get('/dashboard');
  }

  getDisplayedTopicsCount() {
    return this.getAllTopicOnPage().count();
  }

  getAllTopicOnPage() {
    return element.all(by.css('app-topic-summary'));
  }

  getFirstTopic() {
    return this.getAllTopicOnPage().get(0);
  }

  getFirstTopicName() {
    return this.getFirstTopic().element(by.className('topic-name')).getText();
  }

  getFirstTopicDescription() {
    return this.getFirstTopic().element(by.className('topic-description')).getText();
  }

  getFirstTopicDetailsLinkAttr(attr: string) {
    return this.getFirstTopicDetailsLink().getAttribute(attr);
  }

  getFirstTopicDetailsLink() {
    return this.getFirstTopic().element(by.className('view-topic-details'));
  }

  clickFirsTopicDetailsLink() {

    this.getFirstTopicDetailsLink().click();

    // wait for url to change
    browser.wait(ExpectedConditions.urlContains('/topic-details/'));

    const baseElt: ElementFinder = element(by.css('app-topic-detail'));
    return new TopicPage(baseElt);
  }
}
