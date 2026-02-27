# Introduction to Linux

Linux is an open-source Unix-like operating system kernel first released by Linus Torvalds in 1991. It powers everything from servers and supercomputers to Android phones.

---

## What is Linux?

Linux is technically just the **kernel** — the core program that manages hardware resources. When people say "Linux", they usually mean a full **distribution** (distro) that bundles the kernel with utilities, a package manager, and desktop environment.

### Common Distributions

- **Ubuntu** — beginner-friendly, great community support
- **Debian** — stable, used as a base for many other distros
- **Arch Linux** — rolling release, highly customizable
- **CentOS / RHEL** — enterprise-focused, used on servers
- **Kali Linux** — penetration testing and security

---

## The File System

Everything in Linux is a file — including devices, processes, and network sockets.

```
/
├── bin/     — essential user binaries
├── etc/     — system configuration files
├── home/    — user home directories
├── var/     — variable data (logs, databases)
├── tmp/     — temporary files (cleared on reboot)
├── usr/     — user programs and utilities
└── proc/    — virtual filesystem for process info
```

### Key Paths

| Path | Purpose |
|------|---------|
| `/etc/passwd` | User account info |
| `/etc/fstab` | Filesystem mount config |
| `/var/log/` | System logs |
| `/home/username/` | Your personal files |

---

## Basic Commands

### Navigation

```bash
pwd               # print working directory
ls -la            # list all files with details
cd /path/to/dir   # change directory
cd ~              # go to home directory
cd ..             # go up one level
```

### Files & Directories

```bash
mkdir my-folder          # create directory
touch file.txt           # create empty file
cp source dest           # copy file
mv source dest           # move or rename
rm file.txt              # delete file
rm -rf folder/           # delete folder recursively (careful!)
```

### Viewing Files

```bash
cat file.txt       # print file contents
less file.txt      # scroll through file
head -n 20 file    # first 20 lines
tail -f log.txt    # follow file in real time
grep "error" file  # search for pattern
```

---

## Getting Help

```bash
man ls          # manual page for any command
ls --help       # quick help flag
tldr ls         # simplified community examples (install separately)
```

> **Tip:** `man` pages can feel dense. `tldr` is much friendlier for quick lookups.
