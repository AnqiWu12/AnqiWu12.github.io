# Anqi Wu · Portfolio

Live at **https://anqiwu12.github.io**

A small static site (plain HTML, CSS and JavaScript, no build step).

## How to update it

| I want to… | Edit this |
|---|---|
| Add / change a work, its video, year or cover image | `assets/js/data.js` |
| Change the About text | `about.html` |
| Change contact links or add a resume | `contact.html` |
| Change colors or fonts | the top of `assets/css/style.css` |

**Adding a cover image:** put the file in `assets/images/`, then in `data.js` set
`image: "assets/images/your-file.jpg"`. Without an image, each work shows a
generated "sound object".

**Adding a video:** paste a YouTube or Vimeo link into that work's `video: ""`.

After editing, commit and push; GitHub Pages updates in about a minute.
