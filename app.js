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

    const { createPromptModule } = inquirer;
    const prompt = createPromptModule();

    const selectedOption = await prompt([
        {
            type: "list",
            name: "menuOption",
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ],
        },
    ])

    // console.log(selectedOption);

    const [departments] = await connection.execute('SELECT * FROM departments;', []);
    console.table(departments);
}

main();

