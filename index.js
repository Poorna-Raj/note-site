function getSubjectColor(id) {
  const s = SUBJECTS.find((s) => s.id === id);
  return s ? s.color : "#5b8af0";
}

function renderStats() {
  const total = NOTES.length;
  const subjects = [...new Set(NOTES.map((n) => n.subject))].length;
  const allTags = [...new Set(NOTES.flatMap((n) => n.tags || []))].length;
  document.getElementById("stats").innerHTML = `
    <div class="stat-item"><div class="stat-num">${total}</div><div class="stat-label">Notes</div></div>
    <div class="stat-divider"></div>
    <div class="stat-item"><div class="stat-num">${subjects}</div><div class="stat-label">Subjects</div></div>
    <div class="stat-divider"></div>
    <div class="stat-item"><div class="stat-num">${allTags}</div><div class="stat-label">Topics</div></div>
  `;
}

function renderCard(note) {
  const color = getSubjectColor(note.subject);
  const tags = (note.tags || [])
    .map((t) => `<span class="note-tag">${t}</span>`)
    .join("");
  return `
    <a class="note-card" href="note.html?file=${encodeURIComponent(note.file)}&title=${encodeURIComponent(note.title)}&subject=${note.subject}"
       data-title="${note.title.toLowerCase()}" data-desc="${(note.desc || "").toLowerCase()}" data-tags="${(note.tags || []).join(" ").toLowerCase()}"
       style="--card-color:${color}">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${color},${color}88);border-radius:14px 14px 0 0;opacity:0;transition:opacity 0.2s;" class="card-line"></div>
      <div class="note-arrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m7 17 10-10M7 7h10v10"/></svg>
      </div>
      <div class="note-title">${note.title}</div>
      <div class="note-desc">${note.desc || ""}</div>
      <div class="note-footer">
        <div class="note-tags">${tags}</div>
        <div class="note-date">${note.updated || ""}</div>
      </div>
    </a>`;
}

function renderAll(filteredNotes) {
  const container = document.getElementById("subjects-container");
  container.innerHTML = "";
  let anyVisible = false;

  SUBJECTS.forEach((subject, i) => {
    const subjectNotes = filteredNotes.filter((n) => n.subject === subject.id);
    const allSubjectNotes = NOTES.filter((n) => n.subject === subject.id);
    if (allSubjectNotes.length === 0) return; // hide empty subjects entirely

    anyVisible = true;
    const color = subject.color;
    const cards =
      subjectNotes.length > 0
        ? subjectNotes.map(renderCard).join("")
        : `<div class="empty-state">No notes match your search in this subject.</div>`;

    container.innerHTML += `
      <div class="subject-block" style="animation-delay:${i * 0.05 + 0.05}s">
        <div class="subject-header">
          <div class="subject-icon">${subject.icon}</div>
          <div class="subject-title">${subject.label}</div>
          <div class="subject-count" style="background:${color}18;color:${color};border:1px solid ${color}33">${allSubjectNotes.length} note${allSubjectNotes.length !== 1 ? "s" : ""}</div>
        </div>
        <div class="notes-grid">${cards}</div>
      </div>`;
  });

  // Hover line fix
  document.querySelectorAll(".note-card").forEach((card) => {
    const line = card.querySelector('[style*="opacity:0"]');
    card.addEventListener("mouseenter", () => {
      if (line) line.style.opacity = "1";
    });
    card.addEventListener("mouseleave", () => {
      if (line) line.style.opacity = "0";
    });
  });

  document.getElementById("no-results").style.display = anyVisible
    ? "none"
    : "block";
}

function handleSearch(q) {
  q = q.toLowerCase().trim();
  const filtered = q
    ? NOTES.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.desc || "").toLowerCase().includes(q) ||
          (n.tags || []).some((t) => t.toLowerCase().includes(q)),
      )
    : NOTES;
  renderAll(filtered);
}

renderStats();
renderAll(NOTES);
