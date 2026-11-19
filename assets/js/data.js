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
     status   optional, e.g. "In development" (shown with the year)
     pending  optional text shown until the media link is filled in
     media    "video", "audio", "audio+score", "images" or "none"
     featured true = also shown on the Main page
   ========================================================= */

/* every role a work can have (detailed; shown on labels) */
const ROLES = ["Composer", "Songwriter", "Vocalist", "Arranger", "Orchestrator", "Producer", "Sound Designer", "Audio Implementer", "Audio Programmer", "Creative Coder", "Interactive Artist"];

/* The filter buttons on the Works page. Each button groups several roles:
   a work lights up when it has any of the roles listed. */
const FILTERS = [
  { label: "Composition",     roles: ["Composer", "Songwriter"] },
  { label: "Arrangement",     roles: ["Arranger", "Orchestrator"] },
  { label: "Production",      roles: ["Producer", "Vocalist"] },
  { label: "Sound Design",    roles: ["Sound Designer"] },
  { label: "Game Audio",      roles: ["Audio Implementer", "Audio Programmer"] },
  { label: "Creative Coding", roles: ["Creative Coder"] },
  { label: "Installation",    roles: ["Interactive Artist"] }
];

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
    title: "Original Music",
    blurb: "My own songs and tracks, written and produced from scratch.",
    hue: 55
  },
  {
    id: "tools-code",
    title: "Creative Coding",
    blurb: "Games and tools I programmed myself, in Unity (C#) and Python.",
    hue: 120
  },
  {
    id: "interactive-installation",
    title: "Interactive & Installation",
    blurb: "Original installations and live audio-visual work: sound in physical space.",
    hue: 280
  }
];

/* the works on the Main page, in this order */
const FEATURED = ["mit-chapel", "eggy-party", "adaptive-environment-audio", "stray-rescore", "venture", "dungeon-escape"];

