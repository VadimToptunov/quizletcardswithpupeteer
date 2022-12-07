const {mkdir} = require('fs').promises;
const os = require('os');
const path = require('path');

global.DIR = path.join(os.tmpdir(), 'test_file_directory');
// global.LINK = "https://quizlet.com/gb/518431874/%CE%A0%CF%81%CE%AC%CE%B3%CE%BC%CE%B1%CF%84%CE%B1-%CF%80%CE%BF%CF%85-%CF%80%CE%B1%CE%AF%CF%81%CE%BD%CE%BF%CF%85%CE%BC%CE%B5-%CE%BC%CE%B1%CE%B6%CE%AF-%CE%BC%CE%B1%CF%82-%CF%83%CF%84%CE%B9%CF%82-%CE%B4%CE%B9%CE%B1%CE%BA%CE%BF%CF%80%CE%AD%CF%82-things-we-take-with-us-on-holidays-flash-cards/";
// global.TESTFILE = "sdf.txt";
// global.TIMEOUT_SLEEP = 50000;

module.exports = async function () {
    await mkdir(DIR, {recursive: true});
};