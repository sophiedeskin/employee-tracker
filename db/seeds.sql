INSERT IGNORE INTO department(department_name, department_id)
VALUES ("Engineering", 1),
       ("Finance", 2),
       ("Legal", 3),
       ("Sales", 4);

INSERT IGNORE INTO employees(employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 1),
       (2, "Mike", "Chan", 2, 2),
       (3, "Ashley", "Rodriguez", 3, 3),
       (4, "Kevin", "Tupic", 4, 4),
       (5, "Kunal", "Singah", 5, 5),
       (6, "Malia", "Brown", 6, 6);

INSERT IGNORE INTO role(role_id, title, salary, department_id)
VALUES (1, "Sales Lead", 50000, 4),
       (2, "FP&A Analyst", 65000, 2),
       (3, "Software Engineer", 80000, 1),
       (4, "Legal Analyst", 76000, 3);