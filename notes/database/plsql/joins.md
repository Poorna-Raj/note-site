# Joins in Oracle

- Used to retrieve data from multiple tables.
- Perform when 2 or more tables are joined in a SQL statement.

## Tables Used

### 1. Employee Table

| Employee ID | First Name | Last Name   | Email                                                           | Phone      | Hire Date  | Job Title         | Dept ID | Salary | Manager ID | Status   |
| ----------: | ---------- | ----------- | --------------------------------------------------------------- | ---------- | ---------- | ----------------- | ------- | ------ | ---------- | -------- |
|           1 | Nimal      | Perera      | [nimal.perera@company.com](mailto:nimal.perera@company.com)     | 0771234567 | 2021-03-15 | Software Engineer | 1       | 120000 | 19         | ACTIVE   |
|           2 | Kavindi    | Silva       | [kavindi.silva@company.com](mailto:kavindi.silva@company.com)   | 0719876543 | 2022-01-10 | QA Engineer       | 1       | 95000  | 19         | ACTIVE   |
|           3 | Ruwan      | Fernando    | [ruwan.fernando@company.com](mailto:ruwan.fernando@company.com) | 0755555555 | 2020-07-01 | HR Manager        | 2       | 150000 | NULL       | ACTIVE   |
|           4 | Sanduni    | Jayasinghe  | [sanduni.j@company.com](mailto:sanduni.j@company.com)           | 0764444444 | 2023-06-20 | Accountant        | 3       | 110000 | 9          | ACTIVE   |
|           5 | Isuru      | Gunathilake | [isuru.g@company.com](mailto:isuru.g@company.com)               | 0782222222 | 2019-11-05 | IT Support        | 1       | 80000  | 19         | INACTIVE |
|           6 | Chathurika | Dias        | [chathurika.d@company.com](mailto:chathurika.d@company.com)     | 0713333333 | 2021-09-17 | Business Analyst  | 3       | 125000 | 9          | ACTIVE   |
|           7 | Manoj      | Kumara      | [manoj.k@company.com](mailto:manoj.k@company.com)               | 0777777777 | 2022-03-03 | Network Engineer  | 1       | 105000 | 19         | ACTIVE   |
|           8 | Priyanka   | Senanayake  | [priyanka.s@company.com](mailto:priyanka.s@company.com)         | 0758888888 | 2020-12-11 | Recruiter         | 2       | 90000  | 3          | ACTIVE   |
|           9 | Thilina    | Ranatunga   | [thilina.r@company.com](mailto:thilina.r@company.com)           | 0761111111 | 2019-08-25 | Finance Manager   | 3       | 160000 | NULL       | ACTIVE   |
|          10 | Samantha   | Wijesinghe  | [samantha.w@company.com](mailto:samantha.w@company.com)         | 0712222222 | 2023-01-15 | Software Engineer | 1       | 115000 | 19         | ACTIVE   |
|          11 | Poorna     | R           | [poorna.r@company.com](mailto:poorna.r@company.com)             | 0721234567 | 2021-03-16 | Software Engineer | null    | 120000 | 19         | ACTIVE   |

---

### 2. Department Table

| Department ID | Department Name | Manager ID |
| ------------- | --------------- | ---------- |
| 1             | IT              | 19         |
| 2             | HR              | 3          |
| 3             | Finance         | 9          |
| 4             | Management      | 20         |

## Types of Joins

### 1. INNER JOIN

- Called simple join.
- Display all the records that have matched.

> Get the first name, jon title, salary and the department name from the employee and department tables based on employee.department_id

```sql
SELECT em.first_name,em.job_title,em.salary,dm.department_name
FROM employees em
INNER JOIN departments dm
ON em.department_id = dm.department_id;
```

