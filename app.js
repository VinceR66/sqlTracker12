require('dotenv').config();
const {
    buildConnectionOptions,
    createConnection,
} = require("./config/dbConfig");

const inquirer = require('inquirer');


const toLog = `
EMPLOYEE TRACKER
${"=*=".repeat(10)}
${"=*=".repeat(10)}
${"=*=".repeat(10)}
${"=*=".repeat(10)}
${"=*=".repeat(10)}
${"=*=".repeat(10)}
EMPLOYEE TRACKER
`


async function main() {
    console.log(toLog);
    const connection = await (createConnection(buildConnectionOptions()));

    const { prompt } = inquirer;

    let keepLooping = true;
    while (keepLooping) {


        const answers = await prompt([
            {
                type: 'list',
                message: "Please choose an option below",
                name: "action",
                choices: [
                    "View all Departments",
                    "View all Roles",
                    "View all Employees",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Exit Program",
                    "Update an Employee Role"
                ],
            },
        ])

        console.log(answers);

        if (answers.action === "View all Departments") {
            const [departments] = await connection.execute('SELECT * FROM departments;', []);
            console.log("Showing all Departments");
            console.table(departments);
        }

        if (answers.action === "View all Roles") {
            const [roles] = await connection.execute('SELECT r.title, r.id, r.salary, d.dept_name FROM roles r INNER JOIN departments d ON r.dept_id = d.id;', []);
            console.log("Showing all Roles");
            console.table(roles);
        }

        if (answers.action === "View all Employees") {
            const [employees] = await connection.execute('SELECT e.id, e.first_name, e.last_name, r.title, r.salary FROM employees e INNER JOIN roles r ON e.roles_id = r.id;', []);
            console.log("Showing all Employees");
            console.table(employees);
        }

        if (answers.action === "Add a Department") {

            const answersDept = await prompt([
                {
                    type: 'input',
                    message: "Enter new department name",
                    name: "dept_name",
                },
            ])

            let newDept = answersDept.dept_name;
            console.log(newDept);

            connection.query('INSERT INTO departments (dept_name) VALUES (?);', newDept, (err, result) => {
                if (err) {
                    console.log('hello');
                    console.log(err);
                }
                console.log("Success - Department added to database!");
            });
        }

        if (answers.action === "Add a Role") {

            const answersRole = await prompt([
                {
                    type: 'input',
                    message: 'What is the title of the new role?',
                    name: 'roleTitle',
                },
                {
                    type: 'input',
                    message: 'What is the salary for this role?',
                    name: 'roleSalary',
                },
                {
                    type: 'input',
                    message: 'What is the department ID?',
                    name: 'roleDept',
                }
            ])
            let newRole = [answersRole.roleTitle, answersRole.roleSalary, answersRole.roleDept];
            console.log(newRole);

            connection.query('INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?);', newRole, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Success - Role added to database!");
            });

        }

        if (answers.action === "Add an Employee") {

            const answersEmp = await prompt([
                {
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                    name: 'empFirstName',
                },
                {
                    type: 'input',
                    message: 'What is the last name of the new employee?',
                    name: 'empLastName',
                },
                {
                    type: 'input',
                    message: 'What is the employee role ID?',
                    name: 'empRole',
                },
                {
                    type: 'input',
                    message: 'What is the manager id for new employee?',
                    name: 'empMgr',
                }
            ])
            let newEmp = [answersEmp.empFirstName, answersEmp.empLastName, answersEmp.empRole, answersEmp.empMgr];
            console.log(newEmp);

            connection.query('INSERT INTO employees (first_name, last_name, roles_id, managers_id) VALUES (?, ?, ?, ?);', newEmp, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                console.log("Success - Employee has been added to database!");
            });
        }

    }

    if (answers.action === "Exit Program") {
        connection.end();
    }
}

main();













