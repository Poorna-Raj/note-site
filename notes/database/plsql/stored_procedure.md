# Stored Procedures

- Names PL/SQL blocks which are called **subprograms**.
- Have a similar block structure to an **anonymous block**.

## Difference between Anonymous Blocks and Subprograms

| Anonymous Block                    | Subprograms                 |
| ---------------------------------- | --------------------------- |
| Unnamed PL/SQL blocks              | Named PL/SQL blocks         |
| Compiled every time                | Compiled once               |
| Not stored in the database         | Stored in the database      |
| Cannot invoke by other application | Since named, can be invoked |
| Do not return values               | Can return values           |

## Block Structure for Subprograms

```txt
<header>
IS | AS
    <declaration section>
BEGIN
    <statements>
EXCEPTION
    <exception handling>
END;
```

### Creating a Procedure

```sql
CREATE TABLE dept as SELECT * FROM departments;
CREATE PROCEDURE add_dept IS
    v_dept_id dept.department_id%TYPE;
    v_dept_name dept.department_name%TYPE;
    v_dept_mng dept.manager_id%TYPE;
BEGIN
    v_dept_id := 20;
    v_dept_name := 'Marketing';
    v_dept_mng := 1;

    INSERT INTO dept(department_id,department_name,manager_id)
    VALUES (v_dept_id,v_dept_name,v_dept_mng);
    DBMS_OUTPUT.PUT_LINE('Inserted ' || SQL%ROWCOUNT || ' row');
END;
```

Now let's execute this procedure by,

```sql
EXEC add_dept;
```

## Creating Procedure with Parameters

When creating procedures with parameters in PL/SQL, parameters allow you to pass values into the procedure or get values back from it.

There are three parameter modes:

1. IN
2. OUT
3. IN OUT

Think of it like data flow direction between the program and the procedure.

```txt
Program  →  Procedure
Procedure →  Program
```

### 1. IN Parameter

> An IN parameter is used to pass data into the procedure.

- The procedure receives the value
- The procedure cannot change the original value

```txt
Program  →  Procedure
```

Example:

```sql
CREATE OR REPLACE PROCEDURE sp_raise_salary (
    p_id IN employees.employee_id%TYPE
)
IS
BEGIN
    UPDATE employees
    SET salary = salary * 1.10
    WHERE employee_id = p_id;
END sp_raise_salary;
/
```

```sql
EXEC sp_raise_salary(6);
```

> Inside the procedure you cannot assign a new value:

```sql
p_id := 3;
```

this is invalid. It is more like a **constant parameter**.

---

### 2. OUT Parameter

> An OUT parameter is used to send a value from the procedure back to the caller.

- The procedure assigns the value
- The caller receives the value

```txt
Program  ←  Procedure
```

Example:

```sql
CREATE OR REPLACE PROCEDURE sp_query_emp(
    p_id IN employees.employee_id%TYPE,
    p_name OUT employees.first_name%TYPE,
    p_salary OUT employees.salary%TYPE
)
IS
BEGIN
    SELECT first_name,salary
    INTO p_name,p_salary
    FROM employees
    WHERE employee_id = p_id;
END sp_query_emp;
/
```

Let's execute:

```sql
VARIABLE g_name VARCHAR2(25);
VARIABLE g_sal NUMBER;

EXECUTE sp_query_emp(1,:g_name,:g_sal);

PRINT g_name
PRINT g_sal
```

Output:

```txt
Nimal
120000
```

- The procedure must assign a value to the **OUT parameter**.
- They basically return values as pointers.

---

### 3. IN OUT Parameter

> An IN OUT parameter is used to send a value to the procedure AND return a modified value back.

- It receives a value
- It modifies the value
- It returns the updated value

```txt
Program  →  Procedure  →  Program
```

Example:

```sql
CREATE OR REPLACE PROCEDURE increase_sal(
    p_salary IN OUT NUMBER
)
IS
BEGIN
    p_salary := p_salary * 1.1;
END;
/
```

Let's execute the procedure:

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_salary NUMBER := 5000;
BEGIN
    dbms_output.put_line('Salary before: ' || v_salary);
    increase_sal(v_salary);
    dbms_output.put_line('Salary after: ' || v_salary);
END;
/
```

Note: When calling a stored procedure inside a PL/SQL block doesn't require the `EXECUTE` or `EXEC` keyword.

Output:

```sql
Salary before: 5000
Salary after: 5500
```
