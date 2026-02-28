# Writing Executable Statements

## Lexical Units in a PL/SQL Block

- Lexical units are the building blocks of any PL/SQL block.
- They are sequence of characters which can be classified into,
  - Identifiers: `v_name`, `v_email`
  - [Delimiters](#delimiters): `+`, `:=`
  - Literals: `Tom`, `1270`, `True`
  - Comments: `--`, `/* */`

### Delimiters

> Delimiters are simple or compound symbols that have special meaning in PL/SQL.

1. **Simple Symbols**

| Symbol | Meaning                       |
| :----: | ----------------------------- |
|  `+`   | Addition operator             |
|  `-`   | Subtraction/negation operator |
|  `*`   | Multiplication operator       |
|  `/`   | Division operator             |
|  `=`   | Equality operator             |
|  `@`   | Remote access indicator       |
|  `;`   | Statement terminator          |

2. **Compound Symbols**

| Symbol | Meaning                       |
| :----: | ----------------------------- |
|  `<>`  | Inequality operator           |
| `! =`  | Inequality operator           |
| `\|\|` | Concatenation operator        |
|  `--`  | Single-line comment indicator |
|  `/*`  | Beginning comment delimiter   |
|  `*/`  | Ending comment delimiter      |
|  `:=`  | Assignment operator           |

## SQL Functions in PL/SQL

- There are predefined functions available in PL/SQL such as
  - Single-row functions
  - Data type conversion functions
  - Character functions
- But there are functions like group function which are available in SQL statements can be used only in SQL statements.

> Example: Get length of a string

```sql
SET SERVEROUTPUT ON;
DECLARE
v_decs_size INTEGER(5);
v_prod_description VARCHAR2(30) := 'You can yse this product';

BEGIN
    v_decs_size := LENGTH(v_prod_description);
    dbms_output.put_line(v_decs_size);
END;
/
```

> Example: Get the number of months an employee worked

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_hire_date DATE := '01-JAN-2021';
    v_tenure NUMBER;
BEGIN
    v_tenure := MONTHS_BETWEEN(CURRENT_DATE, v_hire_date);
    dbms_output.put_line('Months worked = ' || trunc(v_tenure,2));
END;
/
```

## Data Type Conversion

### Implicit Conversions

- These are conversions done by the PL/SQL engine, in situations where there are mixed data types in a statement.

Example:

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_salary NUMBER(6) := 6000;
    v_sal_bonus VARCHAR2(5) := '1000';
    v_sal_total v_salary%TYPE;
BEGIN
    v_sal_total := v_salary + v_sal_bonus;
    dbms_output.put_line('Total = Rs. ' || v_sal_total);
END;
/
```

When executing this block the engine automatically convert the `v_sal_bonus` into a `NUMBER(6)` data type in order to perform the operation of `v_sal_total := v_salary + v_sal_bonus`.

---

### Explicit Conversions

- These are the conversions done manually by the user to convert one data type into another.
- The PL/SQL provides functions to perform these operations such as,
  - `TO_DATE` - Char value to Date
  - `TO_NUMBER` - Char value to Number

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_date_str VARCHAR(20) := '2025-01-25';
    v_num_str VARCHAR(20) := '7500';
    v_date DATE;
    v_num NUMBER;
BEGIN
    v_date := TO_DATE(v_date_str,'YYYY-MM-DD');
    v_num := TO_NUMBER(v_num_str);

    dbms_output.put_line('Date as date: ' || v_date);
    dbms_output.put_line('Number as number: ' || v_num);
END;
/
```

Output:

```txt
PL/SQL procedure successfully completed.

Date as date: 25-JAN-25
Number as number: 7500
```

## Nested Blocks and Variable Scope

- PL/SQL blocks can be nested whenever an executable statement is allowed.
- An exception section can contain nested blocks.

![image of the plsql variable scope](assets/variable_scope.png)

## SQL Statements in PL/SQL

- The usual SQL statements can be executed in the statement section.

### SELECT Statements in PL/SQL

- The `INTO` clause is required.
- Queries must return only one row.

```sql
SET SERVEROUTPUT ON;
DECLARE
    v_fname VARCHAR2(25);
BEGIN
    SELECT name INTO v_fname
    FROM employees WHERE employee_id = 178;
    dbms_output.put_line('First name is: ' || v_fname);
END;
/
```
