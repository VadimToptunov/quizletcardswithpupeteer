const fs = require('fs');
const scraperObject = {

    async scraper(browser, link, filename){
        let page = await browser.newPage();
        await page.setDefaultNavigationTimeout(20000);
        console.log(`Navigating to ${link}...`);
        await page.goto(link);
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
        saveLexiconToFile(words, filename);
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

function saveLexiconToFile(words, filename){
    var stream = fs.createWriteStream(filename, {flags:'a'});
    words.forEach( function (item) {
        stream.write(item + "\n");
    });
    stream.end();
}

module.exports = scraperObject;