const WORKS = [
  {
    id: "eggy-party",
    room: "games",
    title: "Eggy Party Carnival Song",
    year: "2025",
    roles: ["Arranger", "Producer"],
    role: "Vocal Arranger & Producer",
    status: "",
    tools: [],
    image: "",
    media: "video",
    link: "https://youtu.be/2IDA220xQh0",
    link2: "",
    images: [],
    pending: "",
    summary: "Vocal arrangement and production for the Carnival theme song of Eggy Party (蛋仔派对), a popular NetEase game. The song plays in-game as part of the Carnival event.",
    notes: ["I shaped the vocal harmonies and the overall production to match the game's playful, energetic tone. The track is on NetEase Cloud Music, where it has been saved more than 140,000 times."],
    featured: true
  },
  {
    id: "venture",
    room: "games",
    title: "Venture",
    year: "2025",
    roles: ["Sound Designer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "images",
    link: "https://store.steampowered.com/app/4757060/Venture/",
    link2: "",
    images: ["assets/images/venture.jpg"],
    pending: "",
    summary: "Two astronauts wake up on an alien planet with only minutes of oxygen left. They must work together to scale huge cliffs, study strange lifeforms and find a way home in this atmospheric co-op survival adventure.",
    notes: ["I created the game's sound design. Venture is out now on Steam and Ludare."],
    featured: true
  },
  {
    id: "dungeon-escape",
    room: "games",
    title: "Dungeon Escape",
    year: "2026",
    roles: ["Composer", "Sound Designer", "Audio Implementer", "Creative Coder"],
    role: "",
    status: "",
    tools: ["Unreal Engine", "Wwise", "Blueprints"],
    image: "",
    media: "video",
    link: "https://youtu.be/aw9zcY8vk6Y",
    link2: "",
    images: [],
    pending: "",
    summary: "A dungeon crawler built in Unreal Engine.",
    notes: ["I wrote the music, designed the sound effects and built the implementation in Blueprints, including a four-state adaptive music system and stingers for statue interactions."],
    featured: true
  },
  {
    id: "dystopia",
    room: "games",
    title: "Dystopia",
    year: "2026",
    roles: ["Sound Designer", "Audio Implementer"],
    role: "",
    status: "",
    tools: ["Unity", "C#"],
    image: "",
    media: "images",
    link: "https://github.com/Xeon-all/Dystopia",
    link2: "",
    images: ["assets/images/dystopia.jpg"],
    pending: "",
    summary: "A dystopian game made for the Cyber Sousa Award (金海豚奖), a 21-day online game jam in China. This year's theme was PRESS.",
    notes: ["I joined remotely from the US, working with students from Tsinghua University and Peking University, and was responsible for all of the game's sound design and audio implementation."],
    featured: false
  },
  {
    id: "a-bee-game-of-sorts",
    room: "games",
    title: "A Bee Game of Sorts",
    year: "2026",
    roles: ["Composer", "Producer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "images",
    link: "https://mizl1zzie.itch.io/a-bee-game-of-sorts",
    link2: "",
    images: ["assets/images/a-bee-game-of-sorts.png"],
    pending: "",
    summary: "A 2D puzzle game about a little bee, made in a 12-hour game jam and released on itch.io.",
    notes: ["I composed and produced the music."],
    featured: false
  },
  {
    id: "ode-to-marina",
    room: "games",
    title: "Ode to Marina",
    year: "2026",
    roles: ["Composer", "Producer"],
    role: "Music Lead",
    status: "In development",
    tools: [],
    image: "",
    media: "none",
    link: "https://www.instagram.com/broodboxgames",
    link2: "",
    images: ["assets/images/ode-to-marina.jpg"],
    pending: "",
    summary: "An indie game in development by Brood Box Games. As music lead, I'm writing and producing the score.",
    notes: ["The first release is planned for 2028."],
    featured: false
  },
  {
    id: "stray-rescore",
    room: "rescores-redesigns",
    title: "Stray Game Rescore",
    year: "2025",
    roles: ["Composer"],
    role: "Composer",
    status: "",
    tools: ["Logic Pro"],
    image: "",
    media: "video",
    link: "https://youtu.be/y0xbwqIkwI4",
    link2: "",
    images: [],
    pending: "",
    summary: "A rescore of selected scenes from Stray, where you play a stray cat finding its way through a decaying cyberpunk city.",
    notes: ["I chose four contrasting moments to try four different musical approaches: Inside the Wall, Dead City, Battle with Zurks, and Chasing by Zurks."],
    featured: true
  },
  {
    id: "the-last-of-us-sound-redesign",
    room: "rescores-redesigns",
    title: "The Last of Us Sound Redesign",
    year: "2025",
    roles: ["Sound Designer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "video",
    link: "https://youtu.be/7RnoV8n2VUg",
    link2: "",
    images: [],
    pending: "",
    summary: "A full sound redesign of a scene from The Last of Us.",
    notes: ["I re-recorded all of the Foley, including footsteps, clothing movement and environmental sounds, along with all of the dialogue. Ellie is voiced by Sydney Pollack and Joel by Joshua Rosa."],
    featured: false
  },
  {
    id: "gta-online-rescore",
    room: "rescores-redesigns",
    title: "GTA Online Trailer Rescore",
    year: "2025",
    roles: ["Composer", "Sound Designer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "video",
    link: "https://youtu.be/bWPAIKUQMr8",
    link2: "",
    images: [],
    pending: "",
    summary: "A new score and sound design for a GTA Online trailer.",
    notes: ["GTA Online is an open-world action game known for fast, chaotic play. I rebuilt the soundtrack and sound design to match the pacing and intensity of the visuals."],
    featured: false
  },
  {
    id: "apple-creator-studio-rescore",
    room: "rescores-redesigns",
    title: "Apple Creator Studio Ad Rescore",
    year: "2026",
    roles: ["Composer", "Sound Designer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "video",
    link: "https://youtu.be/CMCsA3vcMvo",
    link2: "",
    images: [],
    pending: "",
    summary: "A new score and sound design for Apple's Creator Studio advertisement.",
    notes: [],
    featured: false
  },
  {
    id: "adaptive-environment-audio",
    room: "rescores-redesigns",
    title: "Adaptive Environment Audio System (Wwise + Unity)",
    year: "2025",
    roles: ["Composer", "Sound Designer", "Audio Implementer"],
    role: "",
    status: "",
    tools: ["Wwise", "Unity"],
    image: "",
    media: "video",
    link: "https://youtu.be/bOjOF0QHVnE",
    link2: "https://youtu.be/C4mRDWV1Ta0",
    images: [],
    pending: "",
    summary: "An interactive environment that moves from a damp cave into an abandoned lab, with sound that reacts to the player at every step.",
    notes: ["You enter a silent cave. Water drips somewhere in the dark, rocks shift overhead, and something deeper inside lets out a low growl. Your walkie-talkie crackles as the signal fades. Then you notice a doorway, almost swallowed by the rock. You step through, and the cave is gone: broken glass, flickering lights, and an abandoned lab that knows you're here.", "I built the audio structure in Wwise and integrated it into Unity. RTPCs drive the monster rumble, the alarm and a layer of the music, so their intensity rises as the space grows tense. The monster and alarm sit in 3D space, so the player can hear where they are and how far away.", "Ambient sounds play with random timing and variation, so no two visits feel the same. Most sounds respond to the player: monologue cues stand in for dialogue, and the mix shifts with the player's movement and where they look.", "All audio assets are my own. Voice acting by Tommy X. Wu."],
    captions: ["Inside the Wwise project", "Playing it in Unity"],
    featured: true
  },
  {
    id: "cooking-fever-ui-sound-redesign",
    room: "rescores-redesigns",
    title: "Cooking Fever UI Sound Redesign",
    year: "2025",
    roles: ["Sound Designer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "video",
    link: "https://youtu.be/rDzSReUuiuU",
    link2: "",
    images: [],
    pending: "",
    summary: "A complete set of UI sounds redesigned for Cooking Fever.",
    notes: ["I sampled and processed recordings performed by Tommy X. Wu to build every click, feedback sound and interaction cue. I wanted the sounds to feel responsive and clear, with one consistent character across the whole interface."],
    featured: false
  },
  {
    id: "pokemon-gold-silver-orchestral",
    room: "arrangement-orchestration",
    title: "Pokémon Gold and Silver Ending Theme (Orchestral Arrangement)",
    year: "2026",
    roles: ["Arranger", "Orchestrator"],
    role: "Arranger & Orchestrator",
    status: "",
    tools: [],
    image: "",
    media: "audio+score",
    link: "",
    link2: "",
    images: [],
    pending: "Coming at the end of the semester",
    summary: "The ending theme from Pokémon Gold and Silver, rearranged for orchestra.",
    notes: [],
    featured: false
  },
  {
    id: "fall-into-place-arrangement",
    room: "arrangement-orchestration",
    title: "Fall Into Place (Ensemble Arrangement)",
    year: "2026",
    roles: ["Arranger"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "audio",
    link: "",
    link2: "",
    images: [],
    pending: "Recording in progress",
    summary: "A new ensemble arrangement of Fall Into Place by Couch.",
    notes: [],
    featured: false
  },
  {
    id: "moving-through-the-silence",
    room: "original-songs",
    title: "Moving Through the Silence",
    year: "2026",
    roles: ["Composer", "Songwriter", "Vocalist", "Producer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "audio",
    link: "",
    link2: "",
    images: [],
    pending: "",
    summary: "This piece is inspired by emotional states that exist beyond language, where meaning is felt rather than clearly defined. It reflects moments of connection, distance and transition that can't be fully explained but keep lingering beneath the surface.",
    notes: ["Silence here is not empty. It is a space where thoughts, memories and emotions move freely. Through layered vocals and atmospheric production, the song explores a quiet tension between holding on and letting go."],
    featured: false
  },
  {
    id: "dubstep-track",
    room: "original-songs",
    title: "Dive",
    year: "2026",
    roles: ["Composer", "Songwriter", "Producer"],
    role: "",
    status: "",
    tools: [],
    image: "",
    media: "audio",
    link: "https://api.soundcloud.com/tracks/2435330451?secret_token=s-dOYQZ9oXAV3",
    link2: "",
    images: [],
    pending: "",
    summary: "An original dubstep track, written and produced from scratch, with sampled vocals.",
    notes: [],
    featured: false
  },
  {
    id: "a-place-to-hold",
    room: "interactive-installation",
    title: "A Place to Hold",
    year: "2026",
    roles: ["Composer", "Sound Designer", "Audio Implementer", "Creative Coder", "Interactive Artist"],
    role: "Interdisciplinary Artist",
    status: "",
    tools: ["Unreal Engine", "TouchDesigner", "Wwise", "Arduino", "OSC"],
    image: "",
    media: "video",
    link: "",
    link2: "",
    images: [],
    pending: "Video coming after the show",
    summary: "An interactive audiovisual installation. A private, curtained space to hold, not express, what you feel.",
    notes: ["You speak, sigh or hum. The system listens only to the texture and energy of your voice, never its meaning, and leaves no trace. Your voice summons a mist out of silence; a wave of the hand over a real, empty diary releases it into an abstract book on screen, where it dissolves."],
    featured: false
  },
  {
    id: "mit-chapel",
    room: "interactive-installation",
    title: "How Do You Find Silence?",
    year: "2026",
    roles: ["Sound Designer", "Audio Implementer", "Creative Coder", "Interactive Artist"],
    role: "Interactive Audiovisual Installation",
    status: "",
    tools: ["Unity", "C#", "Wwise", "Makey Makey"],
    image: "",
    media: "images",
    link: "https://calendar.mit.edu/event/what-is-your-light-2026",
    link2: "",
    images: [],
    galleries: [{"label": "At the MIT Chapel", "images": [{"src": "assets/images/mit-chapel-1.jpg", "alt": "A visitor watches the particle lights on screen during the breathing guide"}, {"src": "assets/images/mit-chapel-7.jpg", "alt": "A family tries the installation together while the screen says Breathe in"}, {"src": "assets/images/mit-chapel-8.jpg", "alt": "A visitor breathes with her eyes closed, hands around a lotus"}, {"src": "assets/images/mit-chapel-2.jpg", "alt": "Two visitors hold their hands around the ceramic lotuses"}, {"src": "assets/images/mit-chapel-9.jpg", "alt": "A visitor leans in and holds a lotus during Breathe out"}, {"src": "assets/images/mit-chapel-3.jpg", "alt": "Hands around the lotuses while the screen shows Breathe out"}, {"src": "assets/images/mit-chapel-10.jpg", "alt": "The installation at the chapel entrance, with visitors nearby"}, {"src": "assets/images/mit-chapel-5.jpg", "alt": "A ceramic lotus holding an LED candle"}, {"src": "assets/images/mit-chapel-6.jpg", "alt": "The installation table with LED candles and lotuses"}]}, {"label": "Installation notes", "shape": "tall", "images": [{"src": "assets/images/mit-chapel-poster-1.jpg", "alt": "Poster: What Is Your Light? Chapel Entry, How Do You Find Silence? By Anqi Wu, with MF Dynamics, MIT ORSEL and realtalk@MIT"}, {"src": "assets/images/mit-chapel-poster-2.jpg", "alt": "Poster: A Shared Breath, over two glowing ceramic lotuses"}, {"src": "assets/images/mit-chapel-poster-3.jpg", "alt": "Poster: Light That Breathes, over the Unity C# script and the particle colors"}, {"src": "assets/images/mit-chapel-poster-4.jpg", "alt": "Poster: Touch and Sound, with the Wwise project open on a laptop"}]}],
    pending: "",
    summary: "An interactive audiovisual installation at the entrance of the MIT Chapel. Up to three visitors place their hands on ceramic lotuses, and light and sound guide them through three slow breaths together. Each visitor has their own light on the screen, and as they breathe in, their lights move closer together.",
    notes: [],
    credit: "What Is Your Light?, MIT Chapel, November 3, 2026. Presented by MIT ORSEL, in collaboration with the Berklee Interdisciplinary Arts Institute.",
    sections: [{"heading": "Concept", "paras": ["What Is Your Light? invited visitors to walk through a series of installations and performances and reflect on what guides them. My piece was the first stop on that path. I believe reflection starts when we slow down, and the easiest way to slow down is to take a deep breath. The installation asks visitors to do this with the people next to them before they enter the chapel."]}, {"heading": "Design", "paras": ["The setting is inspired by Chan (禅), a school of Buddhism that developed in China and is known in the West as Zen. The word Chan comes from the Sanskrit dhyana, which means meditation. Growing up in China, I have always found the simple, natural style of Chan spaces calming. In Chan practice, meditation often begins with simple methods such as counting the breath, which is also where this installation begins.", "I chose the lotus because of its long connection to meditation. In Buddhist art, the Buddha is often shown seated on a lotus throne, and a common cross-legged meditation posture is called the lotus position. In Chinese culture, the lotus is also admired because it grows out of mud but stays clean. The Song dynasty philosopher Zhou Dunyi used this image in his short poetic essay “On the Love of the Lotus” (爱莲说) to describe a person of integrity. To me, it also suggests that calm can be found even in a busy place, like the entrance of the chapel on the night of the event.", "Each lotus holds an LED candle, since open flames are not allowed in the chapel. When visitors place their hands around a lotus, it looks as if they are holding a small light, which connects to the question of the evening: What is your light?"]}, {"heading": "Experience", "list": ["When a visitor places their hands on a lotus, their light appears on the screen and their tone joins the sound.", "The installation guides three breaths. Each breath is four seconds in, one second hold, and five seconds out. This is close to six breaths per minute, a pace often used for relaxation.", "Each visitor’s light has its own color. When everyone breathes in, the lights move to the center. If three people take part, the lights blend into a warm white glow. When everyone breathes out, the lights spread apart again.", "On the last breath, the particles drift away from the center and a bell ends the round."]}, {"heading": "Technical System", "list": ["Touch: Copper tape on each lotus is connected to a Makey Makey board. When a hand touches the copper, the board sends a key press to the computer.", "Visuals: Built in Unity with C#. A script runs a shared breathing timer and controls a particle system for each visitor. Bloom post-processing creates the glow.", "Sound: Built in Wwise and integrated into Unity. Each visitor’s presence controls the volume of their own tone. The breathing timer controls a low-pass filter, so the sound becomes brighter on the inhale and softer on the exhale. Wwise States track the inhale, hold, and exhale. A background drone plays throughout.", "Materials: Ceramic lotuses, copper tape, LED candles, linen cloth, a display, speakers, and a Makey Makey board."]}],
    featured: true
  },
  {
    id: "audio-analyzer",
    room: "tools-code",
    title: "Audio Analyzer",
    year: "2025",
    roles: ["Audio Programmer", "Creative Coder"],
    role: "",
    status: "",
    tools: ["Python"],
    image: "",
    media: "images",
    link: "https://github.com/AnqiWu12/AOP",
    link2: "",
    images: ["assets/images/audio-analyzer.jpg"],
    pending: "",
    summary: "A small desktop app written in Python for quickly inspecting audio files.",
    notes: ["Choose a .wav file and it shows the sample rate, bit depth, number of channels, duration and frame count at a glance."],
    featured: false
  },
  {
    id: "apple-farm",
    room: "tools-code",
    title: "Apple Farm",
    year: "2026",
    roles: ["Creative Coder"],
    role: "",
    status: "",
    tools: ["Unity", "C#"],
    image: "",
    media: "images",
    link: "https://anqianki.itch.io/applefarm",
    link2: "",
    images: ["assets/images/apple-farm.jpg"],
    pending: "",
    summary: "A first-person arcade game built in Unity. Throw apples to feed the farm animals: each one needs three apples before time runs out.",
    notes: ["I programmed the animal AI, wave spawning and a Golden Apple power-up in C#, and published a WebGL build you can play in the browser."],
    featured: false
  },
  {
    id: "apple-snake",
    room: "tools-code",
    title: "Apple Snake",
    year: "2026",
    roles: ["Creative Coder"],
    role: "",
    status: "",
    tools: ["Unity", "C#"],
    image: "",
    media: "images",
    link: "https://anqianki.itch.io/applesnake",
    link2: "",
    images: ["assets/images/apple-snake.jpg"],
    pending: "",
    summary: "A playful take on Snake, built in Unity with C#: guide the snake to eat apples and grow without running into yourself.",
    notes: [],
    featured: false
  }
];
