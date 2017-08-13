import { NgTestingDemoPage } from './app.po';

describe('ng-testing-demo App', () => {
  let page: NgTestingDemoPage;

  beforeEach(() => {
    page = new NgTestingDemoPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
