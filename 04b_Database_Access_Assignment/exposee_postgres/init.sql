DROP TABLE IF EXISTS employees, cities, positions, departments, countries CASCADE;

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE positions (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country_id INT REFERENCES countries(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC(10, 2),
    position_id INT REFERENCES positions(id),
    department_id INT REFERENCES departments(id)
);

INSERT INTO countries (name) VALUES
('Denmark'),
('Sweden'),
('Germany'),
('France');

INSERT INTO departments (name) VALUES
('Finance'),
('Engineering'),
('Marketing');

INSERT INTO positions (name) VALUES
('Software Engineer'),
('Financial Analyst'),
('Marketing Specialist'),
('Salary Manager');

INSERT INTO employees (name, salary, position_id, department_id) VALUES
('Alice Johnson',   75000, 1, 2),
('Bob Smith',       60000, 2, 1),
('Charlie Brown',   70000, 3, 3),
('David Wilson',    85000, 1, 2),
('Eva Adams',       55000, 2, 1),
('Frank White',     65000, 3, 3),
('Grace Lee',       90000, 1, 2),
('Henry Clark',     72000, 2, 1),
('Isabella Harris', 80000, 3, 3),
('James Martinez',  67000, 4, 1);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE USER bob_viewer WITH PASSWORD 'password';
CREATE POLICY bob_access
ON employees
FOR SELECT
TO bob_viewer
USING (id = 2);
GRANT SELECT ON employees TO bob_viewer;


CREATE USER bob_salary_viewer WITH PASSWORD 'password';
GRANT SELECT (salary) ON employees TO bob_salary_viewer;
CREATE POLICY bob_salary_access
ON employees
FOR SELECT
TO bob_salary_viewer
USING (id = 2);


CREATE USER salary_viewer WITH PASSWORD 'password';
GRANT SELECT (salary) ON employees TO salary_viewer;
CREATE POLICY salary_view_policy
ON employees
FOR SELECT
TO salary_viewer
USING (true);