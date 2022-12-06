const pagescraper = require("../pageScraper");
const browserObject = require("../browser");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

describe('Page scraper test:', () => {
    jest.useFakeTimers();
    jest.setTimeout(50000);
    let browserInstance= null;
    let url = "https://quizlet.com/gb/518431874/%CE%A0%CF%81%CE%AC%CE%B3%CE%BC%CE%B1%CF%84%CE%B1-%CF%80%CE%BF%CF%85-%CF%80%CE%B1%CE%AF%CF%81%CE%BD%CE%BF%CF%85%CE%BC%CE%B5-%CE%BC%CE%B1%CE%B6%CE%AF-%CE%BC%CE%B1%CF%82-%CF%83%CF%84%CE%B9%CF%82-%CE%B4%CE%B9%CE%B1%CE%BA%CE%BF%CF%80%CE%AD%CF%82-things-we-take-with-us-on-holidays-flash-cards/";
    let textFile = "sdf.txt"
    const filePath = path.join(__dirname, textFile);

    beforeEach(async () => {
        console.log('Starting browser test...');
        browserInstance = await browserObject.startBrowser();
    });

    //ToDo: Fix removing sdf.txt file after all tests

    // afterAll(async () => {
    //     console.log(`Cleaning up the created file ${textFile}...`);
    //     await unlinkAsync(filePath);
    // });

    it('should run scraping once', async () => {
        const scraperMock = await jest.spyOn(pagescraper.scraperObject, 'scraper');
        await pagescraper.scraperObject.scraper(browserInstance, url, filePath);
        expect(scraperMock).toBeCalledTimes(1);
    });
});