// ============================================================
//  NOTES CONFIG — the only file you edit to manage your notes
//
//  Structure: Subject → Topic → Note
//  Each note needs: title, file (path to .md), desc, tags, updated
// ============================================================

const SITE_CONFIG = {
  title: "CS Notes",
  subtitle: "Database · DevOps · Programming",
};

// ── Subjects ─────────────────────────────────────────────────────────
// Top-level categories. id must be unique. color is the accent colour.
const SUBJECTS = [
  { id: "database", label: "Database / SQL", icon: "🗄️", color: "#6b9eff" },
  { id: "devops", label: "DevOps", icon: "⚙️", color: "#52c98a" },
  {
    id: "programming",
    label: "Programming Languages",
    icon: "⌨️",
    color: "#e8a84c",
  },
  { id: "cs-theory", label: "CS Theory", icon: "🧠", color: "#c084fc" },
];

// ── Notes ─────────────────────────────────────────────────────────────
// subject  → must match a SUBJECTS id above
// topic    → the middle tier (e.g. "PL/SQL", "Linux Basics")
//            notes with the same subject+topic are grouped together
// file     → path to the .md file, relative to index.html
const NOTES = [
  // ── Database ──────────────────────────────────────────────────────
  {
    title: "Introduction",
    subject: "database",
    topic: "PL/SQL",
    file: "notes/database/plsql/introduction.md",
    desc: "Block structure, variables, bind vars, exceptions",
    tags: ["Oracle", "PL/SQL"],
    updated: "2026-02-27",
  },
  {
    title: "Executable Statements",
    subject: "database",
    topic: "PL/SQL",
    file: "notes/database/plsql/executable_statements.md",
    desc: "Lexical Units, Functions, Data Conversions, Nested Blocks, Variable Scope",
    tags: ["Oracle", "PL/SQL"],
    updated: "2026-02-28",
  },
  // Add more PL/SQL notes here — same subject + topic = same group:
  // {
  //   title:   "Cursors",
  //   subject: "database",
  //   topic:   "PL/SQL",
  //   file:    "notes/database/plsql/cursors.md",
  //   desc:    "Implicit and explicit cursors",
  //   tags:    ["Oracle", "PL/SQL"],
  //   updated: "2026-02-28",
  // },

  // ── DevOps ────────────────────────────────────────────────────────
  {
    title: "Introduction",
    subject: "devops",
    topic: "Linux Basics",
    file: "notes/devops/linux-basics/introduction.md",
    desc: "Filesystem, navigation, and essential commands",
    tags: ["Linux", "CLI", "Bash"],
    updated: "2026-02-27",
  },
  // {
  //   title:   "File Permissions",
  //   subject: "devops",
  //   topic:   "Linux Basics",
  //   file:    "notes/devops/linux-basics/file-permissions.md",
  //   desc:    "chmod, chown, and understanding rwx",
  //   tags:    ["Linux", "Permissions"],
  //   updated: "2026-02-28",
  // },
  // {
  //   title:   "Getting Started",
  //   subject: "devops",
  //   topic:   "Docker",
  //   file:    "notes/devops/docker/getting-started.md",
  //   desc:    "Images, containers, and basic commands",
  //   tags:    ["Docker", "Containers"],
  //   updated: "2026-02-28",
  // },
];
