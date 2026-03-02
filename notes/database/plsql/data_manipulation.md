# Data Manipulation

## DML (Data Manipulation Language) Commands

- `INSERT` - Add new rows to the table.
- `UPDATE` - Modifies the existing rows in the table.
- `DELETE` - Removed rows from the table.
- `MERGE` - Select data from one table to insert or update another table. The **decision** on the **update** or **insert** is based on the condition is the **ON** **clause**.

Example:

> Create a table called **Catalog1** and add data

```sql
create table catalog1 (
    id number(3),
    item varchar2(20),
    price number(6)
);

insert into catalog1 values (1,'phone',400);
insert into catalog1 values (2,'radio',100);
insert into catalog1 values (3,'camera',600);
```

| ID  | ITEM   | PRICE |
| --- | ------ | ----- |
| 1   | phone  | 400   |
| 2   | radio  | 100   |
| 3   | camera | 600   |

> Create a table called **Catalog2** and add data

```sql
create table catalog2 (
    id number(3),
    item varchar2(20),
    price number(6)
);

insert into catalog2 values (1,'phone',899);
insert into catalog2 values (2,'radio',200);
insert into catalog2 values (5,'video camera',700);
```

| ID  | ITEM         | PRICE |
| --- | ------------ | ----- |
| 1   | phone        | 899   |
| 2   | radio        | 200   |
| 3   | video camera | 700   |

> Now merge the Catalog1 into Catalog2

```sql
merge into catalog1 s1 using catalog2 s2 on (s1.id = s2.id)
when matched then update set s1.price = s2.price
when not matched then insert (id,item,price) values (s2.id,s2.item,s2.price);
```

Now the data on the table of **Catalog2** will get merged into the table of **Catalog1** in a way where,

- If there is an item with same ID as **Catalog1** the price will get updated
- If there isn't an ID, a new item will get added to the **Catalog1**.

Final Result:

| ID  | ITEM         | PRICE |
| --- | ------------ | ----- |
| 1   | phone        | 899   |
| 2   | radio        | 200   |
| 3   | camera       | 600   |
| 5   | video camera | 700   |

## DDL (Data Definition Language)

DDL commands stand for Data Definition Language commands, which are a subset of SQL (Structured Query Language) used to define, modify, and manage the structure of database objects.

These commands deal with the database schema (layout) itself, rather than the data stored within the tables.

Example:

```sql
CREATE TABLE catalog (
    id number(3),
    item varchar2(20),
    price decimal(8,2)
);
```

### DDL Commands

- `CREATE SCHEMA` -assigns logical location for group of tables
- `CREATE TABLE` -creates table with specified columns
- `CONSTRAINT` -specifies primary key, foreign key or other  
  constraint
- `CREATE VIEW` -creates a view from one or more base tables
- `CREATE SYNONYM` -creates an alternative name for a table or  
  view
- `CREATE INDEX` -creates an index on a table
- `ALTER TABLE` -adds or modifies columns in an existing table
- `DROP TABLE / INDEX / VIEW / SYNONYM` - removes a table, index, view or synonym from the database

## DCL (Data Control Language)

In SQL, DCL commands are a subset of statements used to **control access to data and manage permissions within a database system**.

Example:

```sql
GRANT SELECT ON catalog TO manager;
```

## DML in PL/SQL

### Oracle Sequences

- Sequences are used to generate id's.

> Create a sequence

```sql
CREATE SEQUENCE employees_seq;
```

> Access the next value of the sequence

```sql
SELECT employees_seq.NEXTVAL FROM dual;
```

> Get all the created sequence of **User**

```sql
SELECT * FROM user_sequences;
```

> Remove a sequence

```sql
DROP SEQUENCE employee_seq;
```

---

### Inserting Data

- When inserting data, we need a id. To get an `id` we can use the `sequence` that we made before.

```sql
BEGIN
    INSERT INTO employees (id,first_name,last_name,email,hire_date,job_id,salary)
    VALUES (employees_seq.NEXTVAL,'Ruth','Cores','RCORES',CURRENT_DATE,1,4000);
END;
/
```

---

### Updating Data

Example:

```sql
DECLARE
    sal_increase employees.salary%TYPE := 800;
BEGIN
    UPDATE employees
    SET salary = salary + sal_increase
    WHERE job_id = 1;
END;
/
```

---

### Delete Data

Example:

```sql
BEGIN
    DELETE FROM employees
    WHERE id = 1;
END;
/
```

---

### Create backup tables

It's the best practice to create backup tables when _performing operations_ such as **update and delete**.

```sql
CREATE TABLE employees_temp as (SELECT * FROM employees);
```

