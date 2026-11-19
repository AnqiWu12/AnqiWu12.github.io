/* =========================================================
   Hover sounds.
   Each room has its own voice. Each work in a room plays a
   different note from that room's scale, so works in the same
   room sound related.

   Sound is OFF until the visitor turns it on (browsers do not
   allow a page to make sound before the visitor clicks).
   The choice is remembered for next time.

   To use your own sound files later: put them in assets/audio/ui/
   and list them in ROOM_FILES below, e.g.
     "games": "assets/audio/ui/games.mp3"
   A room with a file plays the file instead of the synth voice.
   ========================================================= */

const ROOM_FILES = {
  // "games": "assets/audio/ui/games.mp3",
};

(() => {
  const KEY = "anqi-sound";
  let on = false;
  try { on = localStorage.getItem(KEY) === "on"; } catch (e) {}

  let ctx = null, master = null;
  const buffers = {};

  /* ---------- audio engine ---------- */
  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      master = ctx.createGain();
      master.gain.value = 0.22;
      master.connect(comp).connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  const ready = () => on && ctx && ctx.state === "running";
  const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  function env(g, t, attack, peak, decay) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }
  function osc(type, freq, t, dur, dest) {
    const o = ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    o.connect(dest); o.start(t); o.stop(t + dur + 0.05);
    return o;
  }

  /* Two shared building blocks, in the style of the two favourites
     (the yellow electric piano and the purple singing bowl):
     soft sine tones, gentle attack, a ringing tail. */
  // fm(): a sine whose brightness fades as it rings, like an electric piano
  function fm(f, t, ratio, index, peak, decay, fade = 0.6) {
    const g = ctx.createGain(); g.connect(master);
    env(g, t, 0.006, peak, decay);
    const car = osc("sine", f, t, decay + 0.1, g);
    const mod = ctx.createOscillator(), mg = ctx.createGain();
    mod.frequency.value = f * ratio;
    mg.gain.setValueAtTime(f * index, t);
    mg.gain.exponentialRampToValueAtTime(f * 0.02, t + fade);
    mod.connect(mg).connect(car.frequency); mod.start(t); mod.stop(t + decay + 0.15);
    return g;
  }
  // bell(): a few sine partials that each ring for their own time, like a bowl or bell
  function bell(f, t, partials, peak, decay) {
    partials.forEach(([ratio, amp]) => {
      const g = ctx.createGain(); g.connect(master);
      env(g, t, 0.01, peak * amp, decay / Math.sqrt(ratio));
      osc("sine", f * ratio, t, decay + 0.2, g);
    });
  }

  /* ---------- the six room voices ---------- */
  const VOICES = {
    // Games: a music box / celesta (high, sparkly, short ring)
    games: { scale: [79, 81, 84, 86, 88], play(f, t, big) {
      fm(f, t, 3.5, big ? 1.2 : 0.8, big ? 0.3 : 0.22, big ? 1.0 : 0.7, 0.25);
    }},
    // Rescores & Redesigns: a deep, slow tubular bell (low, cinematic, long ring)
    "rescores-redesigns": { scale: [50, 53, 55, 57, 60], play(f, t, big) {
      bell(f, t, [[1, 1], [2, 0.5], [3, 0.3], [4.2, 0.15], [0.5, 0.35]], big ? 0.34 : 0.26, big ? 3.2 : 2.6);
    }},
    // Arrangement & Orchestration: a vibraphone (warm, with a gentle shimmer)
    "arrangement-orchestration": { scale: [65, 67, 69, 72, 74], play(f, t, big) {
      const lfo = ctx.createOscillator(), depth = ctx.createGain();   // the vibraphone's motor shimmer
      lfo.frequency.value = 5.5; depth.gain.value = 0.35;
      const trem = ctx.createGain(); trem.gain.value = 0.65;
      lfo.connect(depth).connect(trem.gain); lfo.start(t); lfo.stop(t + 1.9);
      trem.connect(master);
      const g = ctx.createGain(); g.connect(trem);
      env(g, t, 0.004, big ? 0.34 : 0.26, big ? 1.8 : 1.4);
      osc("sine", f, t, 1.8, g);
      const g4 = ctx.createGain(); g4.connect(trem);
      env(g4, t, 0.003, 0.08, 0.35);
      osc("sine", f * 4, t, 0.4, g4);
    }},
    // Original Music: an electric piano note (FM)
    "original-songs": { scale: [60, 64, 67, 69, 71], play(f, t, big) {
      const g = ctx.createGain(); g.connect(master);
      env(g, t, 0.006, big ? 0.38 : 0.28, 1.1);
      const car = osc("sine", f, t, 1.2, g);
      const mod = ctx.createOscillator(), mg = ctx.createGain();
      mod.frequency.value = f; mg.gain.setValueAtTime(f * 1.4, t);
      mg.gain.exponentialRampToValueAtTime(f * 0.05, t + 0.6);
      mod.connect(mg).connect(car.frequency); mod.start(t); mod.stop(t + 1.25);
    }},
    // Creative Coding: a glass / crystal bell (clear, slightly "digital" overtones)
    "tools-code": { scale: [74, 76, 79, 81, 83], play(f, t, big) {
      fm(f, t, 1.414, big ? 1.0 : 0.6, big ? 0.26 : 0.2, big ? 1.4 : 1.1, 0.4);
      bell(f * 2, t + 0.002, [[1, 1], [2.32, 0.4]], 0.06, 0.8);
    }},
    // Interactive & Installation: a soft singing-bowl bell
    "interactive-installation": { scale: [62, 65, 67, 69, 72], play(f, t, big) {
      [[1, 1], [2.76, 0.45], [5.4, 0.22], [8.93, 0.1]].forEach(([ratio, amp]) => {
        const g = ctx.createGain(); g.connect(master);
        env(g, t, 0.01, (big ? 0.34 : 0.24) * amp, 2.2 / Math.sqrt(ratio));
        osc("sine", f * ratio, t, 2.4, g);
      });
    }}
  };

  function hash(str) { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

  async function playFile(url, big) {
    try {
      if (!buffers[url]) {
        const res = await fetch(url);
        buffers[url] = await ctx.decodeAudioData(await res.arrayBuffer());
      }
      const s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = buffers[url]; g.gain.value = big ? 1 : 0.75;
      s.connect(g).connect(master); s.start();
    } catch (e) {}
  }

  const last = new WeakMap();
  function play(el, big = false) {
    if (!ready()) return;
    const room = el.dataset.room, v = VOICES[room];
    if (!v) return;
    const now = ctx.currentTime;
    if (!big && now - (last.get(el) || 0) < 0.25) return;   // no stutter on quick wiggles
    last.set(el, now);
    if (ROOM_FILES[room]) return playFile(ROOM_FILES[room], big);
    const note = v.scale[hash(el.dataset.sid || room) % v.scale.length];
    v.play(hz(big ? note - 12 : note), now + 0.01, big);
  }

  /* ---------- the Sound on / off switch ---------- */
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sound-toggle";
  const paint = () => {
    btn.setAttribute("aria-pressed", String(on));
    btn.innerHTML = `<span class="sound-icon" aria-hidden="true">${on ? "♪" : "♪̸"}</span> Sound ${on ? "on" : "off"}`;
    btn.title = on ? "Turn hover sounds off" : "Turn hover sounds on";
  };
  btn.addEventListener("click", () => {
    on = !on;
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) {}
    paint();
    if (on && ensure()) {
      // a small welcome chord: one note from each room
      setTimeout(() => {
        ["games", "original-songs", "interactive-installation"].forEach((r, i) =>
          setTimeout(() => { const v = VOICES[r]; v.play(hz(v.scale[0]), ctx.currentTime + 0.01, false); }, i * 110));
      }, 40);
    }
  });
  paint();
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(btn));
  if (document.readyState !== "loading") document.body.appendChild(btn);

  /* When sound was left on, the browser still needs one click or key press
     on each new page before it lets the page play. Wake up on the first one. */
  const wake = () => { if (on) ensure(); };
  ["pointerdown", "keydown", "touchstart"].forEach((t) => document.addEventListener(t, wake, { capture: true, passive: true }));
  if (on) ensure();   // some browsers allow it right away after a visit

  /* ---------- hover and click on works and rooms ---------- */
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const el = e.target.closest && e.target.closest("[data-room]");
    if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
    play(el);
  });
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest && e.target.closest("a[data-room]");
    if (el && el.matches(":focus-visible")) play(el);
  });
  // clicking a work plays a fuller version of its sound, then opens it
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[data-room]");
    if (!a || !on || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    ensure();
    if (!ctx || ctx.state !== "running") return;
    e.preventDefault();
    play(a, true);
    setTimeout(() => { location.href = a.href; }, 260);
  });
})();
