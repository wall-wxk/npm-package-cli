const inquirer = require('inquirer');
const fse = require('fs-extra');

function initSetting(){
    let prompt = [
        {
            type: 'input',
            name: 'projectName',
            message: 'project name',
            validate(input){
                if(!input){
                    return 'project name is required.'
                }
                if(fse.existsSync(input)){
                    return 'project name of folder is exist.'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'version',
            message: 'version',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'description',
            message: 'description'
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'author name'
        },
        {
            type: 'input',
            name: 'authorEmail',
            message: 'author email'
        },
        {
            type: 'input',
            name: 'authorUrl',
            message: 'author url'
        },
        {
            type: 'list',
            name: 'license',
            message: 'license(default:MIT)',
            choices: [
                'MIT',
                'BSD',
                'edit later'
            ],
            default: 'MIT'
        },
        {
            type: 'input',
            name: 'keywords',
            message: 'keywords, such as key1,key2,key3',
            filter: function(value){
                return value.split(',');
            }
        },
        {
            type: 'input',
            name: 'homepage',
            message: 'project homepage'
        },
        {
            type: 'input',
            name: 'repositoryType',
            message: 'repository type',
            default: 'git'
        },
        {
            type: 'input',
            name: 'repositoryUrl',
            message: 'repository url'
        },
        {
            type: 'input',
            name: 'libraryName',
            message: 'umd library name',
            validate(input){
                if(input.length < 1){
                    return 'library name is required.'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'coverallsToken',
            message: 'coveralls token'
        }
    ];

    return inquirer.prompt(prompt);
}

module.exports = initSetting;