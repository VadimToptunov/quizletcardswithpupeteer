let pack = require("../package.json");
const globs = pack.jest.globals;

describe('Quizlet cards page with greek lexicon', () => {
    beforeAll(async () => {
        await page.goto(globs.LINK);
    }, globs.TIMEOUT_SLEEP);

    it('should contain "Quizlet" in title', async () => {
        await expect(page.title()).resolves.toContain('Quizlet');
    });

    it('should contain a word card', async  () => {
        const card = await page.evaluate(() => document.querySelector(".cc4slzn"));
        expect(card).not.toBeNull();
    }, globs.TIMEOUT_SLEEP);

    it('list of cards should not be empty', async  () => {
        const cardsList = await page.evaluate(() => Array.from(document.querySelectorAll(".SetPageTerm-content")));
        expect(cardsList.length).toBeGreaterThan(0);
    }, globs.TIMEOUT_SLEEP);
});