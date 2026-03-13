# User Management

## Creating a New User

Syntax:

```sql
CREATE USER username IDENTIFIED BY password/externally/globally
DEFAULT TABLESPACE tablespace_name TEMPORARY TABLESPACE tablespace_name
QUOTA size/unilimited ON tablespace_name
PROFILE profile_name
PASSWORD expire
ACCOUNT lock/unlock;
```

- The **tablespace** means the place where the created table get stored.
- The **profile** is a predefined template for a set of rules when creating new users to enforce the password complexities, username complexities.
- The **account** acts as an guard for the account.

Example:

```sql
CREATE USER TESTUSER1 IDENTIFIED BY us1
DEFAULT TABLESPACE users TEMPORARY TABLESPACE temp
QUOTA 20M ON users
ACCOUNT UNLOCK;
```

> We can also use the oracle default settings to create a user

```sql
CREATE USER user1 IDENTIFIED BY use1;
```

Then, we can modify the password by,

```sql
ALTER USER user1 IDENTIFIED BY --<new password>;
```

But even after we create an user, that user still can't create a connection with the database. To do that we need to give the `CREATE SESSION`.

```sql
GRANT CREATE SESSION TO user1;
```

Now the user can make a connection with the database but still have no privileges to perform any operations. Therefore, we should grant privileges,

```sql
GRANT ALL PRIVILEGES TO user1;
```

This provides admin privileges to the user. But in order to limit the privileges we can grant them selectively.

> Grant SELECT to user for table Customer

```sql
GRANT SELECT ON CUSTOMER TO user1;
```

> Grant all privileges on Customer table to the user

```sql
GRANT ALL PRIVILEGES ON CUSTOMER TO user1;
```
