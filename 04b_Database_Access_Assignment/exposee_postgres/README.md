## Setup PostgreSQL
### Prerequisites:
- Docker installed on your machine
### Build, run and connect:

1. Get the image from DockerHub:

`$ docker pull wulff741/db:latest`

2. Run the container:

`$ docker run -d --name postgres -p 5432:5432 wulff741/db`

3. Enter the database:

`$ docker exec -it postgres psql -U user -d db`

You are now inside the database as a superuser. To access the database as any other user, you have to `$ exit` the database and login again with another username

##

The database comes with preconfigured users and row-level security policies to have limited data access for some users
These are the users:

|Username|Password|Permissions|Example query|
|-|-|-|-|
|user|password|Superuser with full access|`$ select * from employees;`
|bob_salary_viewer|password|Can only view Bob's salary (Bob's an employee)|`$ select salary from employees;`
|salary_viewer|password|Can view all salaries but has no access to other cells|`$ select salary from employees;`
|bob_viewer|password|Can only view row level of employee Bob|`$ select * from employee;`

This database is primary focused on the employees table, as it is here our limited data access is presented. Thus, the database contains two other tables - departments, countries, cities and positions.
The schema can be found here:
[Diagram](https://dbdocs.io/Mathias%20Wulff%20Nielsen/Database_Access_Assignment)