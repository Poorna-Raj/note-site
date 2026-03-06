# Functions

> Function is a stored program unit that performs a task and always returns a value.

The main difference from a procedure is:

- Procedure → performs an action
- Function → performs an action and returns a value

Syntax:

```txt
CREATE OR REPLACE FUNCTION function_name(
    parameters [model] datatype
)
RETURN datatype
IS | AS
BEGIN
    -- logic
    RETURN value;
END;
```

Example:

```sql
CREATE OR REPLACE FUNCTION fn_get_sal(
    p_id IN employees.employee_id%TYPE
)
RETURN NUMBER
IS
    v_sal employees.salary%TYPE;
BEGIN
    SELECT salary
    INTO v_sal
    FROM employees
    WHERE employees.employee_id = p_id;

    RETURN v_sal;
END;
/
```

## Executing Functions

```sql
VARIABLE g_sal NUMBER;

EXECUTE :g_sal := fn_get_sal(2);

PRINT g_sal;
```

```sql
SELECT employee_id,first_name,fn_get_sal(employee_id)
FROM employees
WHERE department_id = 1;
```
