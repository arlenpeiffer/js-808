# js-808

`JS-808-A` (Arlen Edition) is my implementation of [`splice/js-808`](https://github.com/splice/js-808)

<img src="public/Screenshot 2023-11-15 at 10.36.34 AM.png" alt="Screenshot of application" />

## 👀 Previewing

The project can be run locally using the commands below, or previewed on Netlify via the following link:

[Live Demo on Netlify](https://js-808-a.netlify.app/)

Commands to run locally:

```bash
# Install dependencies
pnpm install

# Start dev server on http://localhost:3000
pnpm dev
```

## ⏰ Timing

I had a lot of fun building this project and definitely spent more than 90 minutes on it between brainstorming, building, styling, and deploying the app.

All in all it was maybe about an hour of planning (working through how I wanted to model and name things, as well as verbally walking myself through how I planned to implement everything), an afternoon (~3 hours) of actual implementation/building out the functionality and setting up the deployment on Netlify, and an extra 30-45 minutes of styling/finishing touches the following morning.

## 💭 Considerations

A few things I was considering while working through the exercise..

- **Accessibility** - ensuring accessibility through the use of:
  - landmark regions to allow users to jump between the Playback controls, Pattern selection, and Pattern editor sections
  - toggle buttons / `aria-pressed` attribute to communicate whether a step is selected or unselected
  - `aria-label` to communicate the step number (# of 16) and associated instrument for each toggle button
- **Future flexibility** - laying the groundwork for future features such as:
  - setting the velocity for each step
  - having panning and volume control for individaul instruments/tracks
  - creating, editing, and deleting patterns and having those changes sync with the list of pattern options in the top right
  - triggering sample playback via custom event listener (currently logging each time this event fires in the console) <img src="public/Screenshot 2023-11-15 at 10.38.19 AM.png" alt="Screenshot of messages being logged to the console" />
