// ============================================================
//  NOTES CONFIG — edit this file to add / remove notes
//  Each note needs: title, file (path to .md), subject, desc
// ============================================================

const SITE_CONFIG = {
  title: "My CS Notes",
  subtitle: "Database · Programming · Theory",
};

const SUBJECTS = [
  { id: "database",    label: "Database / SQL",         icon: "🗄️",  color: "#5b8af0" },
  { id: "programming", label: "Programming Languages",  icon: "⌨️",  color: "#4ecb8d" },
  { id: "cs-theory",   label: "CS Theory",              icon: "🧠",  color: "#f0925b" },
];

const NOTES = [
  {
    title:   "PL/SQL Introduction",
    subject: "database",
    file:    "notes/database/plsql-intro.md",
    desc:    "Block structure, variables, bind vars, exceptions",
    tags:    ["Oracle", "PL/SQL", "Procedures"],
    updated: "2026-02-27",
  },
  // ── Add your next note here ─────────────────────────────
  // {
  //   title:   "My New Note",
  //   subject: "programming",
  //   file:    "notes/programming/my-note.md",
  //   desc:    "Short description shown on the home card",
  //   tags:    ["Tag1", "Tag2"],
  //   updated: "2026-02-27",
  // },
];
