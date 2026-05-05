---
name: Vedic Logic
colors:
  surface: '#0c1320'
  surface-dim: '#0c1320'
  surface-bright: '#323948'
  surface-container-lowest: '#070e1b'
  surface-container-low: '#151c29'
  surface-container: '#19202d'
  surface-container-high: '#232a38'
  surface-container-highest: '#2e3543'
  on-surface: '#dce2f5'
  on-surface-variant: '#d8c2b5'
  inverse-surface: '#dce2f5'
  inverse-on-surface: '#2a303e'
  outline: '#a08d80'
  outline-variant: '#534439'
  surface-tint: '#ffb780'
  primary: '#ffc499'
  on-primary: '#4e2600'
  primary-container: '#f4a261'
  on-primary-container: '#6f3800'
  inverse-primary: '#8e4e14'
  secondary: '#6fd8c8'
  on-secondary: '#003731'
  secondary-container: '#30a193'
  on-secondary-container: '#00302a'
  tertiary: '#f1cc71'
  on-tertiary: '#3e2e00'
  tertiary-container: '#d4b058'
  on-tertiary-container: '#594300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb780'
  on-primary-fixed: '#2f1400'
  on-primary-fixed-variant: '#6f3800'
  secondary-fixed: '#8cf5e4'
  secondary-fixed-dim: '#6fd8c8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffdf96'
  tertiary-fixed-dim: '#e7c268'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4400'
  background: '#0c1320'
  on-background: '#dce2f5'
  surface-variant: '#2e3543'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  unit: 8px
---

## Brand & Style

This design system is built for the high-achieving engineering student, balancing the rigor of academia with a modern, premium aesthetic. The brand personality is authoritative yet accessible, evoking the quiet confidence of a prestigious research institution. 

The visual style is a fusion of **Minimalism** and **Corporate Modern**, grounded by a "clean Indian touch." This is achieved not through cliché imagery, but through mathematical precision in geometry and a curated, earthy-yet-technical color palette. The emotional response should be one of focus, clarity, and high trust. Every element is intentional, removing the "noise" of typical EdTech platforms to create a sanctuary for deep learning.

## Colors

The palette is anchored in a deep, scholarly environment. The background utilizes a dark Slate-Navy (#121926) to reduce eye strain during long study sessions. 

- **Primary (Saffron):** Used sparingly for high-value actions and critical status indicators. It represents clarity and wisdom.
- **Secondary (Teal):** Used for progress tracking, success states, and interactive elements that require a calmer focus.
- **Accent (Ivory):** Used for primary text to ensure high legibility against the dark background without the harshness of pure white.
- **Neutral (Slate):** Various shades of slate define the information hierarchy, separating content blocks without the need for heavy borders.

## Typography

This design system employs a sophisticated typographic pairing to signal its academic nature. 

- **Headlines:** Use **Noto Serif**. This choice brings a traditional, authoritative literary feel that commands respect and differentiates the platform from "standard" SaaS products.
- **Body & Interface:** Use **Inter**. Chosen for its exceptional readability on high-resolution screens and its neutral, systematic utility. 
- **Hierarchy:** Maintain a clear distinction between editorial content (Serif) and functional interface labels (Sans). All labels should use a slight letter spacing to increase clarity at smaller sizes.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain an editorial, magazine-like feel, while transitioning to a fluid model for mobile.

- **Grid:** A 12-column grid is used for core content.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Whitespace:** Emphasize generous vertical breathing room between sections (using 80px or 120px gaps) to prevent the density of technical information from feeling overwhelming. 
- **Alignment:** Content should be primarily left-aligned to mirror the reading pattern of academic papers, with metadata and auxiliary actions placed in right-hand gutters or sub-panels.

## Elevation & Depth

This design system avoids heavy drop shadows in favor of **Tonal Layers** and **Subtle Geometry**.

1.  **Surfaces:** The base background is the darkest level. Cards and containers use a slightly lighter slate shade to appear "raised."
2.  **Fine-line Borders:** Use 1px borders in a low-opacity Ivory or Teal instead of shadows to define card boundaries. This mimics the precision of technical drawings.
3.  **Mandala Watermarks:** In the background of large sections or empty states, use high-mathematical, fine-line geometric patterns (inspired by Mandalas) at 2-3% opacity. These should feel like "ghost" watermarks on premium paper.
4.  **Shadows:** When used (only for floating elements like modals), they must be extra-diffused, large-radius shadows with a Navy tint, never pure black.

## Shapes

The shape language is disciplined and "Soft-Industrial." 

- **Corners:** A 0.25rem (4px) base radius is used for buttons and input fields to maintain a professional, slightly sharp edge. Large cards may use up to 0.75rem (12px) to provide a subtle modern touch without appearing "bubbly."
- **Geometric Accents:** Use perfect squares or circles for status indicators. Avoid pill-shaped buttons for primary actions to stay within the "Professional/Academic" aesthetic; stick to rectangular forms with subtle rounding.

## Components

- **Buttons:** Primary buttons use a solid Saffron fill with Navy text. Secondary buttons use a Ghost style with a 1px Saffron or Teal border. No gradients or "glow" effects.
- **Cards:** Cards should have no fill (transparent) with a 1px Slate border, or a solid Slate fill slightly lighter than the background. They feature a top-left "accent notch" or a thin Saffron top-border to indicate importance.
- **Inputs:** Clean, bottom-border only (minimalist style) or fully outlined with 1px Slate. Labels are always persistent and small, never disappearing as placeholders.
- **Chips/Badges:** Small, rectangular with 2px radius. Use Teal for "Completed" or "Verified" and Ivory for "General Tagging."
- **Progress Indicators:** Use thin, horizontal bars. For senior students, circular progress should be avoided in favor of linear "milestone" maps that look like circuit traces or architectural timelines.
- **Academic Sidebar:** A persistent, narrow navigation rail on the left, using iconography that is thin-stroke and geometric.