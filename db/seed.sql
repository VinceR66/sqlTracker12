
INSERT INTO departments (dept_name) 
VALUES ("IT"), 
("SALES"),
("ACCOUNTING"),
("MANAGEMENT"),
("HR");


INSERT INTO roles (title, salary, dept_id) 
VALUES ("SOFTWARE ENGINEER", 65000, 1), 
("SALESPERSON", 70000, 2),
("ACCOUNTANT", 75000, 3),
("GENERAL MANAGER", 65000, 4),
("MARKETING", 50000, 2),
("DIRECTOR", 95000, 4),
("DATA ENTRY", 35000, 1),
("HUMAN RESOURCE ADMIN", 35000, 5),
("HUMAN RESOURCE OFFICER", 60000, 5);


INSERT INTO employees (first_name, last_name, roles_id, managers_id)
VALUES ("Bobby", "Cox", 6, NULL);
("Sparky", "Anderson", 4, 1),
("Billy", "Martin", 4, 1), 
("Tommy", "Lasorda", 4, 1),
("Whitey", "Herzog", 4, 1),

("Nolan", "Ryan", 1, 5),
("Bart", "Starr", 1, 5),
("George", "Brett", 8, 4),
("Duke", "Ellington", 5, 2),
("Otis", "Redding", 2, 2),
("Larry", "Ellison", 2, 2),
("Kim", "Basinger", 3, 3),
("Dona", "Speir", 9, 4),
("Kelly", "Lebrock", 7, 5),
("Whitney", "Houston", 3, 3),
