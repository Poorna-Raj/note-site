# SED Commands (Stream Editor)

- SED stands for Stream Editor.
- Used to process and transform text data in linux.
- Functions of SED,
  - Substitute Text
  - Delete Lines
  - Insert New Content
  - Modify Data
- The most important thing about SED is **it works without opening the file in a editor**.
- SED reads the file line by line, applies the commands and output the result.

## Find and Replace

Syntax:

```txt
sed 's/<find text>/<replace text>/' <file.extension>
```

Example:

> Let's see what's already inside the text file

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
AWS is important
This is a sample text file
This file is used to test grep commands
This is the linux server hosted in AWS
aws is a really good platform
Aws is very easy to use
```

> Now let's change the word AWS to Amazon Web Services

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed 's/AWS/Amazon Web Services/' aws.txt
Amazon Web Services is important
This is a sample text file
This file is used to test grep commands
This is the linux server hosted in Amazon Web Services
aws is a really good platform
Aws is very easy to use
```

Note: The command is case sensitive at this stage and won't get saved to the original file. In order to save the file,

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed -i 's/AWS/Amazon Web Services/' aws.txt
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Amazon Web Services is important
This is a sample text file
This file is used to test grep commands
This is the linux server hosted in Amazon Web Services
aws is a really good platform
Aws is very easy to use
```

Note: The `s` in the command stands for **substitute**.

But in this way only the first occurrence of each line get substituted. Which means there are 2 occurrence of `AWS` in a single line, the command will substitute only the first occurrence of `AWS`.

### To update all the occurrence

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed -i 's/AWS/Amazon Web Services/g' aws.txt
```

Note: The added `g` will make sure to replace all the occurrences in a single line.

## Delete by Line

Syntax:

```txt
sed -i '<line to be deleted>d' <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Amazon Web Services is important
This is a sample text file
This file is used to test grep commands
This is the linux server hosted in Amazon Web Services
aws is a really good platform
Aws is very easy to use
```

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed -i '4d' aws.txt
```

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Amazon Web Services is important
This is a sample text file
This file is used to test grep commands
aws is a really good platform
Aws is very easy to use
```

Note: The `d` stands for the **delete**.

### Delete the last line

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed -i '$d' aws.txt
```

## Add new Text

Syntax:

```txt
sed -i '4i\<new line>' <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Amazon Web Services is important
This is a sample text file
This file is used to test grep commands
aws is a really good platform
Aws is very easy to use
```

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed -i '2i\this is a new line' aws.txt
```

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Amazon Web Services is important
this is a new line
This is a sample text file
This file is used to test grep commands
aws is a really good platform
Aws is very easy to use
```

Note: The `i` in the command stands for **insert**.

### Add a new line at last

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ sed -i '$a\This is the last line' aws.txt
```

Note: The `a` in the command stands for **append**.
