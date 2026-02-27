const params = new URLSearchParams(location.search);
const file = params.get("file");
const titleParam = params.get("title") || "Note";
const subjectParam = params.get("subject") || "";

// Set nav
document.getElementById("nav-title").textContent = titleParam;
document.title = titleParam + " — CS Notes";

// Subject pill
const subjectData = SUBJECTS.find((s) => s.id === subjectParam);
if (subjectData) {
  const pill = document.getElementById("nav-pill");
  pill.textContent = subjectData.icon + " " + subjectData.label;
  pill.style.cssText += `background:${subjectData.color}18;color:${subjectData.color};border:1px solid ${subjectData.color}33`;
  document.documentElement.style.setProperty("--accent", subjectData.color);
}

// Progress bar
window.addEventListener("scroll", () => {
  const h = document.body.scrollHeight - window.innerHeight;
  document.getElementById("progress").style.transform =
    `scaleX(${h > 0 ? window.scrollY / h : 0})`;
});

// Slugify heading text
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Load & render markdown
if (!file) {
  document.getElementById("noteContent").innerHTML =
    '<div class="loading">No file specified.</div>';
} else {
  fetch(file)
    .then((r) => {
      if (!r.ok) throw new Error("File not found: " + file);
      return r.text();
    })
    .then((md) => {
      // Configure marked
      marked.setOptions({ breaks: false, gfm: true });

      const renderer = new marked.Renderer();
      const headings = [];

      renderer.heading = function (text, level) {
        const id = slugify(
          typeof text === "string" ? text : text.text || String(text),
        );
        const display =
          typeof text === "string" ? text : text.text || String(text);
        headings.push({ level, text: display, id });
        return `<h${level} id="${id}" class="anchor-target">${display}</h${level}>`;
      };

      renderer.code = function (code, lang) {
        const language = lang || "plaintext";
        const label = lang ? lang.toUpperCase() : "CODE";
        let highlighted;
        try {
          highlighted = hljs.highlight(
            typeof code === "string" ? code : code.text || "",
            {
              language:
                language === "TXT" ? "plaintext" : language.toLowerCase(),
              ignoreIllegals: true,
            },
          ).value;
        } catch (e) {
          highlighted = hljs.highlightAuto(
            typeof code === "string" ? code : code.text || "",
          ).value;
        }
        const rawCode = typeof code === "string" ? code : code.text || "";
        const safeCode = rawCode.replace(/`/g, "\\`").replace(/\$/g, "\\$");
        return `<pre><div class="code-bar">
          <div class="code-dots"><i></i><i></i><i></i></div>
          <span class="code-lang-label">${label}</span>
          <button class="copy-btn" onclick="copyCode(this, \`${safeCode}\`)">copy</button>
        </div><code class="hljs language-${language.toLowerCase()}">${highlighted}</code></pre>`;
      };

      const html = marked.parse(md, { renderer });
      document.getElementById("noteContent").innerHTML =
        `<div class="prose">${html}</div>`;

      // Build TOC
      buildTOC(headings);

      // Active TOC tracking
      trackActiveHeading();
    })
    .catch((err) => {
      document.getElementById("noteContent").innerHTML = `
        <div class="loading" style="flex-direction:column;gap:16px;color:#f05b6a;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>${err.message}</span>
          <a href="index.html" style="color:var(--accent);font-size:13px;">← Back to notes</a>
        </div>`;
    });
}

function buildTOC(headings) {
  const list = document.getElementById("tocList");
  if (headings.length === 0) {
    document.getElementById("tocSidebar").style.display = "none";
    return;
  }
  list.innerHTML = headings
    .filter((h) => h.level <= 3)
    .map(
      (h) => `
      <li class="toc-h${h.level}">
        <a href="#${h.id}" onclick="smoothScroll(event,'${h.id}')">${h.text}</a>
      </li>`,
    )
    .join("");
}

function smoothScroll(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function trackActiveHeading() {
  const headings = document.querySelectorAll(".anchor-target");
  const links = document.querySelectorAll(".toc-list a");
  if (!headings.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(
            `.toc-list a[href="#${entry.target.id}"]`,
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-10% 0px -75% 0px" },
  );

  headings.forEach((h) => obs.observe(h));
}

function copyCode(btn, code) {
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = "copied!";
    btn.style.color = "#4ecb8d";
    setTimeout(() => {
      btn.textContent = "copy";
      btn.style.color = "";
    }, 2000);
  });
}
