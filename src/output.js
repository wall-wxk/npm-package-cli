const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const log = console.log;

function getProjectResolve(projectPath){
    return function(to){
        return path.resolve(projectPath, to);
    }
}

function output(creation){
    return new Promise((resolve, reject)=>{
        const setting = creation._setting;
        const {
            projectName
        } = setting;
        const cwd = process.cwd();

        // 文件夹
        const projectPath = path.join(cwd, projectName);

        const projectResolve = getProjectResolve(projectPath);
        
        // 新建
        fse.mkdirSync(projectPath);

        // copy
        creation.copy('.circleci', projectResolve('.circleci'))

        creation.copySync('example', projectResolve('example'))
        creation.copyTpl('example/index.html', projectResolve('example/index.html'), setting);
        creation.copyTpl('example/index.js', projectResolve('example/index.js'), setting);
        
        creation.copySync('scripts', projectResolve('scripts'));
        creation.copyTpl('scripts/config.js', projectResolve('scripts/config.js'), setting);

        creation.copy('src', projectResolve('src'));

        creation.copySync('test', projectResolve('test'));
        creation.copyTpl('test/index.test.ts', projectResolve('test/index.test.ts'), setting)

        creation.copy('typings', projectResolve('typings'));
        creation.copy('.babelrc', projectResolve('.babelrc'));
        creation.copy('.browserslistrc', projectResolve('.browserslistrc'));
        creation.copy('.commitlintrc.js', projectResolve('.commitlintrc.js'));
        creation.copy('.cz-config.js', projectResolve('.cz-config.js'));
        creation.copy('.editorconfig', projectResolve('.editorconfig'));
        creation.copy('.eslintignore', projectResolve('.eslintignore'));
        creation.copy('.eslintrc.js', projectResolve('.eslintrc.js'));
        creation.copy('gitignore', projectResolve('.gitignore'));
        creation.copy('.npmrc', projectResolve('.npmrc'));
        creation.copy('tsconfig.json', projectResolve('tsconfig.json'));
        creation.copy('tsconfig.build.json', projectResolve('tsconfig.build.json'));

        switch(setting.license.toLowerCase()){
            case 'mit':
                creation.copyTpl('LICENSE_MIT', projectResolve('LICENSE'), setting);
                break;
            case 'bsd':
                creation.copyTpl('LICENSE_BSD', projectResolve('LICENSE'), setting);
                break;
            default:;
        }

        creation.copyTpl('.coveralls.yml', projectResolve('.coveralls.yml'), setting);

        creation.copyTpl('package.json', projectResolve('package.json'), setting);
        creation.copyTpl('package-lock.json', projectResolve('package-lock.json'), setting);
        creation.copyTpl('README.md', projectResolve('README.md'), setting);
        creation.copyTpl('README.zh_CN.md', projectResolve('README.zh_CN.md'), setting);

        creation._mfs.commit(() => {
            resolve();
        });
    });
}

module.exports = output;