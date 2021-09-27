DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
  employee_id INTEGER NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  manager_id INTEGER NOT NULL
);

CREATE TABLE department (
    department_name VARCHAR(30) NOT NULL,
    department_id INTEGER PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE role (
    role_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL
);
