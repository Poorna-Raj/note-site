# Introduction

PL/SQL (Procedural Language/Structured Query Language) is the **procedural extension to SQL** with **design features of programming languages**. Data manipulation and query statements of SQL are included within procedural units of code.

---

## Difference between SQL and PL/SQL

### The SQL Approach

> If you want to update a salary, you just run the command:

```sql
UPDATE employees SET salary = salary * 1.1 WHERE employee_id = 101;
```

### The PL/SQL Approach

> If you want to update the salary only if the employee has been there for 5 years, and log an error if the update fails, you need PL/SQL:

```sql
BEGIN
    IF employee_tenure > 5 THEN
        UPDATE employees SET salary = salary * 1.1 WHERE employee_id = 101;
    ELSE
        DBMS_OUTPUT.PUT_LINE('Not eligible for a raise yet.');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An error occurred during the update.');
END;
```

---

## PL/SQL Block Structure

```sql
DECLARE  -- Optional
    -- Variables, Cursors, User-defined exceptions
BEGIN    -- Mandatory
    -- SQL Statements
    -- PL/SQL Statements
EXCEPTION  -- Optional
    -- Action to perform when errors occur
END;     -- Mandatory
```

## Block Types in PL/SQL

### 1. Anonymous

- Doesn't have any name.
- Used for **just execution**, not for storage.

```sql
DECLARE  -- optional

BEGIN
    -- statements
EXCEPTION  -- optional
END;
```

### 2. Procedure

- **Gets stored** as an object in the database.

```sql
PROCEDURE name
IS | AS

BEGIN
    -- statements
EXCEPTION
END;
```

### 3. Function

- Similar to procedures.
- **Gets stored** as an object in the database.
- Must **return a value**.

```sql
FUNCTION name
RETURN -- <data_type>
IS

BEGIN
    -- statements
RETURN -- <value>;
EXCEPTION
END;
```

---

# PL/SQL Syntax

## Printing to Console

### 1. `DBMS_OUTPUT.PUT_LINE`

- Oracle-supplied packaged procedure.
- Must be enabled with: `SET SERVEROUTPUT ON`

```sql
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hello');
END;
```

### 2. `PRINT`

- Only works for **bind variables** declared using `VARIABLE`.

```sql
VARIABLE name VARCHAR2(20);

BEGIN
    :name := 'Poorna';
END;
/
PRINT name;
```

---

## Declaring Variables

Syntax:

```
identifier [CONSTANT] datatype [NOT NULL] [:= | DEFAULT expr];
```

Examples:

```sql
DECLARE
    v_hiredate     DATE;
    v_deptno       NUMBER(2) NOT NULL := 10;
    v_location     VARCHAR2(13) := 'NIBM';
    c_comm CONSTANT NUMBER := 1400;
```

### %TYPE — Based on Column or Variable

```sql
-- Syntax
identifier Table.Column_Name%TYPE;

-- Examples
v_name        Emp.last_name%TYPE;
v_balance     NUMBER(7,2);
v_min_balance v_balance%TYPE := 10;
```

---

## Bind Variables

A **bind variable** is declared in the host environment (outside `BEGIN..END`). Reference them with a colon prefix `:`.

Syntax:

```
VARIABLE variable_name data_type;
```

Example:

```sql
VARIABLE g_salary NUMBER;

BEGIN
    SELECT salary
    INTO   :g_salary
    FROM   employees
    WHERE  employee_id = 178;
END;
/
PRINT g_salary;
```

### Three Kinds of Variables

- **VARIABLE** — SQL*Plus bind variable. Exists *outside* the block; can pass values in/out.
- **DEFINE** — SQL*Plus scripting variable. Acts like a **preprocessor** (text replacement). Can be removed with `UNDEFINE`.
- **DECLARE** — Real PL/SQL variable. Exists *only inside* the block.

```sql
SET SERVEROUTPUT ON;

VARIABLE g_monthly_sal NUMBER;
DEFINE   p_annual_sal = 5000;

DECLARE
    v_sal NUMBER;
BEGIN
    v_sal          := &p_annual_sal;
    :g_monthly_sal := v_sal / 12;

    DBMS_OUTPUT.PUT_LINE(' ');
    DBMS_OUTPUT.PUT_LINE('The monthly salary is ' || TRUNC(:g_monthly_sal, 2));
END;
/
```

---

## Taking User Inputs

Syntax:

```
ACCEPT <identifier> <datatype> PROMPT '<question>';
```

Example:

```sql
SET SERVEROUTPUT ON;

ACCEPT v_age  NUMBER PROMPT 'Enter the Age: ';
ACCEPT v_name CHAR   PROMPT 'Enter the Name: ';

BEGIN
    DBMS_OUTPUT.PUT_LINE('Your Age is '  || &v_age);
    DBMS_OUTPUT.PUT_LINE('Your Name is ' || '&v_name');
END;
/
```

> **Note:** String `ACCEPT`/`DEFINE` variables must be wrapped in single quotes when referenced (`'&v_name'`) because they are plain text substitutions.

---

## Exception Handling

Syntax:

```sql
BEGIN
    -- executable commands;
EXCEPTION
    WHEN exception1 THEN
        -- statement1;
    WHEN exception2 THEN
        -- statement2;
    [WHEN OTHERS THEN]
        -- default exception handling logic
END;
```

### NO_DATA_FOUND Example

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_salary NUMBER;
BEGIN
    SELECT salary INTO v_salary
    FROM   employees
    WHERE  employee_id = 1;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: No employee found.');
END;
/
```

### ZERO_DIVIDE Example

```sql
SET SERVEROUTPUT ON;
DECLARE
    a      INT := 10;
    b      INT := 0;
    answer INT;
BEGIN
    answer := a / b;
    DBMS_OUTPUT.PUT_LINE('Result = ' || answer);
EXCEPTION
    WHEN ZERO_DIVIDE THEN
        DBMS_OUTPUT.PUT_LINE('Error: Cannot divide by zero.');
END;
/
```

---

# Exercises

## Q1 — Hello World Block

> Create an anonymous block to output "My PL/SQL Block Work" to the screen.

```sql
SET SERVEROUTPUT ON;

BEGIN
    DBMS_OUTPUT.PUT_LINE('My PL/SQL Block Work');
END;
/
```

## Q2 — Bind Variable Assignment

> Declare two variables `v_char` and `v_num`. Assign them to host bind variables and print the results.

```sql
VARIABLE g_char VARCHAR2(20);
VARIABLE g_num  NUMBER;

DECLARE
    v_char VARCHAR2(20);
    v_num  NUMBER;
BEGIN
    v_char  := '42 is the answer';
    v_num   := 42;
    :g_char := v_char;
    :g_num  := v_num;
END;
/

PRINT g_char;
PRINT g_num;
```

## Q3 — Salary & Monthly Salary

> Define 2 bind variables for salary and monthly salary. Get the salary from employee with ID 178.

```sql
VARIABLE g_salary        NUMBER;
VARIABLE g_monthlysalary NUMBER;

BEGIN
    SELECT salary, salary * 12
    INTO   :g_salary, :g_monthlysalary
    FROM   employees
    WHERE  employee_id = 178;
END;
/

PRINT g_salary;
PRINT g_monthlysalary;
```
