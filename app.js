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
            //---- DONE DONE ----THEN I am presented with a formatted table showing department names and department ids
        }

        if (answers.action === "View all Roles") {
            const [roles] = await connection.execute('SELECT r.title, r.id, r.salary, d.dept_name FROM roles r INNER JOIN departments d ON r.dept_id = d.id;', []);
            console.log("Showing all Roles");
            console.table(roles);
            //--DONE DONE ----THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        }

        if (answers.action === "View all Employees") {
            const [employees] = await connection.execute('SELECT e.id, e.first_name, e.last_name, r.title, r.salary FROM employees e INNER JOIN roles r ON e.roles_id = r.id;', []);
            console.log("Showing all Employees");
            console.table(employees);
            //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        }

        if (answers.action === "Add a Department") {

            const answersDept = await prompt([
                {
                    type: 'input',
                    message: "Enter new department name",
                    name: "deptName",
                },
            ])

            let newDept = [answersDept];
            console.log(newDept);

            connection.query('INSERT INTO departments VALUES (id, dept_name)', newDept, (err, result) => {
                if (err) {
                    console.log(err);
                }

                console.table(departments);
            });

            //const [departments] = await connection.execute('INSERT INTO departments (dept_name) VALUES ("KITCHEN");', []);
            // console.log("Showing all Departments");
            // console.table(departments);   
        }

        if (answers.action === "Add a Role") {

            const answersRole = await prompt([
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
                    type: 'input',
                    message: 'What is the department ID?',
                    name: 'roleDept',
                }
            ])
            let newRole = [answersRole];
            console.log(newRole);

            connection.query('INSERT INTO roles (title, salary, dept_id) VALUES (?)', newRole, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                console.table(roles);
            });

        }

        //const [roles] = await connection.execute('INSERT INTO roles (title, salary, dept_id) VALUES ("CHEF", 50000, 1);', []);
        //console.log("Showing all Roles");
        //console.table(roles);
    }

    if (answers.action === "Exit Program") {
        connection.end();
    }
}

main();



























/*

        if (answers.action === "Add a Department") {
            function addDept() {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the new department?',
                        name: 'deptName',
                    }
                ]).then((res) => {
                    db.query(
                        'INSERT INTO departments (dept_name) VALUES (?)',
                        [res.deptName],
                        (err, res) => {
                            console.log('Approved! Added the department to the database.')
                        })
                }
            }

                  /*          const [] = await prompt([
                    {
                        type: 'input',
                        message: 'What is the title of the new Department?',
                        name: 'deptTitle',
                    },
                ])
                
                // const [departments] = await connection.execute('INSERT INTO departments (dept_name) VALUES (kitchen));'

                console.table(departments);

                //THEN I am prompted to enter the name of the department and that department is added to the database
            }


            //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
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
                        name: 'roleDept',
                        choices: [
                            "IT",
                            "Sales",
                            "Accounting",
                            "Management",
                            "HR"
                        ]
                    }
                ])

                const { roleTitle, roleSalary, roleDept } = await connection.execute('INSERT INTO roles ("title", "salary", "department");', []);
                console.log("The role has been added to database");
                console.table(roles);
            }

            if (answers.action === "Add an Employee") {
                const [employees] = await connection.execute('SELECT * FROM employees;', []);
                console.table(employees);
                //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
            }

            if (answers.action === "Update an Employee Role") {
                const [employees] = await connection.execute('SELECT * FROM employees;', []);
                console.table(employees);
                //THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
            }

           

            }
            
        }
    }

*/

