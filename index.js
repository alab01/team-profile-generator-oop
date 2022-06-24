const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const inquirer = require('inquirer');

const teamMemberArray = [];


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

mangagerPrompt().then(employeePrompt);

inquirer.prompt(mangagerPrompt().then(employeePrompt)).then((data) => {
    console.log(data);
    const htmlContent = generateHtml(data);
    console.log(htmlContent);

    fs.writeFile('index.html', htmlContent, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
});


console.log(teamMemberArray)
