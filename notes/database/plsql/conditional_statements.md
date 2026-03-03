# Conditional Statements

- Use of `IF` statements and `Loops` to change the logical execution of statements.

- Conditional `IF` statements,
  - IF-THEN-END IF
  - IF-THEN-ELSE-END IF
  - IF-THEN-ELSEIF-END IF

## `IF` Statements

Syntax:

```txt
IF <condition> THEN
    <statement>;
ELSEIF <condition> THEN
    <statement>;
ELSE
    <statement>;
END IF;
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_age NUMBER := 16;
BEGIN
    IF v_age < 18
    THEN
        dbms_output.put_line('Still a child');
    END IF;
END;
/
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_age NUMBER := 31;
BEGIN
    IF v_age < 12 THEN
        dbms_output.put_line('Child');
    ELSIF v_age < 18 THEN
        dbms_output.put_line('Teenage');
    ELSIF v_age < 30 THEN
        dbms_output.put_line('Adult');
    ELSE
        dbms_output.put_line('God');
    END IF;
END;
/
```

## `CASE` Expressions

- Use to select a result and return it.

Syntax:

```txt
CASE <selector>
    WHEN <expression1> THEN <result1>
    WHEN <expression2> THEN <result2>
    WHEN <expression3> THEN <result3>
    ...
    WHEN <expressionN> THEN <resultN>
    [ELSE <resultN+1>]
END;
```

Example:

```sql
SET SERVEROUTPUT ON;
SET VERIFY OFF;

DECLARE
    v_grade CHAR(1) := UPPER('&grade');
    v_appraisal VARCHAR2(20);
BEGIN
    v_appraisal := CASE v_grade
        WHEN 'A' THEN 'Excellent'
        WHEN 'B' THEN 'Very Good'
        WHEN 'C' THEN 'Good'
        ELSE 'Invalid Grade'
    END CASE;

    dbms_output.put_line('Grade: ' || v_grade || 'Apprasial: ' || v_appraisal);
END;
/
```

The `SET VERIFY OFF` is used to not display old and new substitute variable values.

> Question : Set a Boolean flag to TRUE if the hire date is grater than five years. Otherwise, set the Boolean flag to FALSE.Use IF-THEN-ELSE and CASE Statement-Example

```sql
SET SERVEROUTPUT ON;
SET VERIFY OFF;

DECLARE
    v_hire_date DATE := '&startDate';
    v_is_five_years BOOLEAN;
BEGIN
    IF MONTHS_BETWEEN(v_hire_date,CURRENT_DATE) / 12 > 5 THEN
        v_is_five_years := TRUE;
    ELSE
        v_is_five_years := FALSE;
    END IF;

    CASE
        WHEN v_is_five_years THEN
            dbms_output.put_line('More than 5 years');
        WHEN NOT v_is_five_years THEN
            dbms_output.put_line('Less than 5 years');
    END CASE;
END;
/
```
