import { browser, element, by } from 'protractor';
import { Home } from './home.po';

describe('User profile', () => {
  it('should display an individual user\'s details in the profile page', () => {
    let home = new Home();
    home.navigateTo();

    let firstUser = element.all(by.css('.panel-title')).all(by.tagName('a')).first();
    firstUser.click().then((res) => {
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/user/1');
      let title = element(by.css('.panel-title'));
      expect(title.getText()).toEqual('Jane');
    });
  });
});
