---
name: Cyber-Academic Prestige
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007650'
  on-tertiary-container: '#76ffc2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system targets high-achieving engineering students, moving away from "edutainment" tropes toward a "high-performance simulator" aesthetic. The brand evokes a sense of intellectual mastery and technological sophistication. 

The style utilizes **Minimalism** as a structural foundation, layered with **Glassmorphism** for depth and interactive elements. The aesthetic is "Serious Gamified"—utilizing progression mechanics and visual rewards common in modern RPGs but executed with the precision of a professional IDE or high-end fintech dashboard. It prioritizes focus, clarity, and the prestige of technical knowledge.

## Colors

The palette is anchored in a deep, nocturnal environment to reduce eye strain during late-night study sessions. 

- **Base Background:** Deep Navy (#0F172A) provides a low-energy canvas that makes accent colors pop.
- **Primary Accent:** Electric Purple (#7C3AED) signifies intelligence, action, and active learning paths.
- **XP & Streaks:** Gold/Amber (#F59E0B) is reserved strictly for value-based achievements, currency, and "heat" mechanics.
- **Success:** Green (#10B981) denotes completion and correctness.
- **Surface & Depth:** Lighter Navy/Slate shades are used for cards and overlays to create a clear hierarchy of information without relying on harsh lines.

## Typography

This design system employs a dual-font strategy to balance technical edge with reading comfort.

- **Space Grotesk** is used for headlines, statistics, and UI labels. Its geometric, slightly eccentric characters reinforce the high-tech, futuristic identity.
- **Inter** is the workhorse for all body copy and instructional content. Its high legibility ensures that complex engineering concepts are easy to digest.
- **Hierarchy:** Use uppercase labels with increased letter-spacing for category headers to create a "technical blueprint" feel.

## Layout & Spacing

This design system uses a **Fluid Grid** model with a strict 8px base unit. 

- **Desktop:** 12-column grid with 24px gutters.
- **Philosophy:** Content should feel breathable yet dense with information. Use large margins (32px+) for main containers to separate the "learning environment" from global navigation.
- **Rhythm:** Spacing should be used to group related concepts (e.g., a question and its answers) while using larger gaps (40px+) to separate distinct modules or chapters.

## Elevation & Depth

Depth in this system is communicated through **Tonal Layers** and **Ambient Glows** rather than traditional drop shadows.

- **Level 0 (Background):** Deep Navy (#0F172A).
- **Level 1 (Cards/Containers):** Slightly Lighter Navy (#1E293B) with a subtle 1px stroke (#334155).
- **Level 2 (Active/Hover):** Interactive elements gain an "Electric" state—a soft 20px blur of Electric Purple (#7C3AED) at 25% opacity, simulating a self-illuminated display.
- **Backdrop Blurs:** Modals and flyouts use a 12px background blur (60% opacity of the background color) to maintain context while focusing attention.

## Shapes

The shape language is "Soft-Tech"—combining generous, friendly curves with sharp, precise internal data points. 

- **Cards:** Use the `rounded-xl` (1.5rem / 24px) setting to create a premium, modern feel.
- **Secondary UI (Inputs/Buttons):** Use `rounded-lg` (1rem / 16px) for a tighter, more functional appearance.
- **Progress Bars:** Fully rounded (pill-shaped) to represent the fluid nature of learning progress.

## Components

### Buttons
- **Primary:** Electric Purple gradient (Linear: #7C3AED to #6D28D9). On hover, add a 10px outer glow of the same color.
- **Secondary:** Ghost style with a 1px border (#334155). Text in White or Electric Purple.
- **XP/Action:** Gold gradient (#F59E0B) reserved for high-stakes actions like "Claim XP" or "Unlock Masterclass."

### Cards
- **Locked State:** 40% opacity, grayscale filter on icons, and a centered lock icon. Stroke changes to dashed.
- **Unlocked/Active State:** High contrast, vivid Electric Purple accents, and subtle inner-glow on the top edge.

### Statistics & Progress
- **Progress Bars:** Dual-layered. A dark track (#334155) with a glowing, vibrant fill (Purple or Green). 
- **Stats:** Large, bold Space Grotesk numbers. Every stat should be paired with a high-detail icon (line-art style).

### Input Fields
- **Default:** Dark Slate background with a subtle border. 
- **Focus:** Border transitions to Electric Purple with a 4px soft outer glow.

### Achievement Chips
- Small, pill-shaped indicators using secondary or tertiary colors with a 10% opacity background of the same hue for a "tinted glass" look.