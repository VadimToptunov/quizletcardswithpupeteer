const fs = require('fs').promises;
let pack = require("../package.json");
const globs = pack.jest.globals;

module.exports = async function () {
    try {
        await fs.rm(globs.TESTFILE);
    } catch (err){
        console.error(err);
    }
};