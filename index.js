function buildTree(notes) {
  const map = {};
  SUBJECTS.forEach((s) => {
    map[s.id] = { subject: s, topics: {} };
  });

  notes.forEach((n) => {
    if (!map[n.subject]) return;
    const topicKey = n.topic || "General";
    if (!map[n.subject].topics[topicKey]) {
      map[n.subject].topics[topicKey] = [];
    }
    map[n.subject].topics[topicKey].push(n);
  });

  // Only include subjects that have notes
  return SUBJECTS.filter((s) => Object.keys(map[s.id].topics).length > 0).map(
    (s) => ({
      subject: s,
      topics: Object.entries(map[s.id].topics).map(([name, notes]) => ({
        name,
        notes,
      })),
    }),
  );
}

// ── Stats ──────────────────────────────────────────────────────────────
function renderStats() {
  const topics = [
    ...new Set(NOTES.map((n) => n.subject + ":" + (n.topic || "General"))),
  ].length;
  document.getElementById("stats").innerHTML = `
    <div class="stat"><span class="stat-n">${NOTES.length}</span><span class="stat-l">notes</span></div>
    <div class="stat-sep"></div>
    <div class="stat"><span class="stat-n">${topics}</span><span class="stat-l">topics</span></div>
    <div class="stat-sep"></div>
    <div class="stat"><span class="stat-n">${SUBJECTS.filter((s) => NOTES.some((n) => n.subject === s.id)).length}</span><span class="stat-l">subjects</span></div>`;
}

// ── Render ─────────────────────────────────────────────────────────────
function render(notes) {
  const tree = buildTree(notes);
  const panel = document.getElementById("notesPanel");
  const snav = document.getElementById("subjectNav");
  const noRes = document.getElementById("no-results");

  panel.innerHTML = "";
  // rebuild snav keeping label
  snav.innerHTML = '<span class="snav-label">Subjects</span>';

  if (!tree.length) {
    noRes.style.display = "block";
    return;
  }
  noRes.style.display = "none";

  tree.forEach((entry, si) => {
    const { subject: s, topics } = entry;
    const totalNotes = topics.reduce((a, t) => a + t.notes.length, 0);

    // ── Subject nav pill ──
    const navBtn = document.createElement("button");
    navBtn.className = "snav-item";
    navBtn.innerHTML = `<span class="s-icon">${s.icon}</span>${s.label}<span class="s-count">${totalNotes}</span>`;
    navBtn.style.setProperty("color", "var(--muted)");
    navBtn.onclick = () => {
      const sec = document.getElementById("section-" + s.id);
      if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    snav.appendChild(navBtn);

    // ── Subject section ──
    const section = document.createElement("div");
    section.className = "subject-section";
    section.id = "section-" + s.id;
    section.style.animationDelay = si * 0.05 + 0.03 + "s";

    // Subject header row
    const subjectRow = document.createElement("div");
    subjectRow.className = "subject-row";
    subjectRow.innerHTML = `
      <span class="s-icon">${s.icon}</span>
      <span class="s-name">${s.label}</span>
      <span class="s-meta">
        <span class="s-count" style="background:${s.color}18;color:${s.color};border:1px solid ${s.color}28">${totalNotes} note${totalNotes !== 1 ? "s" : ""}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
      </span>`;

    // Subject body
    const body = document.createElement("div");
    body.className = "subject-body";

    // Toggle open/close
    subjectRow.onclick = () => {
      const isOpen = subjectRow.classList.contains("open");
      subjectRow.classList.toggle("open", !isOpen);
      body.classList.toggle("open", !isOpen);
    };

    // Auto-open if searching (notes are filtered) or first subject
    if (si === 0 || notes !== NOTES) {
      subjectRow.classList.add("open");
      body.classList.add("open");
    }

    // ── Topics ──
    topics.forEach((topic, ti) => {
      const tg = document.createElement("div");
      tg.className = "topic-group";

      const topicRow = document.createElement("div");
      topicRow.className = "topic-row";
      topicRow.innerHTML = `
        <span class="topic-icon">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </span>
        <span>${topic.name}</span>
        <span class="topic-count">${topic.notes.length}</span>`;

      const topicNotes = document.createElement("div");
      topicNotes.className = "topic-notes";

      // Toggle topic
      topicRow.onclick = () => {
        topicRow.classList.toggle("open");
        topicNotes.classList.toggle("open");
      };

      // Auto-open first topic, or all when searching
      if (ti === 0 || notes !== NOTES) {
        topicRow.classList.add("open");
        topicNotes.classList.add("open");
      }

      // ── Notes ──
      topic.notes.forEach((note) => {
        const tags = (note.tags || [])
          .map((t) => `<span class="note-tag">${t}</span>`)
          .join("");
        const link = document.createElement("a");
        link.className = "note-row";
        link.href = `note.html?file=${encodeURIComponent(note.file)}&title=${encodeURIComponent(note.title)}&subject=${note.subject}&topic=${encodeURIComponent(note.topic || "")}`;
        link.innerHTML = `
          <div class="note-dot" style="margin-top:7px"></div>
          <div class="note-info">
            <div class="note-title">${note.title}</div>
            ${note.desc ? `<div class="note-desc">${note.desc}</div>` : ""}
            ${tags ? `<div class="note-tags">${tags}</div>` : ""}
          </div>
          <div style="flex-shrink:0;margin-left:8px">
            <div class="note-date">${note.updated || ""}</div>
          </div>`;
        topicNotes.appendChild(link);
      });

      tg.appendChild(topicRow);
      tg.appendChild(topicNotes);
      body.appendChild(tg);
    });

    section.appendChild(subjectRow);
    section.appendChild(body);
    panel.appendChild(section);
  });
}

// ── Search ─────────────────────────────────────────────────────────────
function handleSearch(q) {
  q = q.toLowerCase().trim();
  const filtered = q
    ? NOTES.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.desc || "").toLowerCase().includes(q) ||
          (n.topic || "").toLowerCase().includes(q) ||
          (n.tags || []).some((t) => t.toLowerCase().includes(q)),
      )
    : NOTES;
  render(filtered);
}

// ── Init ───────────────────────────────────────────────────────────────
renderStats();
render(NOTES);
