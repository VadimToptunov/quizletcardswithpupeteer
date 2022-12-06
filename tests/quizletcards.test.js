const timeout = 50000;

describe('Quizlet cards page with greek lexicon', () => {
    beforeEach(async () => {
        await page.goto('https://quizlet.com/gb/518431874/%CE%A0%CF%81%CE%AC%CE%B3%CE%BC%CE%B1%CF%84%CE%B1-%CF%80%CE%BF%CF%85-%CF%80%CE%B1%CE%AF%CF%81%CE%BD%CE%BF%CF%85%CE%BC%CE%B5-%CE%BC%CE%B1%CE%B6%CE%AF-%CE%BC%CE%B1%CF%82-%CF%83%CF%84%CE%B9%CF%82-%CE%B4%CE%B9%CE%B1%CE%BA%CE%BF%CF%80%CE%AD%CF%82-things-we-take-with-us-on-holidays-flash-cards/');
    }, timeout);

    it('should contain "Quizlet" in title', async () => {
        await expect(page.title()).resolves.toContain('Quizlet');
    });

    it('should contain a word card', async  () => {
        const card = await page.evaluate(() => document.querySelector(".cc4slzn"));
        expect(card).not.toBeNull();
    }, timeout);

    it('list of cards should not be empty', async  () => {
        const cardsList = await page.evaluate(() => Array.from(document.querySelectorAll(".SetPageTerm-content")));
        expect(cardsList.length).toBeGreaterThan(0);
    }, timeout);
});