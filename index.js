const browserObject = require('./browser');
const scraperController = require('./pageController');

try{
    let browserInstance = browserObject.startBrowser();
    let slice = process.argv.slice(2);
    let link = slice[0];
    let filename = slice[1];
    scraperController(browserInstance, link, filename);
}catch (err){
    console.log("Could not run the program => ", err)
}
