# Exception Handling

## Types of Exceptions

1. Predefined Oracle Server Error
2. Non-predefined Oracle Server Error
3. User-defined Error

### Predefined Exceptions

- Common errors that are already defined.
- No need of declaration and let the oracle server raise them implicitly.

| Exception           | Error Number | Description                                                           |
| ------------------- | ------------ | --------------------------------------------------------------------- |
| DUP_VAL_ON_INDEX    | ORA-00001    | Attempted to insert a duplicate value                                 |
| NO_DATA_FOUND       | ORA-01403    | Single row SELECT returned null                                       |
| TOO_MANY_ROWS       | ORA-01422    | Single-row SELECT returns multiple rows                               |
| INVALID_NUMBER      | ORA-01722    | Char to string failure                                                |
| CURSOR_ALREADY_OPEN | ORA-06511    | Attempted to open an already open cursor                              |
| ZERO_DIVIDE         | ORA-01476    | Attempt to divide by zero                                             |
| VALUE_ERROR         | ORA-06502    | Arithmetic, conversion, truncation, or size-constraint error occurred |

Example:

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_lname VARCHAR2(15);
BEGIN
    SELECT last_name INTO v_lname
    FROM employees
    WHERE job_title = 'Software Engineer';

    dbms_output.put_line('Software Engineer: ' || v_lname);
EXCEPTION
    WHEN TOO_MANY_ROWS THEN
        dbms_output.put_line('Multiple Records');
END;
/
```

---

### Non-predefined Exception

- Other standard oracle errors.
- Declare and let oracle to raise them implicitly.

Example:

```sql
SET SERVEROUTPUT ON;

DEFINE p_deptno = 1;

DECLARE
    e_emp_exp EXCEPTION;
    PRAGMA EXCEPTION_INIT(e_emp_exp,-2292);
BEGIN
    DELETE FROM departments
    WHERE department_id = &p_deptno;

    COMMIT;
EXCEPTION
    WHEN e_emp_exp THEN
        dbms_output.put_line('Cannot delete');
END;
/
```

---

### User-defined Exception

- Declare and raise then explicitly.

```sql
SET SERVEROUTPUT ON;

DEFINE p_deptname = 'HR';
DEFINE P_deptno = 10;

DECLARE
    e_invalid_dept EXCEPTION;
BEGIN
    UPDATE departments
    SET department_name = '&p_deptname'
    WHERE department_id = '&p_deptno';

    IF SQL%NOTFOUND THEN
        RAISE e_invalid_dept;
    END IF;

    COMMIT;
EXCEPTION
    WHEN e_invalid_dept THEN
        DBMS_OUTPUT.PUT_LINE('No such department');
END;
/
```