## Group Functions

- Group functions operate on set of rows to give one result per group.

### Max Function

- Returns the maximum value of an expression.

```sql
DECLARE
    v_max_salary employees.salary%TYPE;
BEGIN
    SELECT MAX(salary)
    INTO v_max_salary
    FROM employees;

    dbms_output.put_line('The highest salary is: ' || v_max_salary);
END;
/
```

---

### Avg Function

- Return the average value of an expression

```sql
DECLARE
    v_avg_salary employees.salary%TYPE;
BEGIN
    SELECT AVG(salary)
    INTO v_avg_salary
    FROM employees;

    dbms_output.put_line('The average salary is: ' || v_avg_salary);
END;
/
```

---

### Min Function

- Returns the minimum value of an expression.

```sql
DECLARE
    v_min_salary employees.salary%TYPE;
BEGIN
    SELECT MIN(salary)
    INTO v_min_salary
    FROM employees;

    dbms_output.put_line('The min salary is: ' || v_min_salary);
END;
/
```

---

### Sum Function

- Returns the summed value of an expression.

```sql
DECLARE
    v_sum_salary employees.salary%TYPE;
BEGIN
    SELECT SUM(salary)
    INTO v_sum_salary
    FROM employees;

    dbms_output.put_line('The sum salary is: ' || v_sum_salary);
END;
/
```

## Having Clause

- This is used in combination with the **GROUP BY** clause to restrict the groups of returned rows to only those who satisfies the conditions.

Example:

```sql
SELECT job_id, COUNT(employee_id) AS "Number of Employees"
FROM employees
WHERE salary > 4000
GROUP BY job_id
HAVING COUNT(employee_id) > 1;
```

## Subqueries

Syntax:

```txt
SELECT <select_list>
FROM <table>
WHERE <expr_operation>

expr_operation
--------------
(
    SELECT <select_list>
    FROM <table>
)
```

- The inner query (subquery) executes once before the main query (outer query).
- The result of the subquery used by the main query.

> Let's get the last_name and salary of employees whose have a greater salary than John

```sql
SELECT last_name,salary
FROM employees
WHERE salary > (
    SELECT salary
    FROM employees
    WHERE last_name = 'John'
);
```

### Having clause with subqueries

- Since the subqueries get executed first, the server returns the result into the **HAVING** clause of the main query.

```sql
SELECT job_id,MIN(salary)
FROM employees
GROUP BY job_id
HAVING MIN(salary) > (
    SELECT MIN(salary)
    FROM employees
    WHERE jon_id = 'QA'
);
```

## Types of Subqueries

- Single-row Subqueries: Return one row from the inner SELECT statement.
- Multiple-row Subqueries: Return more than one row from the inner SELECT statement.

### Single-row subqueries

Single-row Comparison Operators

| Operator | Meaning               |
| -------- | --------------------- |
| =        | Equal to              |
| >        | Greater than          |
| >=       | Greater than or equal |
| <        | Less than             |
| <=       | Less than or equal    |
| <>       | Not equal to          |

Example:

```sql
SELECT last_name, job_id, salary
FROM employees
WHERE job_id = (
    SELECT job_id
    FROM employees
    WHERE employee_id =141
)
AND salary > (
    SELECT salary
    FROM employees
    WHERE employee_id =143
);
```

---

### Multiple-row subqueries

Multi-row Comparison Operators

| Operator | Meaning                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| IN       | Equal to any member in the list                                                                             |
| ANY      | Compare to any value returned by the subquery Returns TRUE if ANY of the subquery values meet the condition |
| ALL      | Compare to every value returned by the subquery Returns TRUE if ALL the subquery values meet the condition. |

Example: ANY

```sql
SELECT emp_id, last_name, job_id, salary
FROM employees
WHERE salary < ANY (
    SELECT salary
    FROM employees
    WHERE job_id like 'IT%')
AND job_id not like 'IT%';
```

The example displays employees who are not in IT and whose salary is less than that of any IT.
So simply get the `emp_id`, `last_name`, `job_id`, `salary` of employees whose aren't in IT and having a salary lass than the minimum salary in IT.

- `< ANY` means less than the maximum.
- `> ANY` means more than the minimum
- `=ANY` is equivalent to IN

---

Example: ALL

```sql
SELECT emp_id, last_name, job_id, salary
FROM employees
WHERE salary < ALL (
    SELECT salary
    FROM employees
    WHERE job_id like 'IT%'
)
AND job_id < > ‘IT’;
```

This example displays employees whose salary is less than the salary of all employees with a job ID of IT and whose is not IT.

- `>ALL` means more than the maximum
- `<ALL` means less than the minimum
