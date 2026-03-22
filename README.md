# Personal Resume Website — dibakar.in

A modern, fully responsive personal resume website built with semantic HTML5 and custom CSS. Designed as part of the CSS Module Assignment.

**Live Site:** [dibakar.in](https://dibakar.in)

---

## Overview

This is the personal portfolio of **Dibakar Bala** — Quantitative Finance Researcher, Podcast Host, and Technology Advisor to the PMO. The site showcases professional experience, academic background, strategic impact, and awards.

---

## CSS Features Used

| Technique | Implementation |
|---|---|
| Google Fonts | `Outfit` (weights 300–800) via Google Fonts API |
| CSS Custom Properties | Full design token system in `:root` |
| Color Palette | Deep blue `#002D8B` + vibrant pink `#FF4D94` |
| Flexbox | Navigation bar, hero layout, footer |
| CSS Grid | Impact cards, awards, experience/education split |
| Positioning | `sticky` header, `absolute` overlay card |
| Glassmorphism | `backdrop-filter: blur()` + semi-transparent cards |
| Transitions | `cubic-bezier` hover animations on all interactive elements |
| Responsive Design | Breakpoints at 1024px, 992px, 480px |
| Gradient Text | `background-clip: text` on hero headline |
| Pseudo-elements | `::before` circles for vertical timeline |
| Typography Scale | 4.5rem hero → 3rem sections → 1rem body |

---

## File Structure
```
Resume-Website/
├── index.html       # Main HTML file
├── index.css        # All styles
└── media/
    ├── myself.jpg
    ├── podcast.jpg
    ├── narendra-modi.jpeg
    ├── ai alpha competition.png
    ├── vbyld.jpg
    ├── redbrick.jpg
    └── internshala.jpg
```

---

## Sections

- **Hero** — Name, tagline, photo, social links
- **Strategic Impact** — Podcast reach, PMO advisory, AI ranking
- **Professional Journey** — Timeline of work experience
- **Academic Foundation** — IIM Bangalore, IIT Madras, IIT Kharagpur
- **Distinction & Awards** — National-level recognition
- **CTA** — Contact / collaboration prompt

---

## Design Decisions

- **Outfit font** — Geometric sans-serif balancing professionalism and energy
- **Blue + Pink palette** — Finance credibility meets entrepreneurial personality
- **Single-page layout** — Smooth scroll with sticky nav for fast access to all sections
- **Dark navy CTA block** — High-contrast close encourages contact conversion

---
