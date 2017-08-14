import { browser, element, by } from 'protractor';

export class Home {
  navigateTo() {
    return browser.get('/');
  }
}
