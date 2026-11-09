/* =========================================================
   Builds the pages from data.js.
   You normally don't need to edit this file.
   ========================================================= */

/* ---------- helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const params = new URLSearchParams(location.search);

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
const roomById = (id) => ROOMS.find((r) => r.id === id);
const workById = (id) => WORKS.find((w) => w.id === id);
const worksIn = (roomId) => WORKS.filter((w) => w.room === roomId);

/* a small seeded random generator, so each work always gets the same shape */
function seeded(str) {
  let h = 2166136261;
  for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- the "sound object": a placeholder sculpture drawn from sound ----------
   An irregular stone-like outline, rings of waveform inside it, and a small
   glowing core whose color depends on the room. */
function soundObject(seedText, hue = 210) {
  const rnd = seeded(seedText);
  const cx = 200, cy = 200, N = 120;

  // a few low-frequency "harmonics" make the outline organic
  const harm = [2, 3, 5, 7].map((k) => ({ k, a: 6 + rnd() * 18, p: rnd() * Math.PI * 2 }));
  // shrink the whole shape so its widest point always fits inside the frame
  const peak = 160 + harm.reduce((s, h) => s + h.a, 0) * (160 / 150) + 2;
  const fit = Math.min(1, 182 / peak);
  const radius = (ang, base, jitter) =>
    (base + harm.reduce((s, h) => s + h.a * Math.sin(h.k * ang + h.p), 0) * (base / 150) + (rnd() - .5) * jitter) * fit;

  const ring = (base, jitter) => {
    let d = "";
    for (let i = 0; i <= N; i++) {
      const ang = (i / N) * Math.PI * 2;
      const r = radius(ang, base, jitter);
      d += (i ? "L" : "M") + (cx + r * Math.cos(ang)).toFixed(1) + " " + (cy + r * Math.sin(ang)).toFixed(1);
    }
    return d + "Z";
  };

  const id = "g" + Math.floor(rnd() * 1e9);
  const coreX = cx + (rnd() - .5) * 60, coreY = cy + (rnd() - .5) * 60;
  let rings = "";
  for (let i = 1; i <= 5; i++) {
    rings += `<path d="${ring(150 - i * 24, 2 + i * 1.6)}" fill="none" stroke="var(--object-edge)" stroke-width="${(1.1 - i * .12).toFixed(2)}" opacity="${(.9 - i * .12).toFixed(2)}"/>`;
  }

  return `
  <svg class="object" viewBox="0 0 400 400" role="img" aria-hidden="true">
    <defs>
      <radialGradient id="${id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="hsl(${hue} 70% 62%)" stop-opacity=".95"/>
        <stop offset="45%" stop-color="hsl(${hue} 60% 70%)" stop-opacity=".35"/>
        <stop offset="100%" stop-color="hsl(${hue} 60% 70%)" stop-opacity="0"/>
      </radialGradient>
      <filter id="${id}s" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".10"/>
      </filter>
    </defs>
    <path d="${ring(160, 3)}" fill="var(--object)" filter="url(#${id}s)"/>
    ${rings}
    <circle cx="${coreX.toFixed(1)}" cy="${coreY.toFixed(1)}" r="62" fill="url(#${id})"/>
  </svg>`;
}

/* ---------- one exhibit on the floor ---------- */
function exhibit(work) {
  const room = roomById(work.room);
  const visual = work.image
    ? `<img class="object" src="${esc(work.image)}" alt="${esc(work.title)}" loading="lazy">`
    : soundObject(work.id, room?.hue);
  const second = work.year || work.role;
  return `
  <a class="exhibit" href="work.html?id=${encodeURIComponent(work.id)}">
    ${visual}
    <span class="label"><span class="t">${esc(work.title)}</span><span class="y">${esc(second)}</span></span>
  </a>`;
}

/* ---------- media: turn each link into the right player ----------
   YouTube / Vimeo        -> video player
   SoundCloud             -> SoundCloud player
   .mp3 .wav .m4a .ogg    -> audio player (file in assets/audio/)
   anything else          -> a plain "Listen / watch" link            */
function mediaFor(url, title) {
  if (!url) return "";
  let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/);
  if (m) return `<iframe class="media" src="https://www.youtube-nocookie.com/embed/${m[1]}" title="${esc(title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `<iframe class="media" src="https://player.vimeo.com/video/${m[1]}" title="${esc(title)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  if (/soundcloud\.com\//.test(url)) {
    const src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(url) +
      "&color=%231f1e1c&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false";
    return `<iframe class="media-audio" src="${src}" title="${esc(title)}" loading="lazy" allow="autoplay"></iframe>`;
  }
  if (/\.(mp3|wav|m4a|ogg)(\?.*)?$/i.test(url)) {
    return `<figure class="audio-file"><audio controls preload="none" src="${esc(url)}"></audio></figure>`;
  }
  return `<p class="media-link"><a href="${esc(url)}" target="_blank" rel="noopener">Listen / watch ↗</a></p>`;
}

