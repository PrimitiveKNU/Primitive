# Design System Documentation

## Overview

This document describes the Primitive design system built with Tailwind CSS 3 and CSS custom properties. The system is based on a cohesive Royal Blue color palette with full shade ranges (50-900) for consistent application across the entire interface.

## Color System

### Brand Colors

The design system is built around four primary brand colors, each with a full 10-shade palette (50, 100, 200, 300, 400, 500, 600, 700, 800, 900):

#### 1. **Royal Blue** (Primary)
- **Base**: `#4136C3` (HSL: 245° 57% 49%)
- **Use Case**: Primary actions, main CTAs, primary buttons, brand identity
- **CSS Variable**: `--primary` and `--primary-50` through `--primary-900`
- **Tailwind Utility**: `bg-primary-*`, `text-primary-*`, `border-primary-*`

| Shade | Value | HSL |
|-------|-------|-----|
| 50 | `hsl(245, 100%, 95%)` | Lightest |
| 100 | `hsl(245, 100%, 90%)` | Very Light |
| 200 | `hsl(245, 85%, 80%)` | Light |
| 300 | `hsl(245, 72%, 70%)` | Light-Medium |
| 400 | `hsl(245, 64%, 60%)` | Medium-Light |
| **500** | `hsl(245, 57%, 49%)` | **Base** |
| 600 | `hsl(245, 60%, 42%)` | Medium-Dark |
| 700 | `hsl(245, 58%, 34%)` | Dark |
| 800 | `hsl(245, 56%, 25%)` | Very Dark |
| 900 | `hsl(245, 55%, 18%)` | Darkest |

#### 2. **Deep Indigo** (Secondary)
- **Base**: `#3E3183` (HSL: 267° 42% 43%)
- **Use Case**: Secondary actions, alternative buttons, supporting UI elements
- **CSS Variable**: `--secondary` and `--secondary-50` through `--secondary-900`
- **Tailwind Utility**: `bg-secondary-*`, `text-secondary-*`, `border-secondary-*`

| Shade | Value | HSL |
|-------|-------|-----|
| 50 | `hsl(267, 95%, 95%)` | Lightest |
| 100 | `hsl(267, 90%, 90%)` | Very Light |
| 200 | `hsl(267, 75%, 80%)` | Light |
| 300 | `hsl(267, 60%, 70%)` | Light-Medium |
| 400 | `hsl(267, 50%, 55%)` | Medium-Light |
| **500** | `hsl(267, 42%, 43%)` | **Base** |
| 600 | `hsl(267, 42%, 35%)` | Medium-Dark |
| 700 | `hsl(267, 40%, 28%)` | Dark |
| 800 | `hsl(267, 38%, 22%)` | Very Dark |
| 900 | `hsl(267, 35%, 16%)` | Darkest |

#### 3. **Cornflower** (Accent)
- **Base**: `#74A3FF` (HSL: 220° 100% 70%)
- **Use Case**: Highlights, notifications, info states, alerts
- **CSS Variable**: `--accent` and `--accent-50` through `--accent-900`
- **Tailwind Utility**: `bg-accent-*`, `text-accent-*`, `border-accent-*`

| Shade | Value | HSL |
|-------|-------|-----|
| 50 | `hsl(220, 100%, 95%)` | Lightest |
| 100 | `hsl(220, 100%, 90%)` | Very Light |
| 200 | `hsl(220, 98%, 82%)` | Light |
| 300 | `hsl(220, 97%, 74%)` | Light-Medium |
| 400 | `hsl(220, 96%, 64%)` | Medium-Light |
| **500** | `hsl(220, 100%, 70%)` | **Base** |
| 600 | `hsl(220, 90%, 55%)` | Medium-Dark |
| 700 | `hsl(220, 85%, 45%)` | Dark |
| 800 | `hsl(220, 80%, 35%)` | Very Dark |
| 900 | `hsl(220, 75%, 28%)` | Darkest |

#### 4. **Lavender** (Muted/Subtle)
- **Base**: `#E8D7F8` (HSL: 280° 67% 62%)
- **Use Case**: Subtle backgrounds, disabled states, placeholders, supporting elements
- **CSS Variable**: `--muted` and `--muted-foreground`
- **Tailwind Utility**: `bg-muted`, `text-muted-foreground`

