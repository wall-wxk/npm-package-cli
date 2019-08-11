const commander = require('commander');
const chalk = require('chalk');

const packageJson = require('../package.json');
const log = console.log;

function initCommand(){
    commander.version(packageJson.version)
        .on('--help', ()=>{
            log(chalk.green('  run testcli and edit the setting.'));
        })
        .parse(process.argv);
}

module.exports = initCommand;