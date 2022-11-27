const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, linkUrl, filenameTXT){
    let browser;
    let link;
    let filename;

    try{
        browser = await browserInstance;
        link = await linkUrl;
        filename = await filenameTXT;
        await pageScraper.scraper(browser, link, filename);
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance, linkUrl, filenameTXT) =>
    scrapeAll(browserInstance, linkUrl, filenameTXT)