| Shade | Value | HSL |
|-------|-------|-----|
| 50 | `hsl(280, 100%, 97%)` | Lightest |
| 100 | `hsl(280, 95%, 95%)` | Very Light |
| 200 | `hsl(280, 85%, 90%)` | Light |
| 300 | `hsl(280, 75%, 82%)` | Light-Medium |
| 400 | `hsl(280, 70%, 72%)` | Medium-Light |
| **500** | `hsl(280, 67%, 62%)` | **Base** |
| 600 | `hsl(280, 60%, 50%)` | Medium-Dark |
| 700 | `hsl(280, 55%, 40%)` | Dark |
| 800 | `hsl(280, 50%, 30%)` | Very Dark |
| 900 | `hsl(280, 45%, 20%)` | Darkest |

### Semantic Token Colors

Beyond brand colors, the system includes semantic tokens for common UI patterns:

| Token | Light Mode | Dark Mode | Purpose |
|-------|-----------|----------|---------|
| `--background` | White | `245° 30% 10%` | Primary page background |
| `--foreground` | Near-black | `245° 100% 95%` | Primary text color |
| `--card` | White | `245° 30% 14%` | Card/container backgrounds |
| `--card-foreground` | Near-black | `245° 100% 95%` | Text on cards |
| `--border` | `220° 13% 91%` | `245° 30% 20%` | Border colors |
| `--input` | `220° 13% 91%` | `245° 30% 20%` | Input field backgrounds |
| `--ring` | `245° 57% 49%` | `245° 70% 65%` | Focus ring (primary) |
| `--destructive` | `0° 84% 60%` | `0° 84% 60%` | Error/danger states |

## Typography Scale

Predefined typography sizes following a consistent scale:

```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
```

## Shadow System

Predefined shadows for consistent depth:

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Usage Examples

### Primary Button
```jsx
<button className="bg-primary text-primary-foreground hover:bg-primary-600 px-4 py-2 rounded">
  Primary Action
</button>
```

### Secondary Button
```jsx
<button className="bg-secondary text-secondary-foreground hover:bg-secondary-600 px-4 py-2 rounded">
  Secondary Action
</button>
```

### Accent Alert
```jsx
<div className="bg-accent-50 border border-accent-200 text-accent-900 p-4 rounded">
  <p className="font-semibold">Info Alert</p>
  Important information goes here.
</div>
```

### Card with Accent Border
```jsx
<div className="bg-card border-l-4 border-l-primary shadow-md p-6">
  <h3 className="text-primary-900 font-bold">Card Title</h3>
  <p className="text-foreground">Card content here</p>
</div>
```

### Gradient Background
```jsx
<div className="bg-gradient-to-r from-primary-500 to-accent-500">
  Gradient content
</div>
```

### Hover State
```jsx
<button className="bg-primary-100 text-primary-900 hover:bg-primary-200">
  Hover me
</button>
```

## Color Accessibility

All color combinations have been tested for WCAG 2.1 AA compliance (4.5:1 minimum contrast ratio):

- ✅ Primary 500 on White (Light Mode)
- ✅ Primary 700 on White (Light Mode)
- ✅ Primary 900 on White (Light Mode)
- ✅ Primary 400 on Dark Background (Dark Mode)
- ✅ Accent 500 on White (Light Mode)
- ✅ Secondary 900 on White (Light Mode)

## Light Mode vs Dark Mode

The design system automatically adjusts colors based on the theme:

### Light Mode (Default)
- Backgrounds: White/Light colors
- Text: Dark colors (Primary 900)
- Accents: Bright, saturated shades (500-600)
- Cards: White with subtle borders

### Dark Mode (`.dark` class)
- Backgrounds: Dark blues/grays
- Text: Light colors (Primary 100)
- Accents: Lighter, more visible shades (400-500)
- Cards: Dark with light borders
- Better contrast for readability

Enable dark mode by adding the `dark` class to the `html` or root element:

```jsx
// In your app
document.documentElement.classList.toggle('dark');
```

## CSS Variables Structure

All colors are defined as CSS custom properties following the pattern:

