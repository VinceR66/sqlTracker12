
INSERT INTO `departments` (name) 
VALUES ('IT'), 
('SALES'),
('ACCOUNTING'),
('MANAGEMENT'),
('HR');


INSERT INTO `roles` (title, salary, departments_id) 
VALUES ('SOFTWARE ENGINEER', 65000, 1), 
('SALESPERSON', 70000, 2),
('ACCOUNTANT', 75000, 3),
('GENERAL MANAGER', 65000, 4),
('MARKETING', 50000, 2),
('DIRECTOR', 95000, 4),
('DATA ENTRY', 35000, 1),
('HUMAN RESOURCE ADMIN', 35000, 5),
('HUMAN RESOURCE OFFICER', 60000, 5);

INSERT INTO `managers` (first_name, last_name)
VALUES ('Sparky', 'Anderson'),
('Billy',' Martin'), 
('Tommy', 'Lasorda'),
('Whitey', 'Herzog'),
('Bobby', 'Cox');

INSERT INTO `employees` (first_name, last_name, roles_id, manager_id)
Values ();