/* =========================================================
   ALL SITE CONTENT LIVES HERE.
   To add or change a work, edit this file only.

   Each work:
     id       short name used in the link (letters, numbers, dashes)
     room     which category it belongs to (must match a room id below)
     title    shown on the wall label
     year     e.g. "2025"  (leave "" if you don't want a year)
     roles    which filter buttons this work appears under (Works page);
              use names from the ROLES list below
     role     optional: your role in your own words, e.g. "Audio Director".
              Leave "" and the site shows the roles above instead.
     tools    list of tools
     image    path to a cover image, e.g. "assets/images/stray.jpg"
              (leave "" to show the generated "sound object")
     link     main media link. The site picks the player by itself:
                YouTube / Vimeo link      -> video player
                SoundCloud link           -> SoundCloud player
                "assets/video/x.mp4"      -> video player (put the file
                                             in the assets/video folder)
                "assets/audio/x.mp3"      -> audio player (put the file
                                             in the assets/audio folder)
                "assets/scores/x.pdf"     -> a "View score (PDF)" link
                any other link            -> a "Listen / watch" link
     link2    optional second link, same rules (e.g. video + audio)
     images   optional list of extra pictures shown under the media,
              e.g. ["assets/images/hold-1.jpg", "assets/images/hold-2.jpg"]
     summary  one or two sentences for the project page
     notes    optional extra paragraphs (list of strings)
     featured true = also shown on the Main page
   ========================================================= */

/* the filter buttons on the Works page, in this order */
const ROLES = ["Composer", "Songwriter", "Arranger", "Orchestrator", "Producer", "Sound Designer", "Audio Implementer", "Interactive Artist"];

const ROOMS = [
  {
    id: "games",
    title: "Games",
    blurb: "Music, sound and audio for real game projects, released and in development.",
    hue: 210
  },
  {
    id: "rescores-redesigns",
    title: "Rescores & Redesigns",
    blurb: "New music, sound and implementation for existing games, scenes and ads.",
    hue: 30
  },
  {
    id: "arrangement-orchestration",
    title: "Arrangement & Orchestration",
    blurb: "Existing music rewritten for new forces: orchestra, ensemble and voice.",
    hue: 345
  },
  {
    id: "original-songs",
    title: "Original Songs",
    blurb: "Songs I write, sing and produce.",
    hue: 55
  },
  {
    id: "interactive-installation",
    title: "Interactive & Installation",
    blurb: "Original installations and live audio-visual work: sound in physical space.",
    hue: 280
  }
];

