# CS Notes Site

A minimal, zero-build personal notes site. Drop in Markdown files, add one line to the config — done.

## File Structure

```
notes-site/
├── index.html              ← Home page (do not edit)
├── note.html               ← Note reader (do not edit)
├── notes.config.js         ← ✏️  EDIT THIS to add notes
└── notes/
    ├── database/
    │   └── plsql-intro.md
    ├── programming/         ← add your .md files here
    └── cs-theory/           ← add your .md files here
```

## Adding a New Note

**Step 1** — Write your note as a `.md` file and save it in the right folder:
```
notes/programming/my-new-note.md
```

**Step 2** — Open `notes.config.js` and add an entry to the `NOTES` array:
```js
{
  title:   "My New Note",
  subject: "programming",       // must match a subject id
  file:    "notes/programming/my-new-note.md",
  desc:    "Short description shown on the home card",
  tags:    ["Python", "OOP"],
  updated: "2026-03-01",
},
```

That's it. No build step. No npm install.

## Hosting (Free)

### GitHub Pages
1. Create a new repo on GitHub
2. Upload all files in this folder
3. Go to repo Settings → Pages → Source: main branch / root
4. Your site is live at `https://yourusername.github.io/repo-name`

### Netlify
1. Drag and drop this entire folder onto netlify.com/drop
2. Done. Live instantly.

### Vercel
1. Push to GitHub
2. Import on vercel.com — no config needed

## Writing Notes

Notes are standard Markdown. Code blocks get auto-highlighted:

````markdown
```sql
SELECT * FROM employees;
```
````

All headings become TOC entries automatically.
