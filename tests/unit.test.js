const browserObject = require('../browser');
const scrapeAllObj = require("../pageController");


describe('Browser unit tests', () => {
    jest.useFakeTimers();
    jest.setTimeout(50000);
    let browserInstance;
    let url = "https://quizlet.com/gb/518431874/%CE%A0%CF%81%CE%AC%CE%B3%CE%BC%CE%B1%CF%84%CE%B1-%CF%80%CE%BF%CF%85-%CF%80%CE%B1%CE%AF%CF%81%CE%BD%CE%BF%CF%85%CE%BC%CE%B5-%CE%BC%CE%B1%CE%B6%CE%AF-%CE%BC%CE%B1%CF%82-%CF%83%CF%84%CE%B9%CF%82-%CE%B4%CE%B9%CE%B1%CE%BA%CE%BF%CF%80%CE%AD%CF%82-things-we-take-with-us-on-holidays-flash-cards/";
    let textFile = "sdf.txt"

    it('should run browser once', async () => {
        const browserMock = await jest.spyOn(browserObject, 'startBrowser');
        await browserObject.startBrowser();
        expect(browserMock).toBeCalledTimes(1);
    });

    it('should run go to specific url once', async () => {
        browserInstance = await browserObject.startBrowser();
        const testController = await jest.spyOn(scrapeAllObj.scrapeAllObject, 'scrapeAll');
        await scrapeAllObj.scrapeAllObject.scrapeAll(browserInstance, url, textFile);
        expect(testController).toBeCalledTimes(1);
    });
});