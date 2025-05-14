-- Create database
CREATE DATABASE IF NOT EXISTS db;
USE db;

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create job_titles table
CREATE TABLE IF NOT EXISTS job_titles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department_id INT,
    job_title_id INT,
    hire_date DATE,
    salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (job_title_id) REFERENCES job_titles(id) ON DELETE SET NULL
);

INSERT INTO departments (name) VALUES
('Engineering'),
('Human Resources'),
('Sales'),
('Marketing');

INSERT INTO job_titles (title) VALUES
('Software Engineer'),
('Product Manager'),
('HR Specialist'),
('Sales Associate'),
('Marketing Director');

INSERT INTO employees (first_name, last_name, email, department_id, job_title_id, hire_date, salary) VALUES
('John', 'Doe', 'john.doe@example.com', 1, 1, '2015-06-15', 60000.00),
('Jane', 'Smith', 'jane.smith@example.com', 2, 2, '2017-02-20', 75000.00),
('Alice', 'Johnson', 'alice.johnson@example.com', 1, 1, '2019-08-10', 80000.00),
('Bob', 'Brown', 'bob.brown@example.com', 2, 3, '2018-11-01', 55000.00),
('Eve', 'White', 'eve.white@example.com', 4, 5, '2016-03-25', 95000.00),
('Charlie', 'Green', 'charlie.green@example.com', 3, 4, '2020-01-30', 50000.00);