const WORKS = [
  /* ---------------- works (room set on each) ---------------- */
  {
    id: "stray-rescore",
    roles: ["Composer"],
    room: "rescores-redesigns",
    title: "Stray Rescore",
    year: "",
    role: "Composer",
    tools: ["Logic Pro"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A rescore of a scene from Stray.",
    notes: [],
    featured: true
  },
  {
    id: "zelda-rescore",
    roles: ["Composer"],
    room: "rescores-redesigns",
    title: "Zelda Cave Rescore",
    year: "",
    role: "Composer",
    tools: ["Logic Pro"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A rescore of the cave scene where the ghost princess appears. My first game-scoring piece.",
    notes: [],
    featured: false
  },
  {
    id: "usc-collaborations",
    roles: ["Composer", "Sound Designer", "Audio Implementer"],
    room: "games",
    title: "USC Game Collaborations",
    year: "",
    role: "Composer / Sound Designer / Audio Director",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "Three team projects with USC game developers: composer on one, sound designer on another, and audio director, composer and audio implementer on the most recent.",
    notes: [],
    featured: false
  },

  {
    id: "dungeon-escape",
    roles: ["Composer", "Sound Designer", "Audio Implementer"],
    room: "rescores-redesigns",
    title: "Dungeon Escape",
    year: "",
    role: "Music, SFX & Implementation",
    tools: ["Wwise", "Unreal Engine", "Blueprints"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A dungeon crawler with a four-state adaptive music system and stingers for statue interactions. Music, sound effects and Blueprint implementation are all mine.",
    notes: [],
    featured: true
  },
  {
    id: "cave-soundscape",
    roles: ["Sound Designer", "Audio Implementer"],
    room: "rescores-redesigns",
    title: "Cave Soundscape",
    year: "",
    role: "Sound Design & Implementation",
    tools: ["Wwise", "Unreal Engine"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "An interactive cave soundscape: attenuation curves, player speed driving Foley through an RTPC, and state-based transitions between cave areas.",
    notes: [],
    featured: false
  },
  {
    id: "dystopia",
    roles: ["Audio Implementer"],
    room: "games",
    title: "Dystopia",
    year: "",
    role: "Audio",
    tools: ["Unity", "C#", "Git LFS"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A collaborative Unity game. I built the audio, including a scene-transition crossfade system using a custom event bus.",
    notes: [],
    featured: false
  },

  {
    id: "eggy-party",
    roles: ["Arranger"],
    room: "games",
    title: "Eggy Party Carnival Song",
    year: "",
    role: "Vocal Arranger",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "Vocal arrangement for a carnival celebration song in NetEase's Eggy Party (蛋仔派对). The song is still used in the game.",
    notes: [],
    featured: true
  },

  {
    id: "ad-rescore-1",
    roles: ["Composer"],
    room: "rescores-redesigns",
    title: "Ad Rescore 1",
    year: "",
    role: "Composer",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A new score for an existing commercial.",
    notes: [],
    featured: false
  },
  {
    id: "ad-rescore-2",
    roles: ["Composer"],
    room: "rescores-redesigns",
    title: "Ad Rescore 2",
    year: "",
    role: "Composer",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A new score for an existing commercial.",
    notes: [],
    featured: false
  },

  {
    id: "orchestral-arrangement",
    roles: ["Arranger", "Orchestrator"],
    room: "arrangement-orchestration",
    title: "Orchestral Arrangement",
    year: "",
    role: "Arranger & Orchestrator",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "An existing piece rearranged for full orchestra.",
    notes: [],
    featured: false
  },
  {
    id: "ensemble-arrangement",
    roles: ["Arranger"],
    room: "arrangement-orchestration",
    title: "Ensemble Arrangement",
    year: "",
    role: "Arranger",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A pop song rearranged for ensemble.",
    notes: [],
    featured: false
  },

  {
    id: "moving-through-the-silence",
    roles: ["Songwriter"],
    room: "original-songs",
    title: "Moving Through the Silence",
    year: "",
    role: "",
    tools: [],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "An original song.",
    notes: [],
    featured: false
  },

  /* ---------------- Interactive & Installation ---------------- */
  {
    id: "a-place-to-hold",
    roles: ["Interactive Artist", "Audio Implementer"],
    room: "interactive-installation",
    title: "A Place to Hold",
    year: "2026",
    role: "Solo artist",
    tools: ["Unreal Engine", "TouchDesigner", "Wwise", "Arduino", "OSC"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "A private, curtained space to hold, not express, what you feel. You speak, sigh or hum; the system listens only to the texture and energy of your voice, never its meaning, and leaves no trace.",
    notes: [
      "Your voice summons a mist out of silence. A wave of the hand over a real, empty diary releases it into an abstract book on screen, where it dissolves."
    ],
    featured: true
  },
  {
    id: "mit-chapel",
    roles: ["Interactive Artist", "Sound Designer"],
    room: "interactive-installation",
    title: "How Do You Find Silence?",
    year: "2026",
    role: "Sound & Interaction (team of four)",
    tools: ["Wwise", "Makey Makey"],
    image: "",
    link: "",
    link2: "",
    images: [],
    summary: "The entrance piece of a collaborative live audio-visual work at the MIT Chapel, presented with MIT ORSEL and Berklee. Up to three visitors touch a shared light object and breathe together while the sound gathers, holds and spreads.",
    notes: [],
    featured: false
  }
];
