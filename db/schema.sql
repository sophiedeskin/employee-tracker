DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
  employee_id INTEGER,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id VARCHAR(30) NOT NULL
);

CREATE TABLE department (
    department_name VARCHAR(30) NOT NULL,
    department_id INTEGER
);

CREATE TABLE role (
    role_id INTEGER,
    title VARCHAR(30) NOT NULL,
    salary INTEGER,
    department_id INTEGER
);
