const Employee = require('./lib/Employee');

const employee1 = new Employee('Ron Burgundy', 'abc123', 'test@email.com');

const name1 = employee1.getName();
const id1 = employee1.getId();
const email1 = employee1.getEmail();
const role1 = employee1.getRole();

console.log(name1);
console.log(id1);
console.log(email1);
console.log(role1);