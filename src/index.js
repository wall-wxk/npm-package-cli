const path = require('path');
const chalk = require('chalk');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
const fse = require('fs-extra');
const shelljs = require('shelljs');

const log = console.log;
const initCommand = require('./command');
const initSetting = require('./setting');
const output = require('./output');

class Creation{
  constructor(){
    const store = memFs.create();
    this._mfs = memFsEditor.create(store);

    this._setting = {
      projectName: '',
      version: '1.0.0',
      description: '',
      authorName: '',
      authorEmail: '',
      authorUrl: '',
      license: '',
      keywords: [],
      homepage: '',
      repositoryType: '',
      repositoryUrl: '',
      coverallsToken: '',
      licenseYear: new Date().getFullYear()
    };
    this._rootPath = path.resolve(__dirname, '..');
    this._tplPath = path.resolve(__dirname, '..', 'template');
  }
  do(){
    // 初始化
    log(chalk.hex('#faebd7').bold(`${chalk.whiteBright('♫ ♫♬♪♫ ')} npm-package-cli ${chalk.whiteBright('♫ ♫♬♪♫ ')}`));
    initCommand();

    log(chalk.white(`Follow the prompts to complete the project configuration.`));
    log('');

    // 获取配置
    initSetting().then(setting => {
      this._setting = Object.assign({}, this._setting, setting);

      log(chalk.cyanBright('the setting:'));
      log(this._setting);
      log('');

      // 输出文件
      output(this).then(res => {
        // 加入git版本管理
        shelljs.cd(setting.projectName);
        if(shelljs.exec('git init').code !== 0){
          shelljs.echo('Error: git init failed.');
          shell.exit(1);
        };
        log(chalk.green(`Project construction completed！`));
        log(chalk.green(`Start project: cd ${setting.projectName} && npm install`));
      });
    });
  }
  getTplPath(file){
    return path.join(this._tplPath, file);
  }
  copy(file, to){
    const filePath = this.getTplPath(file);
    fse.copy(filePath, to);
  }
  copySync(file, to){
    const filePath = this.getTplPath(file);
    fse.copySync(filePath, to);
  }
  copyTpl(file, to, data={}){
    const filePath = this.getTplPath(file);
    this._mfs.copyTpl(filePath, to ,data);
  }
}

module.exports = Creation;