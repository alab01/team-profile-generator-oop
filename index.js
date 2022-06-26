const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const inquirer = require('inquirer');

const teamMemberArray = [];

const generateHTML = function(data) {
    var start = `<!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta http-equiv="X-UA-Compatible" content="IE=edge">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Document</title>
             <link rel="stylesheet" type="text/css" href="style.css">
         </head>
         <body>
         <header class= page-title>My Team</header>`;

    var middle = `<div class='main-container'>`;
    for (var member of data) {
        if (member instanceof Manager)
            middle += buildHtmlForManager(member);
        else if (member instanceof Engineer)
            middle += buildHtmlForEngineer(member);
        else
            middle += buildHtmlForIntern(member);
    }
    var end = `</div></body></html>`
    var output = start + middle + end;
    return output;
}
function buildHtmlForManager(manager) {
    var name = `<div class='member-name'>${manager.name}</div>`;
    var position = `<div class='member-position'>Manager</div>`;
    var id = `<div class='member-id'>ID: ${manager.id}</div>`;
    var email = `<div class='member-email'>Email: ${manager.email}</div>`;
    var officeNumber = `<div class='member-officeNumber'>Office Number: ${manager.officeNumber}</div>`;
    var output = `<div class='member'>${name}${position}${id}${email}${officeNumber}</div>`;
    return output;
}

function buildHtmlForEngineer(engineer) {
    var name = `<div class='member-name'>${engineer.name}</div>`;
    var position = `<div class='member-position'>Engineer</div>`;
    var id = `<div class='member-id'>ID: ${engineer.id}</div>`;
    var email = `<div class='member-email'>Email: ${engineer.email}</div>`;
    var github = `<div class='member-github'>GitHub: ${engineer.github}</div>`;
    var output = `<div class='member'>${name}${position}${id}${email}${github}</div>`;
    return output;
}

function buildHtmlForIntern(intern) {
    var name = `<div class='member-name'>${intern.name}</div>`;
    var position = `<div class='member-position'>Intern</div>`;
    var id = `<div class='member-id'>ID: ${intern.id}</div>`;
    var email = `<div class='member-email'>Email: ${intern.email}</div>`;
    var school = `<div class='member-school'>School: ${intern.school}</div>`;
    var output = `<div class='member'>${name}${position}${id}${email}${school}</div>`;
    return output;
}

const managerQuestions = [
    {
      type: 'input',
      message: "What is your manager's name?",
      name: 'managerName',
    },
    {
      type: 'input',
      message: "What is your manager's ID?",
      name: 'managerId',
    },
    {
      type: 'input',
      message: "What is your manager's email address?",
      name: 'managerEmail',
    },
    {
      type: 'input',
      message: "What is your manager's office number?",
      name: 'managerOffice',
    },
]

function mangagerPrompt() {
    return inquirer.prompt (managerQuestions).then((data) => {
        console.log(data);
        const managerName = data.managerName;
        const managerId = data.managerId;
        const managerEmail = data.managerEmail;
        const managerOffice = data.managerOffice;
        const manager = new Manager(managerName, managerId, managerEmail, managerOffice);
        teamMemberArray.push(manager);
    });
}


const employeeQuestions = [
    {
        type: 'list',
        message: 'What is your employees role?',
        name: 'employeeRole',
        choices: ['Engineer', 'Intern'],
    },
    {
        type: 'input',
        message: "What is the employees name?",
        name: 'employeeName',
    },
    {
        type: 'input',
        message: "What is the employees ID?",
        name: 'employeeId',
    },
    {
        type: 'input',
        message: "What is your the employees email address?",
        name: 'employeeEmail',
    },
    {
        type: 'input',
        message: "What is your employees GitHub username?",
        name: 'employeeGitHub',
    },
    {
        type: 'input',
        message: "What is your employee school?",
        name: 'employeeSchool',
    },

]

function employeePrompt() {
    return inquirer.prompt (employeeQuestions).then((data) => {
        console.log(data);
        const employeeRole = data.employeeRole;
        const employeeName = data.employeeName;
        const employeeId = data.employeeId;
        const employeeEmail = data.employeeEmail;
        const employeeGitHub = data.employeeGitHub;
        const employeeSchool = data.employeeSchool;
    
        if (employeeRole === "Intern") {
            const intern = new Intern(employeeName, employeeId, employeeEmail, employeeSchool);
            teamMemberArray.push(intern);
        } else {
            const engineer = new Engineer(employeeName, employeeId, employeeEmail, employeeGitHub);
            teamMemberArray.push(engineer);
        }
    
    });
}

mangagerPrompt().then(employeePrompt).then( data => {
    var htmlContent = generateHTML(teamMemberArray);
    fs.writeFile('index.html', htmlContent, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
});



