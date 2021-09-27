const inquirer = require('inquirer');
const connection = require('./routes/server.js'); 
const cTable = require('console.table');

connection.connect((error) => {
    if (error) throw error;
initialQuestions();});
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const initialQuestions = () => {
    inquirer.prompt(
        [
            {
                name: 'choices',
                type: 'list',
                message: 'What would you like to do? (use arrow keys)',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role'
                ]
            }
        ])
        .then((answers) => {
            const {choices} = answers;
            // WHEN I choose to view all departments
            // THEN I am presented with a formatted table showing department names and department ids
            if (choices == "View All Departments") {
                renderAllDepartments();
            }
            // WHEN I choose to view all roles
            // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
            else if (choices == "View All Roles") {
                renderAllRoles();
                // WHEN I choose to view all employees
                // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
            }
            else if (choices == "View All Employees") {
                renderAllEmployees();
            }
            // WHEN I choose to add a department
            // THEN I am prompted to enter the name of the department and that department is added to the database
            else if (choices == "Add Department") {
                addDepartment();
            }
            // WHEN I choose to add a role
            // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
            else if (choices == "Add Role") {
                addRole();
}
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
else if (choices == "Add Employee") {
    addEmployee() 
}
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
else if (choices == "Update Employee Role") {
    updateEmployee();
}
});
};
const renderAllDepartments = () => {
    connection.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        initialQuestions();
      })
};
function renderAllRoles(){
    connection.query(`SELECT role.role_id, role.title, role.salary, department.department_name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.department_id`, function (err, results) {
        console.table(results);
        initialQuestions();
      });
}
function renderAllEmployees(){
    connection.query(
        `SELECT employees.employee_id, 
        employees.first_name, 
        employees.last_name, 
        employees.manager_id,
        role.title, 
        department.department_name AS 'department', 
        role.salary
        FROM employees, role, department 
        WHERE department.department_id = role.department_id 
        AND role.role_id = employees.role_id`,
    
    //     `SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, 
    //  role.title AS role
    //  FROM employees
    //  INNER JOIN role ON employees.role_id = role.role_id`,
     function (err, results) {
        console.table(results);
        initialQuestions();
      });
}
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the departments name?",
        }
    ])
    .then(response => {
        const newDepartment = [response.name] 
        cTable(newDepartment);
        connection.connect(function(err) {
            if (err) throw err;
            var sql = "INSERT INTO department (department_name) VALUES (?)";
            connection.query(sql, response.name, (err, result) => {
              if (err) throw err;
              console.log("Department has been added");
              initialQuestions();
            });
          });
    })}
    const addRole = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the roles name?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the salary for this role?",
            },
            {
                type: 'list',
                name: 'department',
                message: "What is the employee's department?",
                choices: newDepartment
                      
                
            }
        ])
        .then(response => {
      const newRole = [response.name, response.salary, response.department] 
      console.table(newRole);
      connection.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(sql, newRole, (err, result) => {
          if (err) throw err;
          console.table("New role has been added");
           initialQuestions();
        });
      });
    })}
    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
            },
            {
                type: 'input',
                name: 'role',
                message: "What is the employee's role?",
            },
            {
                type: 'input',
                name: 'manager',
                message: "Who is the employees manager?",
            }
        ])
        .then(response => {
            const newEmployee = [response.firstName, response.lastName, response.role, response.manager] 
            console.log(newEmployee);
            connection.connect(function(err) {
                if (err) throw err;
                var sql = "INSERT INTO employees (first_name, last_name, role_id, employee_id) VALUES (?,?,?,?)";
                connection.query(sql, newEmployee, (err, result) => {
                  if (err) throw err;
                  console.table("New employee has been added");
                   initialQuestions();
                });
              });
        })}
        function updateEmployee(){
        }
        
     