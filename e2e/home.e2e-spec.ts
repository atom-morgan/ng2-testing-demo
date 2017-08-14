import { browser, element, by } from 'protractor';
import { Home } from './home.po';

describe('Home page', () => {
  it('should display a list of users on the home page', () => {
    let home = new Home();
    home.navigateTo();

    let users = element.all(by.css('.panel-title')).all(by.tagName('a'));
    users.getText().then((names) => {
      expect(names[0]).toEqual('Jane');
      expect(names[1]).toEqual('Bob');
      expect(names[2]).toEqual('Jim');
      expect(names[3]).toEqual('Bill');
    });
  });
});
