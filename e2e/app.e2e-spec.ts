import { ClockmakerLabsPage } from './app.po';

describe('clockmaker-labs App', () => {
  let page: ClockmakerLabsPage;

  beforeEach(() => {
    page = new ClockmakerLabsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
