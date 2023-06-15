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
                type: "list",
                name: "action",
                choices: [
                    "View all Departments",
                    "View all Roles",
                    "View all Employees",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee Role",
                    "Exit Program"
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
            const [roles] = await connection.execute('SELECT * FROM roles;', []);
            console.log("Showing all Roles");
            console.table(roles);
        }

        if (answers.action === "View all Employees") {
            const [employees] = await connection.execute('SELECT * FROM employees;', []);
            console.log("Showing all Employees");
            console.table(employees);
        }

        if (answers.action === "Add a Department") {
            const [employees] = await connection.execute('SELECT * FROM employees;', []);
            console.table(employees);
        }

        if (answers.action === "Add a Role") {
            const roleInput = await prompt([
                {
                    type: 'input',
                    message: 'What is title of the new role?',
                    name: 'roleTitle',
                },
                {
                    type: 'input',
                    message: 'What is salary for this role?',
                    name: 'roleSalary',
                },
                {
                    type: 'list',
                    message: 'The role will be part of which department?',
                    name: 'roleDepartment',
                    choices: [
                        "IT",
                        "Sales",
                        "Accounting",
                        "Management",
                        "HR"
                    ]
                }
            ])

            //const [roleInfo] = await connection.execute('INSERT INTO roles ("title", "salary", "department");', []);
            console.log("The role has been added to database");
            console.table(roles);
        }

        if (answers.action === "Add an Employee") {
            const [employees] = await connection.execute('SELECT * FROM employees;', []);
            console.table(employees);
        }

        if (answers.action === "Update an Employee Role") {
            const [employees] = await connection.execute('SELECT * FROM employees;', []);
            console.table(employees);
        }

        if (answers.action === "Exit Program") {
            connection.end();
        }


    }
}

main();

