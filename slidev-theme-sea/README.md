# slidev-theme-sea

[![NPM version](https://img.shields.io/npm/v/slidev-theme-sea?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-sea)

An ocean-themed Slidev theme with beautiful animated water effects powered by Three.js.

<!--
  Learn more about how to write a theme:
  https://sli.dev/guide/write-theme.html
--->

<!--
  run `npm run dev` to check out the slides for more details of how to start writing a theme
-->

<!--
  Put some screenshots here to demonstrate your theme

  Live demo: [...]
-->

## Install

Add the following frontmatter to your `slides.md`. Start Slidev then it will prompt you to install the theme automatically.

<pre><code>---
theme: <b>sea</b>
---</code></pre>

Learn more about [how to use a theme](https://sli.dev/guide/theme-addon#use-theme).

## Layouts

This theme provides the following layouts:

- **cover** - Opening slide with centered content
- **intro** - Introduction slide with title emphasis

## Components

This theme provides the following components:

- **OceanBackground** - Animated 3D ocean waves using Three.js
- **ThemeIndicator** - Wave theme switcher (Tropical/Natural/Deep)
- **global-bottom** - Global component that appears on all slides

## Features

- 🌊 **3D Ocean Animation** - Realistic water simulation with Gerstner waves
- 🎨 **3 Wave Themes** - Tropical, Natural, and Deep ocean styles
- ⚡ **Performance Optimized** - Built-in performance monitoring
- 🎮 **Interactive Controls** - Press 'W' to switch wave themes
- ✨ **Visual Effects** - Caustics, sparkles, foam, and shimmer effects

## Contributing

- `npm install`
- `npm run dev` to start theme preview of `example.md`
- Edit the `example.md` and style to see the changes
- `npm run export` to generate the preview PDF
- `npm run screenshot` to generate the preview PNG

---

```sh
pnpm add three
```
