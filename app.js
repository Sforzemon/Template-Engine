const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const writeFile = util.promisify(fs.writeFile);
const Generate = require("./lib/Generator");
var id = 0;
var team = [];

function managerPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter Manager's name: ",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter Manager's email: ",
        },
        {
            type: "input",
            name: "officeNum",
            message: "Please enter Manager's office number: ",
        },
        {
            type: "confirm",
            name: "anotherOne",
            message: "Do you want to add another team member?",
            default: true
        },
        {
            type: "list",
            name: "newMember",
            message: "Which type of team member do you want to add?",
            choices: ["Engineer", "Intern"],
            when: function(answers) {
                return answers.anotherOne;
            }
        }
    ])
}

function engineerPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter engineer's name:",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter engineer's email:",
        },
        {
            type: "input",
            name: "github",
            message: "Please enter engineer's Github username:",
        },
        {
            type: "confirm",
            name: "anotherOne",
            message: "Do you want to add another team member?",
            default: true
        },
        {
            type: "list",
            name: "newMember",
            message: "Which type of team member do you want to add?",
            choices: ["Engineer", "Intern"],
            when: function(answers) {
                return answers.anotherOne;
            }
        }
    ]);
}

function internPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter intern's name:",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter intern's email:",
        },
        {
            type: "input",
            name: "school",
            message: "Please enter intern's university",
        },
        {
            type: "confirm",
            name: "anotherOne",
            message: "Do you want to add another team member?",
            default: true
        },
        {
            type: "list",
            name: "newMember",
            message: "Which type of team member do you want to add?",
            choices: ["Engineer", "Intern"],
            when: function(answers) {
                return answers.anotherOne;
            }
        }
    ]);
}

var engineers = {};
var interns = {};

async function createEngineer() {
    engineers = await engineerPrompt();
    team.push(new Engineer(engineers.name, ++id, engineers.email, engineers.github));
}

async function createIntern() {
    interns = await internPrompt();
    team.push(new Intern(interns.name, ++id, interns.email, interns.school));
}

async function init() {
    try {
        managerData = await managerPrompt();
        console.log(managerData)
        team.push(new Manager(managerData.name, ++id, managerData.email, managerData.officeNum));

        var loop = true;
        while(loop) {
            if (managerData.anotherOne === false) {
                loop = false;
            }
            if (managerData.newMember === "Engineer" || 
                engineers.newMember === "Engineer" || 
                interns.newMember === "Engineer") {
                await createEngineer();
                if (engineers.anotherOne === false) {
                    loop = false;
                }
            }
            if (managerData.newMember === "Intern" || 
                engineers.newMember === "Intern" || 
                interns.newMember === "Intern") {
                await createIntern();
                if (interns.anotherOne === false) {
                    loop = false;
                }
            }
        }
        // console.log(team);
        const content = Generate.generateHTML(team);
        await writeFile("./output/newTeam.html", content, "utf8");
        console.log(`*********\nnewTeam.html generated!!\n*********`)
        
    } catch (err) {
        console.log(err);
    }
}

init();