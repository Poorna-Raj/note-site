# Linux File System

In Linux, everything is treated as a file:
- Regular files
- Directories
- Devices
- Processes
- Links

### File Type Indicators (from ls -l)

| Symbol | Type          |
| ------ | ------------- |
| `-`    | Regular file  |
| `d`    | Directory     |
| `l`    | Symbolic link |


## 1. Current Working Directory

```bash
[ec2-user@ip-172-31-34-101 ~]$ pwd
/home/ec2-user
```

## 2. Creating Directories

Syntax:

```txt
mkdir <directory name>
```

Example: Create a directory named documents

```bash
[ec2-user@ip-172-31-34-101 ~]$ mkdir documents
```

## 3. Creating Files

Syntax:

```txt
touch <fileName.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ touch linux.txt
```

## 4. Listing Files

### Basic listing

```bash
[ec2-user@ip-172-31-34-101 ~]$ ls
documents
```

### Details listing

```bash
[ec2-user@ip-172-31-34-101 ~]$ ls -l
total 0
drwxr-xr-x. 2 ec2-user ec2-user 6 Feb 28 05:15 documents
drwxr-xr-x. 2 ec2-user ec2-user 6 Feb 28 05:18 images
-rw-r--r--. 1 ec2-user ec2-user 0 Feb 28 05:22 linux.txt
```

- In here the document and images are directories. And it it represented by the [**start with d**](#linux-file-system).
- The `linux.txt` file is a normal file which is also represented by [**starting with -**](#linux-file-system).

### Reverse order

Syntax:

```bash
[ec2-user@ip-172-31-34-101 ~]$ ls -lr
total 0
-rw-r--r--. 1 ec2-user ec2-user 0 Feb 28 05:22 linux.txt
drwxr-xr-x. 2 ec2-user ec2-user 6 Feb 28 05:18 images
drwxr-xr-x. 2 ec2-user ec2-user 6 Feb 28 05:15 documents
```

### Sort by latest modified

Syntax:

```bash
[ec2-user@ip-172-31-34-101 ~]$ ls -lt
```

### Show hidden files

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ ls -a
```

## 5. Navigating Directories

### Move into directory

Syntax:

```txt
cd <directory name>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ cd documents/
[ec2-user@ip-172-31-34-101 documents]$
```

### Move back one directory

```bash
[ec2-user@ip-172-31-34-101 documents]$ cd ..
[ec2-user@ip-172-31-34-101 ~]$
```

### Go to home directory

```bash
[ec2-user@ip-172-31-34-101 documents]$ cd ~
[ec2-user@ip-172-31-34-101 ~]$
```

### Go to root directory

```bash
[ec2-user@ip-172-31-34-101 documents]$ cd /
```

## 6. Delete a Directory

### Remove empty directory

Syntax:

```txt
rmdir <directory name>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ rmdir images
```

### Remove non-empty directory

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ ls
aws.txt  devops.txt
```

- Now this directory is not empty. So let's try to go back to the root dir and delete.

```bash
[ec2-user@ip-172-31-34-101 documents]$ cd ..
[ec2-user@ip-172-31-34-101 ~]$ rmdir documents/
rmdir: failed to remove 'documents/': Directory not empty
```

Syntax:

```txt
rm -rf <directory name>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ rm -rf documents/
[ec2-user@ip-172-31-34-101 ~]$ ls
linux.txt
```

### Remove files by extension

Syntax:

```txt
rm *.<file extension>
```

In order to remove all the text files,

```bash
[ec2-user@ip-172-31-34-101 ~]$ rm *.txt
```

## 7. Renaming a File

Syntax:

```txt
mv <file name.extension> <new file name.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ ls
linux.txt
[ec2-user@ip-172-31-34-101 ~]$ mv linux.txt aws.txt
[ec2-user@ip-172-31-34-101 ~]$ ls
aws.txt
```

## 8. Moving Files Between Directories

Syntax:

```txt
mv <file.extension> <new path>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 ~]$ mv aws.txt documents
```

## 9. Add Content to a File

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat > aws.txt
Hello World
This is a text file
```

- When you done typing press `Ctrl + D` to get back.

## 10. View Content in a File

Syntax:

```txt
cat <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Hello World
This is a text file
[ec2-user@ip-172-31-34-101 documents]$
```

## 11. Appending data to a File

Syntax:

```txt
cat >> <file.extension>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Hello World
This is a text file

[ec2-user@ip-172-31-34-101 documents]$ cat >> aws.txt
This is an appended line

[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Hello World
This is a text file
This is an appended line
```

## 12. Viewing a text file

### Numbering

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat -n aws.txt
     1  Hello World
     2  This is a text file
     3  This is an appended line
```

### Reverse order

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ tac aws.txt
This is an appended line
This is a text file
Hello World
```

## 13. Copy data of one file to another

Syntax:

```txt
cp <from> <to>
```

Example:
```bash
[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt
Hello World
This is a text file
This is an appended line
[ec2-user@ip-172-31-34-101 documents]$ cat linux.txt
[ec2-user@ip-172-31-34-101 documents]$ cp aws.txt linux.txt
[ec2-user@ip-172-31-34-101 documents]$ cat linux.txt
Hello World
This is a text file
This is an appended line
```

## 14. Copy data from multiple files to a single file

Syntax:

```txt
cp <from1> <from2> ... > <to>
```

Example:

```bash
[ec2-user@ip-172-31-34-101 documents]$ cat > aws.txt
AWS is important

[ec2-user@ip-172-31-34-101 documents]$ cat > linux.txt
Linux is important

[ec2-user@ip-172-31-34-101 documents]$ cat aws.txt linux.txt > info.txt
[ec2-user@ip-172-31-34-101 documents]$ cat info.txt
AWS is important
Linux is important
```