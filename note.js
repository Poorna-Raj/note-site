const params = new URLSearchParams(location.search);
const file = params.get("file");
const titleParam = params.get("title") || "Note";
const subjectParam = params.get("subject") || "";
const topicParam = params.get("topic") || "";

document.getElementById("navTitle").textContent = titleParam;
document.getElementById("navTopic").textContent = topicParam;
document.title = titleParam + " — Tangent";

const subjectData = SUBJECTS.find((s) => s.id === subjectParam);
if (subjectData) {
  const pill = document.getElementById("navSubject");
  pill.textContent = subjectData.icon + "  " + subjectData.label;
  pill.style.cssText += `background:${subjectData.color}1a;color:${subjectData.color};border:1px solid ${subjectData.color}30`;
  document.documentElement.style.setProperty("--accent", subjectData.color);
}

// Progress bar
window.addEventListener(
  "scroll",
  () => {
    const h = document.body.scrollHeight - window.innerHeight;
    document.getElementById("progress").style.transform =
      `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`;
  },
  { passive: true },
);

function slugify(t) {
  return String(t)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

if (!file) {
  document.getElementById("noteContent").innerHTML =
    '<div class="state-center"><span>No file specified.</span></div>';
} else {
  fetch(file)
    .then((r) => {
      if (!r.ok) throw new Error("Could not load: " + file);
      return r.text();
    })
    .then((md) => {
      const headings = [];
      const renderer = new marked.Renderer();

      renderer.heading = (token, level) => {
        // marked v9 passes token object or string
        const raw =
          typeof token === "object"
            ? token.text || token.raw || ""
            : String(token);
        const id = slugify(raw);
        headings.push({ level, text: raw, id });
        return `<h${level} id="${id}">${raw}</h${level}>`;
      };

      renderer.code = (token, lang) => {
        const src =
          typeof token === "object" ? token.text || "" : String(token);
        const lng =
          (typeof token === "object" ? token.lang || lang || "" : lang || "")
            .toLowerCase()
            .replace(/\s.*/, "") || "plaintext";
        let hi;
        try {
          hi = hljs.highlight(src, {
            language: lng,
            ignoreIllegals: true,
          }).value;
        } catch {
          hi = hljs.highlightAuto(src).value;
        }
        const esc = src
          .replace(/\\/g, "\\\\")
          .replace(/`/g, "\\`")
          .replace(/\$/g, "\\$");
        const label = lng === "plaintext" ? "code" : lng;
        return `<pre><div class="code-bar"><span class="code-lang-label">${label}</span><button class="copy-btn" onclick="copyCode(this,\`${esc}\`)">copy</button></div><code class="hljs">${hi}</code></pre>`;
      };

      marked.setOptions({ breaks: false, gfm: true });
      const html = marked.parse(md, { renderer });
      document.getElementById("noteContent").innerHTML =
        `<div class="prose">${html}</div>`;
      buildTOC(headings);
      initScrollSpy();
    })
    .catch((err) => {
      document.getElementById("noteContent").innerHTML = `
        <div class="state-center" style="color:var(--red)">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>${err.message}</span>
          <a href="index.html" style="color:var(--accent);font-size:13px;margin-top:4px">← Back to notes</a>
        </div>`;
    });
}

function buildTOC(headings) {
  const sidebar = document.getElementById("tocSidebar");
  const list = document.getElementById("tocList");
  const items = headings.filter((h) => h.level <= 3);
  if (!items.length) {
    sidebar.style.display = "none";
    return;
  }

  list.innerHTML = items
    .map((h, i) => {
      const divider =
        h.level === 1 && i > 0
          ? '<li><div class="toc-divider"></div></li>'
          : "";
      const label = h.text.replace(/<[^>]+>/g, "");
      return `${divider}<li class="toc-h${h.level}"><a href="#${h.id}" data-id="${h.id}">${label}</a></li>`;
    })
    .join("");

  list.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.id);
      if (!target) return;
      setActive(a.dataset.id);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initScrollSpy() {
  let ticking = false;

  function update() {
    // Collect all tracked headings
    const allH = [
      ...document.querySelectorAll(".prose h1,.prose h2,.prose h3"),
    ];
    if (!allH.length) return;

    const THRESHOLD = 50 + 32; // nav height + comfortable buffer

    // Walk backwards — find the last heading that has scrolled past the threshold
    let active = allH[0];
    for (const h of allH) {
      if (h.getBoundingClientRect().top < THRESHOLD) {
        active = h;
      }
    }
    setActive(active.id);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );

  update();
}

function setActive(id) {
  document.querySelectorAll(".toc-list a").forEach((a) => {
    a.classList.toggle("active", a.dataset.id === id);
  });
}

function copyCode(btn, code) {
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = "copied!";
    btn.style.color = "var(--green)";
    setTimeout(() => {
      btn.textContent = "copy";
      btn.style.color = "";
    }, 2000);
  });
}