function mediaBlock(work) {
  const links = [work.link, work.link2, work.video].filter(Boolean);
  const players = links.map((u) => mediaFor(u, work.title)).join("");
  const gallery = (work.images || []).length
    ? `<div class="gallery">${work.images.map((src) => `<img src="${esc(src)}" alt="${esc(work.title)}" loading="lazy">`).join("")}</div>`
    : "";
  return { html: players + gallery, hasVideo: /class="media"/.test(players) };
}

/* ---------- page renderers ---------- */
const pages = {
  main() {
    $("#floor").innerHTML = WORKS.filter((w) => w.featured).map(exhibit).join("");
  },

  works() {
    // 1. the filter buttons
    const bar = $("#filters");
    const choices = ["All", ...ROLES];
    bar.innerHTML = choices.map((c) =>
      `<button type="button" data-role="${esc(c)}">${esc(c)}</button>`).join("");

    // 2. every work on one floor (used when a filter is on)
    const floor = $("#floor");
    floor.innerHTML = WORKS.map(exhibit).join("");
    [...floor.children].forEach((el, i) => { el.dataset.roles = (WORKS[i].roles || []).join("|"); });

    // 3. show rooms for "All", or light up only the works with that role
    function show(role) {
      const all = !ROLES.includes(role);
      bar.querySelectorAll("button").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.role === (all ? "All" : role))));
      $("#rooms").hidden = !all;
      floor.hidden = all;
      $("#works-lede").textContent = all ? "Four rooms. Step into one." : `Works as ${role}.`;
      if (!all) {
        // lit works move to the front of the wall, dimmed ones after
        const items = [...floor.children];
        const lit = (el) => el.dataset.roles.split("|").includes(role);
        [...items.filter(lit), ...items.filter((el) => !lit(el))].forEach((el) => floor.appendChild(el));
        items.forEach((el) => {
          const on = el.dataset.roles.split("|").includes(role);
          el.classList.toggle("dim", !on);
          el.tabIndex = on ? 0 : -1;
          el.setAttribute("aria-hidden", String(!on));
        });
      }
      const url = all ? "works.html" : `works.html?role=${encodeURIComponent(role)}`;
      history.replaceState(null, "", url);
    }
    bar.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) show(b.dataset.role);
    });

    // 4. the rooms
    $("#rooms").innerHTML = ROOMS.map((r) => {
      const n = worksIn(r.id).length;
      return `
      <li>
        <a class="exhibit room" href="room.html?r=${encodeURIComponent(r.id)}">
          ${soundObject("room-" + r.id, r.hue)}
          <span class="label"><span class="t">${esc(r.title)}</span>
          <span class="y count">${n} ${n === 1 ? "work" : "works"}</span></span>
        </a>
      </li>`;
    }).join("");

    // open with the filter from the link, e.g. works.html?role=Composer
    show(params.get("role"));
  },

  room() {
    const room = roomById(params.get("r")) || ROOMS[0];
    document.title = `${room.title} · Anqi Wu`;
    $("#room-title").textContent = room.title;
    $("#room-blurb").textContent = room.blurb;
    $("#floor").innerHTML = worksIn(room.id).map(exhibit).join("");
  },

  work() {
    const work = workById(params.get("id"));
    const box = $("#work");
    if (!work) {
      box.innerHTML = `<a class="back" href="works.html">← All works</a><h1>This work isn't on view.</h1>`;
      return;
    }
    const room = roomById(work.room);
    document.title = `${work.title} · Anqi Wu`;

    const list = worksIn(work.room);
    const i = list.indexOf(work);
    const prev = list[(i - 1 + list.length) % list.length];
    const next = list[(i + 1) % list.length];

    const mb = mediaBlock(work);
    const embed = mb.hasVideo;   // a video already shows the work, so skip the sound object
    const media = mb.html || `<div class="media-pending">Media coming soon</div>`;

    const visual = work.image
      ? `<img class="hero" src="${esc(work.image)}" alt="${esc(work.title)}">`
      : `<div class="hero">${soundObject(work.id, room?.hue)}</div>`;

    const meta = [work.year, work.role, room?.title].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("");

    box.innerHTML = `
      <a class="back" href="room.html?r=${encodeURIComponent(work.room)}">← ${esc(room?.title)}</a>
      <h1>${esc(work.title)}</h1>
      <p class="meta">${meta}</p>
      ${embed ? "" : visual}
      ${media}
      <h2>About this work</h2>
      <p>${esc(work.summary)}</p>
      ${(work.notes || []).map((p) => `<p>${esc(p)}</p>`).join("")}
      ${work.tools?.length ? `<h2>Tools</h2><ul class="tools">${work.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      ${list.length > 1 ? `
      <nav class="next-prev">
        ${list.length > 2 ? `<a href="work.html?id=${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : "<span></span>"}
        <a href="work.html?id=${encodeURIComponent(next.id)}">${esc(next.title)} →</a>
      </nav>` : ""}`;
  }
};

/* run the renderer named on <body data-page="..."> */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (pages[page]) pages[page]();
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
});
