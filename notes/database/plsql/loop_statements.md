# Loop Statements

- Repeat a statement (or a sequence of statements) multiple times.
- There are 3 types of loops,
  - Basic loop
  - WHILE loop
  - FOR loop

## Basic Loop

- Encloses a sequence of statements in between the `LOOP` and `END LOOP` statements.

Syntax:

```txt
LOOP
    <statements>
END LOOP;
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_num NUMBER := 10;
BEGIN
    LOOP
        dbms_output.put_line(v_num);
        v_num := v_num + 10;

        IF v_num > 50 THEN
            EXIT;
        END IF;
    END LOOP;

    dbms_output.put_line('After exit num: ' || v_num);
END;
/
```

Also can use the `EXIT WHEN` statement to `EXIT`,

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_num NUMBER := 10;
BEGIN
    LOOP
        dbms_output.put_line(v_num);
        v_num := v_num + 10;

        EXIT WHEN v_num > 50;
    END LOOP;

    dbms_output.put_line('After exit num: ' || v_num);
END;
/
```

## `WHILE` Loop

- Get repeatedly executed till the given condition fails.

Syntax:

```txt
WHILE <condition> LOOP
    <statements>
END LOOP;
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_num NUMBER := 10;
BEGIN
    WHILE v_num > 0 LOOP
        dbms_output.put_line(v_num);
        v_num := v_num - 1;
    END LOOP;

    dbms_output.put_line('After exit num: ' || v_num);
END;
/
```

## `FOR` Loop

- Used to execute a sequence of statement for a specific number of times.

Syntax:

```txt
FOR <counter> IN <initials_value> .. <final_value> LOOP
    <statements>
END LOOP;
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_num NUMBER;
BEGIN
    FOR v_num IN 0 .. 10 LOOP
        dbms_output.put_line(v_num);
    END LOOP;
END;
/
```

Note: The initial and final value are included.

> Reverse FOR LOOP Statements

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_num NUMBER;
BEGIN
    FOR v_num IN REVERSE 0 .. 10 LOOP
        dbms_output.put_line(v_num);
    END LOOP;
END;
/
```

> Question: Write a program containing a loop that iterates from 1 to 1000. The program should output the value of every hundred iterations (i.e., the output should be 100, 200, etc). Display the output on the scree

```sql
SET SERVEROUTPUT ON;

DECLARE
    v_num NUMBER;
BEGIN
    FOR v_num IN 1 .. 1000 LOOP
        IF MOD(v_num,100) = 0 THEN
            dbms_output.put_line(v_num);
        END IF;
    END LOOP;
END;
/
```

## Labeling a PL/SQL Loop

- Labels should appear at the start and the end of the loop.
- Can use to exit and `goto` statements using the loop label.

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    i NUMBER;
    j NUMBER;
BEGIN
    <<outer_loop>>
    FOR i IN 1..3 LOOP
        <<inner_loop>>
        FOR j IN 1..3 LOOP
            dbms_output.put_line('*');
        END LOOP inner_loop;
    END LOOP outer_loop;
END;
/
```

## Continue Statement

- Same functionality compared to a `CONTINUE` statement.

Syntax:

```sql
CONTINUE;
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    a number(2) := 10;
BEGIN
    WHILE a<20 LOOP
        a := a + 1;
        IF a = 12 THEN
            CONTINUE;
        END IF;
        dbms_output.put_line(a);
    END LOOP;
END;
/
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    a NUMBER;
BEGIN
    FOR a IN 0..10 LOOP
        CONTINUE WHEN a = 8;
        dbms_output.put_line(a);
    END LOOP;
END;
/
```

## `GOTO` Statements

- Provide an unconditional jump from the GOTO to a labeled statement.

Syntax:

```txt

GOTO <label>;
..
..
<<label>>
<statement>;
```

Example:

```sql
SET SERVEROUTPUT ON;

DECLARE
    a NUMBER(2) := 10;
BEGIN
    <<loop_start>>
    WHILE a < 20 LOOP
        dbms_output.put_line(a);
        a := a + 1;

        IF a = 15 THEN
            a := a + 1;
            GOTO loop_start;
        END IF;
    END LOOP;
END;
/
```
