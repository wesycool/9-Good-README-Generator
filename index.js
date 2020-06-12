const inquirer = require('inquirer')
const fs = require('fs')

const questions = [


];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data, null, '\t'), function(err) {
        if (err) return console.log(err);
        console.log("Success!");
    })
}

function init() {

}

init();
