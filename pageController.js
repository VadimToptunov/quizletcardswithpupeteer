const pageScraper = require('./pageScraper');

const scrapeAllObject = {
    async scrapeAll(browserInstance, linkUrl, filenameTXT){
        let browser;
        let link;
        let filename;

        try{
            browser = await browserInstance;
            link = await linkUrl;
            filename = await filenameTXT;
            await pageScraper.scraperObject.scraper(browser, link, filename);
        }
        catch(err){
            console.log("Could not resolve the browser instance => ", err);
        }
    }
}

module.exports = {
    scrapeAllObject
};