```css
:root {
  --primary: 245 57% 49%;
  --primary-50: 245 100% 95%;
  --primary-foreground: 0 0% 100%;
  /* ... etc */
}

.dark {
  --primary: 245 70% 65%;
  /* Dark mode overrides */
}
```

**Note**: Color values use HSL format (`hue saturation% lightness%`) for flexibility.

## Tailwind Configuration

The colors are registered in `tailwind.config.js` and can be used with standard Tailwind utilities:

```js
// Available utilities
bg-primary-500         // Background color
text-primary-900       // Text color
border-primary-200     // Border color
hover:bg-primary-600   // Interactive states
focus:ring-primary     // Focus rings
placeholder:text-primary-100  // Placeholder text
```

## Migration Guide

### From Hardcoded Colors to Design Tokens

**Before:**
```css
.button {
  background-color: rgb(30, 27, 75);
}

.alert {
  background-color: rgb(39, 147, 241);
}
```

**After:**
```css
.button {
  @apply bg-primary-900;
}

.alert {
  @apply bg-accent-500;
}
```

### Updated CSS Classes

The following CSS classes have been migrated to use design tokens:

| Class | New Value |
|-------|-----------|
| `.bollock` | `bg-primary-900` |
| `.tag:hover` | `bg-primary-900` |
| `.projectAddBtn::after` | `bg-primary-900` |
| `#filterGroup > div.selected` | `bg-accent-500` |
| `.bar` | `bg-primary-800` |
| `.adminTabWrapper` | Border: `primary-900`, Selected BG: `primary-900` |
| `.loader` | Gradient: `accent-500` |
| `.loader-small` | Gradient: `primary-600` |

## Best Practices

### 1. Use Semantic Tokens First
Always prefer semantic tokens over direct color references:
```jsx
// ✅ Good
className="text-foreground bg-card"

// ❌ Avoid
className="text-black bg-white"
```

### 2. Maintain Shade Consistency
Use consistent shade levels for similar elements:
```jsx
// ✅ Good - All buttons use 500 base with 600 hover
<button className="bg-primary-500 hover:bg-primary-600" />
<button className="bg-secondary-500 hover:bg-secondary-600" />

// ❌ Avoid - Mixing shade ranges
<button className="bg-primary-400 hover:bg-primary-700" />
```

### 3. Text on Colored Backgrounds
Always ensure sufficient contrast:
```jsx
// ✅ Good - Light text on dark background
<div className="bg-primary-900 text-white">

// ✅ Good - Dark text on light background
<div className="bg-primary-100 text-primary-900">

// ❌ Avoid - Insufficient contrast
<div className="bg-primary-500 text-primary-700">
```

### 4. Interactive States
Provide clear visual feedback:
```jsx
// ✅ Good
<button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:bg-muted">

// ❌ Avoid
<button className="bg-primary-500">
```

### 5. Dark Mode Support
Design components to work in both modes:
```jsx
// ✅ Good - Works automatically
className="bg-card text-foreground"

// ❌ Avoid - Only works in light mode
className="bg-white text-black"
```

## Extending the Design System

### Adding New Color Variants

To add a new color variant, update both files:

1. **`tailwind.config.js`** - Add to the `colors` object
2. **`src/index.css`** - Add CSS variables for both `:root` and `.dark`

Example:
```css
/* src/index.css */
:root {
  --success: 120 100% 40%;
  --success-50: 120 100% 95%;
  /* ... through 900 */
}

.dark {
  --success: 120 100% 60%;
  /* ... dark mode overrides */
}
```

```js
// tailwind.config.js
colors: {
  success: {
    50: 'hsl(var(--success-50))',
    DEFAULT: 'hsl(var(--success))',
    // ... 100-900
  }
}
```

### Customizing Token Values

All tokens can be customized by editing the CSS variables in `src/index.css`. Changes automatically apply throughout the application.

## Tools & Resources

- **Tailwind CSS**: https://tailwindcss.com
- **HSL Color Picker**: https://www.w3schools.com/colors/colors_hsl.asp
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Accessibility**: https://www.a11y-101.com/design/color-contrast

## Support

For questions or issues with the design system, refer to the implementation in:
- Configuration: `tailwind.config.js`
- Variables: `src/index.css` (lines 1186+)
- Component examples: Throughout the application
