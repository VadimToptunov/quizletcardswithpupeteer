const fs = require('fs');
const scraperObject = {
    url: 'https://quizlet.com/gb/341978129/%CE%9A%CE%B1%CF%84%CE%AC%CE%BB%CE%BF%CE%B3%CE%BF%CF%82-%CF%83%CE%B5-%CE%B5%CE%BB%CE%BB%CE%B7%CE%BD%CE%B9%CE%BA%CE%AE-%CF%84%CE%B1%CE%B2%CE%AD%CF%81%CE%BD%CE%B1-greek-taverns-menu-diagram/',

    async scraper(browser){
        let page = await browser.newPage();
        await page.setDefaultNavigationTimeout(20000);
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.setViewport({
            width: 1200,
            height: 800
        });
        await page.waitForSelector('button#onetrust-accept-btn-handler');
        await page.click('button#onetrust-accept-btn-handler');
        console.log("Accept button clicked.");
        await autoScroll(page);

        let words = await page.$$eval('.SetPageTerm-contentWrapper',
            elements=> {
                return elements.map(el =>
                    `${el.querySelector('.TermText.notranslate.lang-el').textContent} - ${el.querySelector('.TermText.notranslate.lang-en').textContent}`
                );
            });
        await console.log(words);
        saveLexiconToFile(words);
        browser.close();
    }
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function saveLexiconToFile(words){
    var stream = fs.createWriteStream("Tavern_lexicon.txt", {flags:'a'});
    words.forEach( function (item) {
        stream.write(item + "\n");
    });
    stream.end();
}

module.exports = scraperObject;
