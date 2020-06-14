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
        type:'input',
        message: 'What is your project name?',
        name: 'title' ,
    },
    {
        type: 'input',
        message: 'What is this project about?',
        name: 'description',
    },
    {
        type:'list',
        message: 'What kind of file is this?',
        name: 'filename',
        choices: ['README.md']
    }
];



function writeToFile(filename, data) {
    fs.writeFile(filename, data, function(err) {
        if (err) return console.log(err);
        console.log(`Success! ${filename} file was created.`);
    })
}


async function init() {
    const getQuestion = await inquirer.prompt(questions)
    const fetchGitHub = await axios.get(`https://api.github.com/users/${getQuestion.user}`)


const content = 
`# ${getQuestion.title}
${getQuestion.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation

## Usage

## License

## Contributing

## Tests

## Questions

This project was created by: ${fetchGitHub.data.name}`

    writeToFile(getQuestion.filename,content)
}

init();


// * Title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions