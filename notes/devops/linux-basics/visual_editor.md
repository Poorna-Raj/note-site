# Visual Editor

- This is a proprietary tool which comes with any linux machine.
- This tool can be used create and edit text files.
- It's like text editor which executed on the terminal interface.

This visual editor has 3 modes,

- Command Mode : Press `:` from Escape Mode to Access
- Insert Mode : Press `i` to access in a text file
- Escape Mode : Press `esc` to access

This is just **VIM**.

## Create a File

Syntax:

```txt
vi <file.extension>
```

Example:

```bash
vi linux.txt
```

## Save a File

After creating a file, we can access the `Insert Mode` by pressing `i` to edit the text file. Then if we want to save that content, first we need to change back to `Escape Mode` by pressing `esc`. Then we can access the `Command Mode` by pressing `:`. After that we need to type,

Syntax:

```bash
:w
```

and this will save the content to the file.

### Save and Exit

Should follow the same process till accessing the `Command Mode` and inside the command mode we can use,

Syntax:

```bash
:wq
```

to save and exit the visual editor.

## Exit the Visual Editor

First access the `Command Mode` and execute the below,

```bash
:q
```

## Exit without Saving

In the `Command Mode` execute below,

```bash
:q!
```

## Delete Character at the Cursor Point

While in the `Command Mode` position the cursor and just press `x`.
