# Dibakar Bala - Resume Website Build Report

This document outlines the step-by-step process of how we built this premium resume website.

## Phase 1: Requirement Analysis & Content Extraction
We started by analyzing the provided resume text and design inspiration images. Key focus areas were identified:
- **Core Identity**: Bridging the excellence of IIT Madras (Data Science) and IIM Bangalore (Digital Business).
- **Major Brags**: HPAIR 2026 Executive role, WorldQuant (Top 1%), and the Spotify Exclusive Podcast (4M+ listens).
- **Target Aesthetic**: Modern, premium, glassmorphism-based UI with a clean color palette (Deep Blue, Radiant Pink).

## Phase 2: Design System (CSS Strategy)
The foundation was laid in `index.css` using a modern design system:
- **Typography**: We chose **Outfit** from Google Fonts for its geometric yet friendly feel, perfect for a tech-meets-business persona.
- **Color Pallet**: 
    - `Deep Blue (#002D8B)` for authority.
    - `Vibrant Pink (#FF4D94)` for high-impact accents.
    - `Dark Navy (#0A1128)` for secondary premium sections.
- **Layout**: Utilized **CSS Grid** for the complex card layouts and **Flexbox** for alignment. 
- **Components**: Built reusable `.card` classes with `backdrop-filter` for that premium glass effect.

## Phase 3: HTML Structure & Content Mapping
In `index.html`, we structured the content semantically:
- **Hero**: A high-impact section with a custom headline and an image placeholder (`profile.png`).
- **Strategic Impact**: A grid showcasing the three most significant achievements as per the design inspiration.
- **Academic Foundation**: Structured cards for IIMB, IITM, and IITK to highlight the dual-institute excellence.
- **Professional Journey**: A custom-styled vertical timeline to chronicle career growth from 2016 to 2025+.

## Phase 4: Polish & Responsiveness
- **Smooth Interaction**: Added `scroll-behavior: smooth` for a seamless internal navigation experience.
- **Micro-animations**: Implemented simple yet effective hover transitions on all buttons and cards.
- **Mobile First**: Ensured the grid systems stack correctly on smaller devices using media queries.

## Phase 5: GitHub Preparation
- Ensured all image paths are local/relative so that the repository is ready for deployment (e.g., via GitHub Pages).
- Added image placeholders with fallback text to ensure the site looks good even before the user uploads their own photos.

