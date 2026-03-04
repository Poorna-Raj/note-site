# Cursors

Every SQL statement that is executed by the Oracle Server has an associated individual cursor,

- Implicit Cursors: Declared and managed by PL/SQL for all DML and PL/SQL `SELECT` statements.
- Explicit Cursors: Declared and managed by the programmer.

Syntax:

```txt
CURSOR <cursor_name> IS
    <select statement>;
```

Example:

```sql
DECLARE c_emp_cursor IS
    SELECT employee_id, last_name
    FROM employees
    WHERE department_id = 1;
```

## Opening the Cursor

- The `OPEN` statement executes the query associated with the cursor.

```sql
DECLARE c_emp_cursor IS
    SELECT employee_id, last_name
    FROM employees
    WHERE department_id = 1;
BEGIN
    OPEN c_emp_cursor;
END;
/
```

## Fetching Data from a Cursor

- The `FETCH` statement retrieves the rows from the cursor **one at a time**.
- After each `FETCH` the cursor pointer moves to the next row.

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp_cursor IS
    SELECT employee_id, last_name
    FROM employees
    WHERE department_id = 2;

    v_empno employees.employee_id%TYPE;
    v_lname employees.last_name%TYPE;
BEGIN
    OPEN c_emp_cursor;
    LOOP
        FETCH c_emp_cursor INTO v_empno, v_lname;
        EXIT WHEN c_emp_cursor%NOTFOUND;
        dbms_output.put_line(v_empno || ' ' || v_lname);
    END LOOP;
END;
/
```

## Closing the Cursor

- The `CLOSE` statement disables the cursor and releases the context area.

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp_cursor IS
    SELECT employee_id, last_name
    FROM employees
    WHERE department_id = 2;

    v_empno employees.employee_id%TYPE;
    v_lname employees.last_name%TYPE;
BEGIN
    OPEN c_emp_cursor;
    LOOP
        FETCH c_emp_cursor INTO v_empno, v_lname;
        EXIT WHEN c_emp_cursor%NOTFOUND;
        dbms_output.put_line(v_empno || ' ' || v_lname);
    END LOOP;
    CLOSE c_emp_cursor;
END;
/
```

## Explicit Cursor Attributes

| Attributes  | Type    | Description                                  |
| ----------- | ------- | -------------------------------------------- |
| `%ISOPEN`   | Boolean | Get `TRUE` if the cursor is open             |
| `%NOTFOUND` | Boolean | Get `TRUE` if most recent fetch returns null |
| `%FOUND`    | Boolean | Complement of `%NOTFOUND`                    |
| `%ROWCOUNT` | Number  | Get the total number of rows returned so far |

### `%ISOPEN` attributes

- Use this attribute as a validator before fetching.

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp_cursor IS
    SELECT employee_id, last_name
    FROM employees
    WHERE department_id = 2;

    v_empno employees.employee_id%TYPE;
    v_lname employees.last_name%TYPE;
BEGIN
    IF NOT c_emp_cursor%ISOPEN THEN
        OPEN c_emp_cursor;
    END IF;
    LOOP
        FETCH c_emp_cursor INTO v_empno, v_lname;
        EXIT WHEN c_emp_cursor%NOTFOUND;
        dbms_output.put_line(v_empno || ' ' || v_lname);
    END LOOP;
END;
/
```

---

### `%ROWCOUNT` and `%NOTFOUND` attributes

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp_cursor IS
    SELECT employee_id, last_name
    FROM employees;

    v_emp_record c_emp_cursor%ROWTYPE;
BEGIN
    IF NOT c_emp_cursor%ISOPEN THEN
        OPEN c_emp_cursor;
    END IF;
    LOOP
        FETCH c_emp_cursor INTO v_emp_record;
        EXIT WHEN c_emp_cursor%NOTFOUND OR c_emp_cursor%ROWCOUNT > 10;
        dbms_output.put_line(v_emp_record.employee_id || ' ' || v_emp_record.last_name);
    END LOOP;
END;
/
```

---

## Cursor `FOR LOOP`

Syntax:

```txt
FOR <record_name> IN <cursor_name> LOOP
    <statements>
END LOOP;
```

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp_cursor IS
    SELECT last_name, department_id
    FROM employees;
BEGIN
    FOR emp_record IN c_emp_cursor LOOP
        IF emp_record.department_id = 1 THEN
            dbms_output.put_line('Employee last name: ' || emp_record.last_name || ' department id: ' || emp_record.department_id);
        END IF;
    END LOOP;
END;
/
```

- The `OPEN`,`FETCH` and `CLOSE` are automatically executed.

### Cursor FOR LOOP using Subqueries

- This method doesn't require a cursor.

Example:

```sql
SET SERVEROUTPUT ON;

BEGIN
    FOR emp_record IN (
        SELECT last_name,department_id
        FROM employees
    ) LOOP
        IF emp_record.department_id = 1 THEN
            dbms_output.put_line('last name: ' || emp_record.last_name || ' department id: ' || emp_record.department_id);
        END IF;
    END LOOP;
END;
/
```

## Cursor with Parameters

- Use parameter values to be passed to a cursor for executions when the cursor get OPENED and query get executed.

Syntax:

```txt
CURSOR <cursor_name> [(<parameter_name> <datatype>, ...)] IS
    <select_statement>;
```

```txt
OPEN <cursor_name> (<parameter_value>, ...)
```

> Example: Pass the department number and job title to the WHERE clause, in the cursor SELECT statement.

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_emp(p_deptno NUMBER, p_job VARCHAR2) IS
        SELECT employee_id,last_name
        FROM employees
        WHERE department_id = p_deptno AND job_title = p_job;
BEGIN
    dbms_output.put_line('Software Engineers');
    FOR emp_record IN c_emp(1,'Software Engineer') LOOP
        dbms_output.put_line('employee id: ' || emp_record.employee_id || ' last_name: ' || emp_record.last_name);
    END LOOP;
    dbms_output.put_line('Accountant');
    FOR emp_record IN c_emp(3,'Accountant') LOOP
        dbms_output.put_line('employee id: ' || emp_record.employee_id || ' last_name: ' || emp_record.last_name);
    END LOOP;
END;
/
```

### The FOR UPDATE Clause

Syntax:

```txt
SELECT ...
FROM
FOR UPDATE [OF <columns_reference>] [NOWAIT];
```

- Use explicit locking to deny access for the duration of a transaction.
- Lock the rows before the update or delete.
- This is used to lock a column for editing till it's done. That way other users won't be able update the references columns for the entire result set returned by the cursor till the cursor get closed. The `NOWAT` use to tell oracle to throw an error if there is another cursor locking a resource before us.

```sql
DECLARE
    CURSOR c_emp_cursor IS
        SELECT employee_id, last_name, department_name, salary
        FROM employees, departments
        WHERE employees.department_id = departments.department_id
        AND employees.department_id = 3
```

---

### The WHERE CURRENT OF Clause

Syntax:

```txt
WHERE CURRENT OF <cursor_name>;
```

- Use cursor to update or delete the current row.

```sql
SET SERVEROUTPUT ON;

DECLARE
    CURSOR c_sal IS
        SELECT e.department_id, employee_id, last_name, salary
        FROM employees e, departments d
        WHERE d.department_id = e.department_id
        AND d.department_id = 2
        FOR UPDATE OF salary NOWAIT;
BEGIN
    FOR emp_record IN c_sal LOOP
        IF emp_record.salary < 5000 THEN
            UPDATE employees
            SET salary = emp_record.salary * 1.10
            WHERE CURRENT OF c_sal_cursor;
        END IF;
    END LOOP;
END;
/
```
