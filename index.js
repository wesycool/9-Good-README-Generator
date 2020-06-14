const inquirer = require('inquirer')
const fs = require('fs')
const axios = require('axios')

const questions = [
    {
        type:'input',
        message: 'What is your username?',
        name: 'user',
    },
    {
        type:'list',
        message: 'What kind of file would you like to create?',
        name: 'filename',
        choices: ['README.md','index.html']
    },
    {
        type:'input',
        message: 'What is your project name?',
        name: 'title',
        when: file => file.filename == 'README.md'
    },
    {
        type: 'input',
        message: 'What is this project about?',
        name: 'description',
        when: file => file.filename == 'README.md'
    },
    {
        type:'checkbox',
        message:'What content would you like to include?',
        name:'content',
        choices:['Installation','Usage','License','Contributing','Tests','Questions'],
        when: file => file.filename == 'README.md'
    },
    {
        type:'input',
        message:'What application(s) you need to install?',
        name:'install',
        when: file => file.content.includes('Installation')
    }

];



function writeToFile(filename, data) {
    fs.writeFile(filename, data, function(err) {
        if (err) return console.log(err);
        console.log(`Success! ${filename} file was created.`);
    })
}


async function init() {
    const getPrompt = await inquirer.prompt(questions)
    const fetchGitHub = await axios.get(`https://api.github.com/users/${getPrompt.user}`)

    let tableContent = ''
    let content = ''
    for (const contentList of getPrompt.content){
        tableContent += `* [${contentList}](#${contentList.toLowerCase()})\n`
        
        let contentInfo
        switch (contentList) {
            case 'Installation': contentInfo = ''; break;
            case 'Usage': contentInfo = ''; break;
            case 'License': contentInfo = MITlicense(fetchGitHub.data.name); break;
            case 'Contributing': contentInfo = ``; break;
            case 'Tests': contentInfo = ''; break;
            case 'Questions': contentInfo = ''; break;
        }
        
        content += `## ${contentList}\n${contentInfo}\n\n`
    }

    const readme = `# ${getPrompt.title}\n${getPrompt.description}\n\n## Table of Contents\n${tableContent}\n\n${content}This project was created by ${fetchGitHub.data.name} - [check porfolio](${fetchGitHub.data.blog})`

    if (getPrompt.filename == 'README.md') writeToFile(`${getPrompt.filename}`,readme)
}

init();


function MITlicense(fullname){
return `MIT License

Copyright (c) ${(new Date()).getFullYear()} ${fullname}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
}


// * Title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions