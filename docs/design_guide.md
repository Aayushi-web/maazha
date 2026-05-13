# Maazha — Complete Design Guide
> Property Management Software · React + Vite · Pure CSS · Baby Blue Family

---

## 1. Project Overview

**Maazha** is a property management platform serving both property owners/landlords and tenants. The product covers rent collection, tenant management, maintenance requests, and property listings & analytics.

- **Framework:** React 18 + Vite
- **Styling:** Pure CSS with CSS Custom Properties (no Tailwind, no CSS-in-JS)
- **Target Users:** Property owners & Tenants
- **Vibe:** Corporate & Professional

---

## 2. Project Structure

```
maazha/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── fonts/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── Features.jsx
│   │       ├── Stats.jsx
│   │       ├── Testimonials.jsx
│   │       └── CTA.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Properties.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── SignIn.jsx
│   │   ├── Demo.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── tokens.css          ← CSS variables (single source of truth)
│   │   ├── reset.css           ← base reset
│   │   ├── typography.css      ← font scale
│   │   ├── utilities.css       ← helper classes
│   │   └── animations.css      ← keyframes & transitions
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## 3. Brand Identity

### Logo
- **Wordmark only** — no symbol, no icon
- Font: **Playfair Display Bold** (serif)
- `"Maa"` → Deep Sky `#1A3D5C`
- `"zha"` → Baby Blue `#5BAEE0`
- Never stretch, recolor, rotate, or add effects to the logo
- Minimum render size: `22px` font-size

### Logo Variants

| Variant | Background | "Maa" | "zha" |
|---|---|---|---|
| Primary | White / Cloud | `#1A3D5C` | `#5BAEE0` |
| Dark | Midnight Navy | `#D6EFFC` | `#7FCCF0` |
| On Brand | Baby Blue | `#FFFFFF` | `#0A1E2E` |

### Logo JSX Usage
```jsx
// Always use this structure — never hardcode colors inline
<a href="/" className="mz-logo">
  <span className="mz-logo__maa">Maa</span>
  <span className="mz-logo__zha">zha</span>
</a>
```

---

## 4. Color System

### Brand Palette

| Name | Hex | RGB | CSS Variable |
|---|---|---|---|
| Midnight Navy | `#0A1E2E` | 10, 30, 46 | `--color-midnight` |
| Deep Sky | `#1A3D5C` | 26, 61, 92 | `--color-deepsky` |
| Baby Blue | `#5BAEE0` | 91, 174, 224 | `--color-brand` |
| Sky Mist | `#7FCCF0` | 127, 204, 240 | `--color-mist` |
| Ice Blue | `#C8E6F5` | 200, 230, 245 | `--color-ice` |
| Cloud | `#EDF7FD` | 237, 247, 253 | `--color-cloud` |

### tokens.css — Full Token File

```css
/* src/styles/tokens.css */
:root {

  /* ── Raw Palette ── */
  --color-midnight:  #0A1E2E;
  --color-deepsky:   #1A3D5C;
  --color-brand:     #5BAEE0;
  --color-mist:      #7FCCF0;
  --color-ice:       #C8E6F5;
  --color-cloud:     #EDF7FD;

  /* ── Semantic: Backgrounds ── */
  --bg-page:         #EDF7FD;
  --bg-surface:      #FFFFFF;
  --bg-section-alt:  #F5FBFE;
  --bg-dark:         #0A1E2E;
  --bg-dark-surface: #112436;

  /* ── Semantic: Text ── */
  --text-primary:    #1A3D5C;
  --text-secondary:  #3A6B8A;
  --text-muted:      #6B9AB8;
  --text-light:      #9BBDD4;
  --text-on-dark:    #EDF7FD;
  --text-on-brand:   #FFFFFF;

  /* ── Semantic: Borders ── */
  --border-default:  #C8E6F5;
  --border-strong:   #7FCCF0;
  --border-dark:     #1E3A50;

  /* ── Semantic: Actions ── */
  --btn-primary-bg:         #5BAEE0;
  --btn-primary-hover:      #1A3D5C;
  --btn-primary-text:       #FFFFFF;
  --btn-ghost-border:       #C8E6F5;
  --btn-ghost-hover-bg:     #EDF7FD;
  --btn-ghost-hover-border: #5BAEE0;

  /* ── Semantic: States ── */
  --focus-ring:      rgba(91, 174, 224, 0.25);
  --hover-overlay:   rgba(91, 174, 224, 0.08);
  --active-overlay:  rgba(91, 174, 224, 0.15);

  /* ── Status Colors ── */
  --status-success:  #2ECC71;
  --status-warning:  #F5A623;
  --status-error:    #E74C3C;
  --status-info:     #5BAEE0;

  /* ── Shadows ── */
  --shadow-sm:    0 1px 3px rgba(10, 30, 46, 0.06);
  --shadow-md:    0 4px 16px rgba(10, 30, 46, 0.10);
  --shadow-lg:    0 8px 32px rgba(10, 30, 46, 0.14);
  --shadow-brand: 0 4px 20px rgba(91, 174, 224, 0.30);

  /* ── Border Radius ── */
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* ── Spacing Scale (8pt grid) ── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* ── Transitions ── */
  --transition-fast: all 0.15s ease;
  --transition-base: all 0.22s ease;
  --transition-slow: all 0.35s ease;

  /* ── Z-index ── */
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-modal:    500;
  --z-toast:    900;
}
```

### Color Usage Rules

| Color | Use For | Never Use For |
|---|---|---|
| `#0A1E2E` | Dark section bg, footer, nav dark | Body text on light bg |
| `#1A3D5C` | H1–H4, primary body text, logo | Backgrounds |
| `#5BAEE0` | CTA buttons, links, active states | Large text blocks |
| `#7FCCF0` | Hover states, tags, badges | Primary buttons |
| `#C8E6F5` | Borders, dividers, input outlines | Text |
| `#EDF7FD` | Page bg, card surfaces, section fills | Text |

---

## 5. Typography

### Font Stack

```
Display / Logo / Headings → Playfair Display (serif)
Body / UI / Navigation    → DM Sans (sans-serif)
```

### Google Fonts Import (index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:opsz,wght@9..40,300;400;500;600&display=swap" rel="stylesheet">
```

### Type Scale (typography.css)

```css
/* src/styles/typography.css */

.text-display {
  font-family: 'Playfair Display', serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;
  color: var(--text-primary);
}

.text-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.text-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
}

.text-h3 {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary);
}

.text-h4 {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

.text-body-lg {
  font-family: 'DM Sans', sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.7;
  color: var(--text-secondary);
}

.text-body {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
  color: var(--text-secondary);
}

.text-small {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-muted);
}

.text-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-brand);
}
```

---

## 6. Spacing System

Maazha uses an **8pt grid**. All spacing values are multiples of 8 (or 4 for tight UI).

| Token | Value | Use Case |
|---|---|---|
| `--space-1` | 4px | Micro gaps, icon padding |
| `--space-2` | 8px | Tight spacing, small gaps |
| `--space-3` | 12px | Compact padding |
| `--space-4` | 16px | Base padding unit |
| `--space-6` | 24px | Component padding |
| `--space-8` | 32px | Section inner padding |
| `--space-12` | 48px | Section gap |
| `--space-16` | 64px | Large section spacing |
| `--space-20` | 80px | Hero padding |
| `--space-24` | 96px | Section vertical padding |

**Max content width:** `1280px`
**Page horizontal padding:** `32px` desktop · `16px` mobile

---

## 7. Component Library

### 7.1 Buttons

```css
.mz-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-md);
  padding: 10px 22px;
  cursor: pointer;
  transition: var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid transparent;
  outline: none;
  text-decoration: none;
}

/* Primary */
.mz-btn--primary {
  background: var(--color-brand);
  color: var(--text-on-brand);
  border-color: var(--color-brand);
}
.mz-btn--primary:hover {
  background: var(--color-deepsky);
  border-color: var(--color-deepsky);
  box-shadow: var(--shadow-brand);
  transform: translateY(-1px);
}

/* Ghost */
.mz-btn--ghost {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--border-default);
}
.mz-btn--ghost:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
  background: var(--hover-overlay);
}

/* Sizes */
.mz-btn--sm   { font-size: 13px; padding: 7px 16px; }
.mz-btn--lg   { font-size: 16px; padding: 14px 32px; border-radius: var(--radius-lg); }
.mz-btn--full { width: 100%; justify-content: center; }
```

### 7.2 Input / Form Fields

```css
.mz-input {
  width: 100%;
  height: 46px;
  background: var(--bg-surface);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 0 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--text-primary);
  outline: none;
  transition: var(--transition-fast);
}
.mz-input:focus {
  border-color: var(--color-brand);
  box-shadow: 0 0 0 3px var(--focus-ring);
}
.mz-input::placeholder { color: var(--text-light); }
```

### 7.3 Cards

```css
.mz-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}
.mz-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-mist);
  transform: translateY(-2px);
}
```

### 7.4 Badges

```css
.mz-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
}
.mz-badge--blue    { background: var(--color-ice);  color: var(--color-deepsky); }
.mz-badge--mist    { background: var(--color-mist); color: var(--color-midnight); }
.mz-badge--success { background: #D4F5E5; color: #1A6B44; }
.mz-badge--warning { background: #FEF3D7; color: #9A6400; }
.mz-badge--error   { background: #FDDEDE; color: #8B1A1A; }
```

---

## 8. Layout & Grid

```css
/* Container */
.mz-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-8);
}

/* Section */
.mz-section        { padding: var(--space-24) 0; }
.mz-section--alt   { background: var(--bg-section-alt); }
.mz-section--dark  { background: var(--bg-dark); color: var(--text-on-dark); }

/* Grids */
.mz-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-8); }
.mz-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.mz-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }

@media (max-width: 1024px) {
  .mz-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .mz-grid-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .mz-grid-2,
  .mz-grid-3,
  .mz-grid-4     { grid-template-columns: 1fr; }
  .mz-container  { padding: 0 var(--space-4); }
  .mz-section    { padding: var(--space-16) 0; }
}
```

---

## 9. Header Spec

| Property | Value |
|---|---|
| Height | 72px |
| Position | sticky, top: 0 |
| Z-index | `var(--z-sticky)` = 200 |
| Background | `#FFFFFF` |
| Border bottom | `1px solid var(--border-default)` |
| Max width inner | 1280px, padding 32px |

### Header Elements

| Element | Spec |
|---|---|
| Logo | Playfair Display 28px Bold, two-tone |
| Search bar | Height 46px, bg Cloud, border Ice Blue, radius 10px |
| Search Properties | DM Sans 15px SemiBold, Deep Sky |
| Demo / Contact Us | DM Sans 14px Medium, Deep Sky |
| Sign In | Ghost button style |
| Login | Primary button style |

---

## 10. Homepage Sections Plan

| # | Section | Background | Purpose |
|---|---|---|---|
| 1 | Header | `#FFFFFF` | Navigation |
| 2 | Hero | `#EDF7FD` | Headline, subtext, CTA buttons |
| 3 | Stats Bar | `#0A1E2E` | Key numbers (properties, tenants, etc.) |
| 4 | Features | `#FFFFFF` | 4 feature cards (rent, tenants, maintenance, analytics) |
| 5 | How It Works | `#F5FBFE` | Steps for owners & tenants |
| 6 | Testimonials | `#FFFFFF` | 3 review cards |
| 7 | CTA Banner | `#1A3D5C` | Final conversion push |
| 8 | Footer | `#0A1E2E` | Links, logo, copyright |

---

## 11. Animations

```css
/* src/styles/animations.css */

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}

.animate-fade-up    { animation: fadeUp 0.5s ease forwards; }
.animate-fade-in    { animation: fadeIn 0.4s ease forwards; }
.animate-slide-right { animation: slideInRight 0.5s ease forwards; }

/* Stagger delays */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }
```

---

## 12. Responsive Breakpoints

```css
/* xs  — default  0px+   */
/* sm  */  @media (min-width: 480px)  { }
/* md  */  @media (min-width: 768px)  { }
/* lg  */  @media (min-width: 1024px) { }
/* xl  */  @media (min-width: 1280px) { }
```

| Breakpoint | Changes |
|---|---|
| < 480px | Single column, hide search bar in header |
| < 768px | Mobile nav hamburger, single column grids |
| < 1024px | 2-column grids, condensed spacing |
| ≥ 1280px | Full desktop, max-width container |

---

## 13. CSS Naming Convention (BEM-lite + mz- prefix)

```
mz-[block]
mz-[block]__[element]
mz-[block]--[modifier]
```

**Examples:**
```
mz-header / mz-header__inner / mz-header__nav
mz-btn / mz-btn--primary / mz-btn--ghost / mz-btn--sm / mz-btn--lg
mz-card / mz-card--featured
mz-logo / mz-logo__maa / mz-logo__zha
mz-badge / mz-badge--blue / mz-badge--success
mz-input / mz-input--error
mz-section / mz-section--alt / mz-section--dark
mz-container
mz-grid-2 / mz-grid-3 / mz-grid-4
```

---

## 14. Vite Config

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  }
})
```

---

## 15. main.jsx & CSS Import Order

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/reset.css'
import '@styles/tokens.css'
import '@styles/typography.css'
import '@styles/animations.css'
import '@styles/utilities.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## 16. Accessibility Standards

- All interactive elements must have `:focus-visible` using `--focus-ring`
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Buttons must always be `<button>` — never `<div>` or `<span>`
- All images require descriptive `alt` attributes
- WCAG contrast checks:

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| Deep Sky `#1A3D5C` | Cloud `#EDF7FD` | 8.4:1 | AAA ✅ |
| White `#FFFFFF` | Baby Blue `#5BAEE0` | 3.1:1 | AA ✅ |
| Cloud `#EDF7FD` | Midnight `#0A1E2E` | 14.2:1 | AAA ✅ |

---

## 17. Do's & Don'ts

### ✅ Do
- Always use CSS variables — never hardcode hex values in component CSS
- Follow the 8pt spacing grid strictly
- Use `clamp()` for responsive font sizes
- Keep component CSS co-located with the component file
- Use semantic HTML elements

### ❌ Don't
- Introduce new colors outside the brand palette
- Use inline styles except for truly dynamic values
- Skip `alt` attributes on images
- Use arbitrary spacing values outside the defined scale
- Use `px` for body font sizes — use `rem` or `clamp()`

---

*Maazha Design System v1.0 · May 2026*