| FIRST_NAME | JOB_TITLE         | SALARY | DEPARTMENT_NAME |
| ---------- | ----------------- | ------ | --------------- |
| Nimal      | Software Engineer | 120000 | IT              |
| Kavindi    | QA Engineer       | 95000  | IT              |
| Ruwan      | HR Manager        | 150000 | HR              |
| Sanduni    | Accountant        | 110000 | Finance         |
| Isuru      | IT Support        | 80000  | IT              |
| Chathurika | Business Analyst  | 125000 | Finance         |
| Manoj      | Network Engineer  | 105000 | IT              |
| Priyanka   | Recruiter         | 90000  | HR              |
| Thilina    | Finance Manager   | 160000 | Finance         |
| Samantha   | Software Engineer | 115000 | IT              |

- Basically, this prints values that are matches and only exists on both tables. Because note that there is a employee called `Poorna` whose doesn't have a department. Due to that reason, that field didn't make into the result.

---

### 2. LEFT OUTER JOIN

- Called left join.
- Returns all the rows from the **LEFT** hand table specified in the **ON** condition and only those rows from the other table where the joined fields are equal.

```sql
SELECT em.first_name,em.job_title,dm.department_name
FROM employees em
LEFT OUTER JOIN departments dm
ON em.department_id = dm.department_id;
```

| FIRST_NAME | JOB_TITLE         | DEPARTMENT_NAME |
| ---------- | ----------------- | --------------- |
| Nimal      | Software Engineer | IT              |
| Kavindi    | QA Engineer       | IT              |
| Isuru      | IT Support        | IT              |
| Manoj      | Network Engineer  | IT              |
| Samantha   | Software Engineer | IT              |
| Ruwan      | HR Manager        | HR              |
| Priyanka   | Recruiter         | HR              |
| Sanduni    | Accountant        | Finance         |
| Chathurika | Business Analyst  | Finance         |
| Thilina    | Finance Manager   | Finance         |
| Poorna     | Software Engineer |                 |

- But in here all the values in the left side table (employees) does get printed even if there aren't on the other table (`Poorna`). But the right hand table fields won't get printed if there is no match to it on the left hand table (`Management`).

---

### 3. RIGHT OUTER JOIN

- Called right join
- Same concept as the `LEFT OUTER JOIN` but inverse.

```sql
SELECT em.first_name,em.job_title,dm.department_name
FROM employees em
RIGHT OUTER JOIN departments dm
ON em.department_id = dm.department_id;
```

| FIRST_NAME | JOB_TITLE         | DEPARTMENT_NAME |
| ---------- | ----------------- | --------------- |
| Nimal      | Software Engineer | IT              |
| Kavindi    | QA Engineer       | IT              |
| Isuru      | IT Support        | IT              |
| Manoj      | Network Engineer  | IT              |
| Samantha   | Software Engineer | IT              |
| Ruwan      | HR Manager        | HR              |
| Priyanka   | Recruiter         | HR              |
| Sanduni    | Accountant        | Finance         |
| Chathurika | Business Analyst  | Finance         |
| Thilina    | Finance Manager   | Finance         |
|            |                   | Management      |

- So in here every filed in the right hand side table (departments) get printed even if there aren't any match for it in the left hand table (`Management`). Also i will ignore the fields in the left side table if there isn't any match for it in the right hand side table (`Poorna`).

---

### 4. FULL OUTER JOIN

- Called full join
- This joint get all the fields whether they got matched or not.

```sql
SELECT em.first_name,em.job_title,dm.department_name
FROM employees em
FULL OUTER JOIN departments dm
ON em.department_id = dm.department_id;
```

| FIRST_NAME | JOB_TITLE         | DEPARTMENT_NAME |
| ---------- | ----------------- | --------------- |
| Nimal      | Software Engineer | IT              |
| Kavindi    | QA Engineer       | IT              |
| Ruwan      | HR Manager        | HR              |
| Sanduni    | Accountant        | Finance         |
| Isuru      | IT Support        | IT              |
| Chathurika | Business Analyst  | Finance         |
| Manoj      | Network Engineer  | IT              |
| Priyanka   | Recruiter         | HR              |
| Thilina    | Finance Manager   | Finance         |
| Samantha   | Software Engineer | IT              |
| Poorna     | Software Engineer |                 |
|            |                   | Management      |
