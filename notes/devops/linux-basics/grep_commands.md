# Linux Grep Commands

- GREP stands for Global Regular Expression Print.
- It's a command line utility in Linux used to search for patterns in text using regular expression and prints the matching line.

## Searching for Text Patterns

### Considering the case sensitivity

> Let's try to find a pattern in a text file

Syntax:

```txt
grep <"pattern"> <file.extension>
```

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
AWS is important
This is a sample text file
This file is used to test grep commands
This is the linux server hosted in AWS
aws is a really good platform
Aws is very easy to use
```

> Now let's get the line with AWS

```bash
[ec2-user@ip-172-31-34-101 documents]$ grep "AWS" aws.txt
AWS is important
This is the linux server hosted in AWS
```

Even if there are more lines which contains the word `AWS`, the output only shows 2 lines. That because the **GREP** command is case sensitive.

---

### Ignoring the Case Sensitivity

Syntax:

```
grep -i <"pattern"> <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ grep -i "AWS" aws.txt
AWS is important
This is the linux server hosted in AWS
aws is a really good platform
Aws is very easy to use
```

Now it shows all the line that contains the word `AWS` without considering the case sensitivity.

## Inverse of the Finding Text Patterns

### Considering the case sensitivity

- This way we can get all line that doesn't contains a specific word.

Syntax:

```txt
grep -v <"pattern"> <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ grep -v "AWS" aws.txt
This is a sample text file
This file is used to test grep commands
aws is a really good platform
Aws is very easy to use
```

---

### Ignoring the case sensitivity

Syntax:

```txt
grep -v -i <"pattern"> <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ grep -v -i "AWS" aws.txt
This is a sample text file
This file is used to test grep commands
```

## Take the Count of the Text Pattern

### Considering the case sensitivity

- This way we can get the count of occurrence in a specific text pattern.

Syntax:

```txt
grep -c <"pattern"> <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ grep -c "AWS" aws.txt
2
```

---

### Ignoring the case sensitivity

Syntax:

```txt
grep -c -i <"pattern"> <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ grep -c -i "AWS" aws.txt
4
```
