# 📐 Responsive Design Guidelines - ReVeo Studio

> **Quy chuẩn thiết kế responsive toàn diện cho React/Vite + Tailwind CSS**  
> Mobile-first approach | Accessibility-focused | Performance-optimized

---

## 📱 1. Breakpoints System

### Tailwind Default Breakpoints (Mobile-First)

```css
/* Base: < 640px (Mobile) */
sm:  640px  /* Small devices (large phones) */
md:  768px  /* Tablets (portrait) */
lg:  1024px /* Laptops / Small desktops */
xl:  1280px /* Desktops */
2xl: 1536px /* Large screens */
```

### Usage Convention

```jsx
// ✅ CORRECT: Mobile-first approach
<div className="text-sm md:text-base lg:text-lg">
  {/* Base = mobile, then scale up */}
</div>

// ❌ WRONG: Desktop-first
<div className="text-lg md:text-base sm:text-sm">
  {/* Avoid this pattern */}
</div>
```

### Custom Breakpoints (if needed)

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    }
  }
}
```

---

## 📦 2. Container & Layout

### Container Max-Width

```jsx
// Tailwind utility
<div className="container mx-auto">
  {/* Auto max-width per breakpoint */}
</div>

// Custom max-widths
sm:  max-w-[640px]
md:  max-w-[768px]
lg:  max-w-[1024px]
xl:  max-w-[1280px]
2xl: max-w-[1440px]
```

### Edge Padding (Container Horizontal Spacing)

```jsx
// Standard pattern
<div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32-64px */}
</div>

// Recommended values
Mobile:   px-4  (16px)
Tablet:   px-6  (24px)
Laptop:   px-8  (32px)
Desktop:  px-12 (48px)
Large:    px-16 (64px)
```

### CSS Variables Approach

```css
:root {
  --container-px: 16px;
  --container-max-w: 1440px;
}

@media (min-width: 768px) {
  :root {
    --container-px: 24px;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-px: 32px;
  }
}

.container-custom {
  max-width: var(--container-max-w);
  padding-left: var(--container-px);
  padding-right: var(--container-px);
  margin-left: auto;
  margin-right: auto;
}
```

---

## 🔤 3. Typography Scale & Hierarchy

### Base Font Size

```css
:root {
  font-size: 16px; /* 1rem = 16px */
}
```

### Type Scale (Tailwind)

```jsx
text-xs:   12px  (0.75rem)   // Small labels, captions
text-sm:   14px  (0.875rem)  // Secondary text, small buttons
text-base: 16px  (1rem)      // Body text (DEFAULT)
text-lg:   18px  (1.125rem)  // Emphasized text
text-xl:   20px  (1.25rem)   // Small headings
text-2xl:  24px  (1.5rem)    // H3
text-3xl:  30px  (1.875rem)  // H2
text-4xl:  36px  (2.25rem)   // H1 mobile
text-5xl:  48px  (3rem)      // H1 desktop
text-6xl:  60px  (3.75rem)   // Hero headlines
text-7xl:  72px  (4.5rem)    // Extra large displays
```

### Responsive Headings

```jsx
// H1 - Hero Headline
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
  {/* Mobile: 30px → Desktop: 60px */}
</h1>

// H2 - Section Heading
<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
  {/* Mobile: 24px → Desktop: 36px */}
</h2>

// H3 - Subsection
<h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
  {/* Mobile: 20px → Desktop: 30px */}
</h3>

// H4 - Card Titles
<h4 className="text-lg sm:text-xl font-semibold">
  {/* Mobile: 18px → Desktop: 20px */}
</h4>
```

### Fluid Typography (CSS Clamp)

```css
/* Smooth scaling between breakpoints */
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.75rem);
  /* Min: 28px, Preferred: 4vw + 16px, Max: 60px */
}

h2 {
  font-size: clamp(1.5rem, 3vw + 0.5rem, 2.25rem);
  /* Min: 24px, Max: 36px */
}

p {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
  /* Min: 14px, Max: 18px */
}
```

### Line Height

```jsx
// Body text
leading-normal:  1.5   (default for readability)
leading-relaxed: 1.625 (for longer paragraphs)

// Headings
leading-tight:   1.25  (H1, H2)
leading-snug:    1.375 (H3, H4)
leading-none:    1     (Display text, logos)
```

### Optimal Line Length (Measure)

```jsx
// 45-75 characters per line for readability
<p className="max-w-prose">
  {/* max-w-prose = 65ch (Tailwind default) */}
</p>

// Custom widths
<div className="max-w-xl"> {/* 36rem = 576px */}
<div className="max-w-2xl"> {/* 42rem = 672px */}
<div className="max-w-3xl"> {/* 48rem = 768px */}
```

---

## 📏 4. Spacing System

### Base Unit: 4px

```jsx
// Tailwind spacing scale (all multiples of 4px)
0:   0px
0.5: 2px
1:   4px
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
32:  128px
```

### Vertical Rhythm (Section Spacing)

```jsx
// Between major sections
<section className="py-12 md:py-16 lg:py-24">
  {/* Mobile: 48px, Tablet: 64px, Desktop: 96px */}
</section>

// Recommended section spacing
Mobile:   py-8  to py-12  (32-48px)
Tablet:   py-12 to py-16  (48-64px)
Desktop:  py-16 to py-24  (64-96px)
Large:    py-24 to py-32  (96-128px)
```

### Component Internal Spacing

```jsx
// Card padding
<div className="p-4 md:p-6 lg:p-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>

// Stack spacing (gap between elements)
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  {/* Vertical spacing between children */}
</div>
```

### CSS Variables for Spacing

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  --section-spacing: 48px;
}

@media (min-width: 768px) {
  :root {
    --section-spacing: 64px;
  }
}

@media (min-width: 1024px) {
  :root {
    --section-spacing: 96px;
  }
}
```

---

## 👆 5. Touch Targets & Interactive Elements

### Minimum Touch Target: 44×44px (W3C/WCAG)

```jsx
// ✅ CORRECT: Adequate touch area
<button className="min-h-[44px] min-w-[44px] px-4">
  Click me
</button>

// ❌ WRONG: Too small
<button className="h-6 w-6">
  ❌
</button>
```

### Icon Buttons

```jsx
// Visual icon: 20-24px, Touch area: 44×44px
<button 
  className="w-11 h-11 flex items-center justify-center"
  aria-label="Close"
>
  <svg className="w-6 h-6">
    {/* Icon */}
  </svg>
</button>

// With padding approach
<button className="p-3">
  <svg className="w-5 h-5">
    {/* 20px icon + 12px padding each side = 44px total */}
  </svg>
</button>
```

### Link Spacing

```jsx
// Ensure links have adequate spacing for tapping
<nav className="flex gap-4 md:gap-6">
  <a className="py-2 px-3">Link 1</a>
  <a className="py-2 px-3">Link 2</a>
</nav>
```

---

## 🧭 6. Navbar / Header

### Header Height

```css
:root {
  --nav-h: 48px;  /* Mobile */
}

@media (min-width: 768px) {
  :root {
    --nav-h: 56px;  /* Tablet */
  }
}

@media (min-width: 1024px) {
  :root {
    --nav-h: 64px;  /* Desktop */
  }
}
```

```jsx
// Tailwind implementation
<header className="h-12 md:h-14 lg:h-16">
  {/* 48px → 56px → 64px */}
</header>
```

### Logo Size

```jsx
// Responsive logo
<img 
  className="h-8 md:h-10 lg:h-11 w-auto"
  alt="Logo"
/>
{/* Mobile: 32px, Tablet: 40px, Desktop: 44px */}

// With clamp
style={{ height: 'clamp(32px, 5vw, 44px)' }}
```

### Navigation Items

```jsx
// Desktop navigation
<nav className="hidden lg:flex items-center gap-2 lg:gap-4">
  <a className="px-3 lg:px-4 py-2 text-sm lg:text-base">
    Link
  </a>
</nav>

// Mobile hamburger (≥ 44px touch target)
<button 
  className="lg:hidden w-11 h-11 flex items-center justify-center"
  aria-label="Menu"
>
  <svg className="w-6 h-6">
    {/* Hamburger icon */}
  </svg>
</button>
```

### Sticky Header Pattern

```jsx
<header className="sticky top-0 z-50 bg-white shadow-sm">
  {/* Stays at top during scroll */}
</header>

// With hide-on-scroll (requires JS)
<header className="fixed top-0 w-full transition-transform duration-300">
  {/* Add transform: translateY(-100%) when scrolling down */}
</header>
```

---

## 🎯 7. Hero Section

### Layout Pattern

```jsx
// Desktop: Two-column (text + media)
// Mobile: Stacked
<section className="py-12 md:py-16 lg:py-24">
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      {/* Text Column */}
      <div className="order-2 lg:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
          Hero Headline
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-prose">
          Supporting description text
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="min-h-[44px] px-6 py-3 text-base md:text-lg">
            Primary CTA
          </button>
          <button className="min-h-[44px] px-6 py-3 text-base md:text-lg">
            Secondary CTA
          </button>
        </div>
      </div>
      
      {/* Media Column */}
      <div className="order-1 lg:order-2">
        <img 
          className="w-full h-auto rounded-lg"
          src="hero-image.jpg"
          alt="Hero"
        />
      </div>
      
    </div>
  </div>
</section>
```

### Hero Headline Sizing

```jsx
// Mobile: 28-32px, Desktop: 48-60px
<h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[60px]">
  
// Or with clamp
<h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}>
```

### CTA Button Specifications

```jsx
// Primary CTA (hero)
<button className="
  min-h-[48px] md:min-h-[52px]
  px-6 md:px-8
  text-base md:text-lg
  font-semibold
  rounded-lg
  bg-primary text-white
  hover:bg-primary-dark
  transition-colors
">
  Get Started
</button>

// Ensure high contrast (4.5:1 minimum)
```

---

## 🖼️ 8. Images & Media

### Responsive Images

```jsx
// Basic responsive
<img 
  className="w-full h-auto"
  src="image.jpg"
  alt="Description"
  loading="lazy"
/>

// With srcset for different densities
<img
  src="image-800w.jpg"
  srcSet="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description"
  loading="lazy"
/>

// Picture element for art direction
<picture>
  <source media="(min-width: 1024px)" srcSet="desktop.jpg" />
  <source media="(min-width: 768px)" srcSet="tablet.jpg" />
  <img src="mobile.jpg" alt="Description" />
</picture>
```

### Aspect Ratio Control

```jsx
// Tailwind aspect ratio
<div className="aspect-video"> {/* 16:9 */}
  <img className="w-full h-full object-cover" />
</div>

<div className="aspect-square"> {/* 1:1 */}
<div className="aspect-[4/3]">   {/* 4:3 */}
<div className="aspect-[9/16]">  {/* 9:16 (vertical) */}

// CSS approach
.aspect-16-9 {
  aspect-ratio: 16 / 9;
}

// Fallback for older browsers
.aspect-16-9-fallback {
  position: relative;
  padding-top: 56.25%; /* 9/16 = 0.5625 */
}
.aspect-16-9-fallback img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Object Fit

```jsx
object-cover:    // Crop to fill (most common)
object-contain:  // Fit entire image (letterbox)
object-fill:     // Stretch to fill
object-none:     // Original size
```

### Video Elements

```jsx
<video
  className="w-full h-auto"
  poster="thumbnail.jpg"
  preload="metadata"
  playsInline
  muted
  loop
  controls
>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
  Your browser doesn't support video.
</video>

// Respect reduced motion
@media (prefers-reduced-motion: reduce) {
  video {
    animation: none;
    /* Don't autoplay */
  }
}
```

---

## 🃏 9. Cards & Grid Layouts

### Responsive Grid

```jsx
// Auto-responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3-4 cols */}
</div>

// With auto-fit (CSS Grid)
<div className="grid gap-6" style={{
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
}}>
  {/* Cards automatically wrap */}
</div>
```

### Card Component

```jsx
<div className="
  bg-white rounded-lg shadow-md overflow-hidden
  p-4 md:p-6
  hover:shadow-lg transition-shadow
">
  {/* Card Image */}
  <div className="aspect-[4/3] mb-4">
    <img 
      className="w-full h-full object-cover"
      src="card-image.jpg"
      alt="Card"
      loading="lazy"
    />
  </div>
  
  {/* Card Content */}
  <h3 className="text-lg md:text-xl font-semibold mb-2">
    Card Title
  </h3>
  <p className="text-sm md:text-base text-gray-600 mb-4">
    Card description text
  </p>
  
  {/* Card Action */}
  <button className="min-h-[44px] px-4 text-sm md:text-base">
    Learn More
  </button>
</div>
```

### Gap Spacing

```jsx
// Grid/Flex gaps
gap-2:  8px   (tight)
gap-4:  16px  (default mobile)
gap-6:  24px  (default tablet)
gap-8:  32px  (default desktop)

// Responsive gaps
<div className="grid gap-4 md:gap-6 lg:gap-8">
```

---

## 📝 10. Forms & Inputs

### Input Fields

```jsx
<input
  type="text"
  className="
    w-full
    h-11 md:h-12
    px-3 md:px-4
    text-sm md:text-base
    border border-gray-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-primary
  "
  placeholder="Enter text"
/>

// Height: 44-48px minimum
// Font size: 14-16px (avoid 16px on iOS to prevent zoom)
```

### Form Layout

```jsx
<form className="w-full max-w-md md:max-w-lg mx-auto space-y-4 md:space-y-6">
  
  {/* Form Group */}
  <div>
    <label 
      htmlFor="email"
      className="block text-sm font-medium mb-2"
    >
      Email Address
    </label>
    <input
      id="email"
      type="email"
      className="w-full h-11 px-4 border rounded-lg"
      placeholder="you@example.com"
    />
  </div>
  
  {/* Error Message */}
  <p className="text-sm text-red-600 mt-1">
    Please enter a valid email
  </p>
  
  {/* Submit Button */}
  <button 
    type="submit"
    className="w-full min-h-[48px] text-base font-semibold"
  >
    Submit
  </button>
  
</form>
```

### Form Width Constraints

```jsx
// Full-width on mobile, constrained on desktop
<form className="w-full max-w-xl mx-auto">
  {/* Max 576-672px on desktop */}
</form>

// Two-column on desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input /> {/* First Name */}
  <input /> {/* Last Name */}
</div>
```

### Select & Dropdown

```jsx
<select className="
  w-full h-11 md:h-12
  px-3 md:px-4
  text-sm md:text-base
  border rounded-lg
  appearance-none
  bg-white
">
  <option>Select option</option>
</select>
```

---

## 🔘 11. Buttons

### Button Sizes

```jsx
// Small button
<button className="
  min-h-[40px] px-4 py-2
  text-sm
  rounded-md
">
  Small
</button>

// Default button
<button className="
  min-h-[44px] px-6 py-2.5
  text-base
  rounded-lg
">
  Default
</button>

// Large button (hero CTA)
<button className="
  min-h-[48px] md:min-h-[52px]
  px-6 md:px-8 py-3
  text-base md:text-lg
  rounded-lg
">
  Large
</button>
```

### Button Variants

```jsx
// Primary
<button className="
  bg-primary text-white
  hover:bg-primary-dark
  focus:ring-2 focus:ring-primary focus:ring-offset-2
  transition-colors
">

// Secondary
<button className="
  bg-transparent border-2 border-primary text-primary
  hover:bg-primary hover:text-white
">

// Disabled
<button 
  disabled
  className="
    bg-gray-300 text-gray-500 cursor-not-allowed
    opacity-60
  "
>
```

### Button States

```css
/* Focus visible (keyboard navigation) */
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Active/Pressed */
button:active {
  transform: scale(0.98);
}

/* Disabled */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## 🎨 12. Icons & SVGs

### Icon Sizing

```jsx
// Inline icons (with text)
<svg className="w-5 h-5 inline-block">
  {/* 20px */}
</svg>

// Button icons
<button className="w-11 h-11 flex items-center justify-center">
  <svg className="w-6 h-6">
    {/* 24px icon in 44px touch target */}
  </svg>
</button>

// Large decorative icons
<svg className="w-12 h-12 md:w-16 md:h-16">
  {/* 48-64px */}
</svg>
```

### Icon Accessibility

```jsx
// Decorative icon (hidden from screen readers)
<svg aria-hidden="true">
  {/* ... */}
</svg>

// Meaningful icon (with label)
<button aria-label="Close menu">
  <svg aria-hidden="true">
    <path d="..." />
  </svg>
</button>

// Icon with visible text
<button>
  <svg className="w-5 h-5 mr-2" aria-hidden="true" />
  <span>Click me</span>
</button>
```

### SVG Optimization

```jsx
// Inline SVG (best for small icons)
<svg viewBox="0 0 24 24" className="w-6 h-6">
  <path d="..." />
</svg>

// External SVG (for larger graphics)
<img src="icon.svg" alt="Icon" className="w-8 h-8" />

// SVG Sprite (for multiple icons)
<svg className="w-6 h-6">
  <use href="/sprites.svg#icon-name" />
</svg>
```

---

## 🪟 13. Modal / Drawer / Off-Canvas

### Modal Structure

```jsx
<div 
  className="fixed inset-0 z-50 flex items-center justify-center p-4"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  {/* Overlay */}
  <div 
    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
    onClick={closeModal}
  />
  
  {/* Modal Content */}
  <div className="
    relative z-10
    w-full max-w-md md:max-w-lg lg:max-w-2xl
    max-h-[90vh] overflow-y-auto
    bg-white rounded-lg shadow-xl
    p-6 md:p-8
  ">
    <h2 id="modal-title" className="text-xl md:text-2xl font-bold mb-4">
      Modal Title
    </h2>
    
    {/* Close button */}
    <button
      className="absolute top-4 right-4 w-10 h-10"
      onClick={closeModal}
      aria-label="Close"
    >
      <svg className="w-6 h-6" />
    </button>
    
    {/* Modal body */}
    <div className="space-y-4">
      {/* Content */}
    </div>
  </div>
</div>
```

### Mobile Drawer (Slide-in)

```jsx
// Full-screen on mobile, drawer on desktop
<div className="
  fixed inset-y-0 right-0 z-50
  w-full sm:w-96
  bg-white shadow-2xl
  transform transition-transform
  translate-x-0 {/* or translate-x-full when closed */}
">
  <div className="h-full overflow-y-auto p-6">
    {/* Drawer content */}
  </div>
</div>
```

### Prevent Background Scroll

```css
/* Add to body when modal is open */
.modal-open {
  overflow: hidden;
  padding-right: var(--scrollbar-width); /* Prevent layout shift */
}
```

---

## 🦶 14. Footer

### Footer Layout

```jsx
<footer className="bg-gray-900 text-white py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    
    {/* Footer Grid */}
    <div className="
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-8 md:gap-12
      mb-8
    ">
      
      {/* Column 1: Brand */}
      <div>
        <img src="logo.svg" alt="Logo" className="h-10 mb-4" />
        <p className="text-sm text-gray-400">
          Company description
        </p>
      </div>
      
      {/* Column 2-4: Links */}
      <div>
        <h3 className="text-base font-semibold mb-4">Product</h3>
        <ul className="space-y-2">
          <li>
            <a className="text-sm text-gray-400 hover:text-white min-h-[44px] inline-flex items-center">
              Features
            </a>
          </li>
        </ul>
      </div>
      
    </div>
    
    {/* Footer Bottom */}
    <div className="
      pt-8 border-t border-gray-800
      flex flex-col sm:flex-row justify-between items-center
      gap-4
    ">
      <p className="text-sm text-gray-400">
        © 2024 Company. All rights reserved.
      </p>
      <div className="flex gap-4">
        {/* Social icons */}
      </div>
    </div>
    
  </div>
</footer>
```

### Footer Link Spacing

```jsx
// Ensure adequate touch targets
<a className="
  block py-2
  text-sm md:text-base
  hover:underline
">
  Link
</a>
```

---

## ♿ 15. Accessibility & Motion

### Color Contrast

```css
/* WCAG AA: 4.5:1 for normal text, 3:1 for large text */
/* WCAG AAA: 7:1 for normal text, 4.5:1 for large text */

/* ✅ Good contrast */
.text-primary {
  color: #0066cc; /* on white background */
}

/* ❌ Poor contrast */
.text-light-gray {
  color: #cccccc; /* on white - fails WCAG */
}
```

### Focus States

```css
/* Visible focus for keyboard navigation */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Remove default outline only if custom focus is provided */
button:focus {
  outline: none;
}
button:focus-visible {
  ring: 2px solid var(--primary);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```jsx
// React hook
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Conditional animation
{!prefersReducedMotion && <AnimatedComponent />}
```

### Semantic HTML

```jsx
// ✅ CORRECT
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>

// Use headings in order (h1 → h2 → h3)
// One h1 per page
// Use <button> for actions, <a> for navigation
```

### ARIA Labels

```jsx
// Button with icon only
<button aria-label="Close menu">
  <svg aria-hidden="true" />
</button>

// Navigation landmark
<nav aria-label="Main navigation">

// Form inputs
<label htmlFor="email">Email</label>
<input id="email" aria-describedby="email-help" />
<p id="email-help">We'll never share your email</p>
```

---

## ⚡ 16. Performance & Optimization

### Image Optimization

```jsx
// Lazy loading
<img loading="lazy" src="image.jpg" alt="..." />

// Modern formats with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="..." />
</picture>

// Responsive images
<img
  srcSet="
    image-400w.webp 400w,
    image-800w.webp 800w,
    image-1200w.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-800w.jpg"
  alt="..."
/>
```

### Critical CSS

```html
<!-- Inline critical CSS in <head> -->
<style>
  /* Above-the-fold styles */
  header { ... }
  .hero { ... }
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Font Loading

```css
/* Font display strategy */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}
```

### Defer JavaScript

```html
<!-- Defer non-critical scripts -->
<script src="app.js" defer></script>

<!-- Async for independent scripts -->
<script src="analytics.js" async></script>
```

---

## 🎨 17. CSS Variables & Design Tokens

### Complete CSS Variables System

```css
:root {
  /* ===== SPACING ===== */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 32px;
  --space-4xl: 40px;
  --space-5xl: 48px;
  --space-6xl: 64px;
  
  /* ===== LAYOUT ===== */
  --container-px: 16px;
  --container-max-w: 1440px;
  --section-spacing: 48px;
  
  /* ===== HEADER/NAV ===== */
  --nav-height: 48px;
  --logo-size: 32px;
  --nav-item-gap: 8px;
  --nav-item-px: 12px;
  
  /* ===== TYPOGRAPHY ===== */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  
  /* ===== BORDERS ===== */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* ===== SHADOWS ===== */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* ===== Z-INDEX ===== */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* ===== TABLET (768px+) ===== */
@media (min-width: 768px) {
  :root {
    --container-px: 24px;
    --section-spacing: 64px;
    --nav-height: 56px;
    --logo-size: 40px;
    --nav-item-gap: 12px;
    --nav-item-px: 16px;
  }
}

/* ===== DESKTOP (1024px+) ===== */
@media (min-width: 1024px) {
  :root {
    --container-px: 32px;
    --section-spacing: 96px;
    --nav-height: 64px;
    --logo-size: 44px;
    --nav-item-gap: 16px;
    --nav-item-px: 20px;
  }
}

/* ===== LARGE DESKTOP (1536px+) ===== */
@media (min-width: 1536px) {
  :root {
    --container-px: 64px;
    --section-spacing: 128px;
  }
}
```

### Using CSS Variables

```jsx
// In components
<header style={{ height: 'var(--nav-height)' }}>
  
<div style={{ padding: 'var(--space-lg)' }}>

// In CSS
.container {
  max-width: var(--container-max-w);
  padding-left: var(--container-px);
  padding-right: var(--container-px);
}

.section {
  padding-top: var(--section-spacing);
  padding-bottom: var(--section-spacing);
}
```

---

## 📋 18. Tailwind Config Extensions

### Custom Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Custom breakpoints
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },
      
      // Custom container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '3rem',
          xl: '4rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      
      // Custom colors
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      
      // Custom font sizes
      fontSize: {
        'xxs': '0.625rem',  // 10px
        '3.5xl': '2rem',    // 32px
      },
      
      // Custom z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Custom aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

---

## 🧪 19. Testing Viewports

### Standard Test Viewports

```
Mobile Devices:
- 360×640   (Small Android)
- 375×667   (iPhone SE)
- 375×812   (iPhone X/11/12/13 Pro)
- 390×844   (iPhone 12/13)
- 412×915   (Large Android)
- 414×896   (iPhone XR/11)

Tablets:
- 768×1024  (iPad Portrait)
- 810×1080  (iPad Air)
- 1024×768  (iPad Landscape)
- 1024×1366 (iPad Pro Portrait)

Laptops/Desktops:
- 1280×720  (HD)
- 1366×768  (Common laptop)
- 1440×900  (MacBook Air)
- 1536×864  (HD+)
- 1920×1080 (Full HD)
- 2560×1440 (2K)
- 3840×2160 (4K)
```

### Browser DevTools Testing

```bash
# Chrome DevTools
- Toggle device toolbar: Ctrl+Shift+M (Win) / Cmd+Shift+M (Mac)
- Responsive mode: Select "Responsive" and enter custom dimensions
- Throttling: Simulate slow 3G/4G

# Firefox Responsive Design Mode
- Toggle: Ctrl+Shift+M (Win) / Cmd+Option+M (Mac)

# Safari Responsive Design Mode
- Develop > Enter Responsive Design Mode
```

---

## ✅ 20. QA Checklist Summary

### Visual Checks

- [ ] No horizontal scroll on any viewport
- [ ] All text is readable (minimum 14px on mobile)
- [ ] Images don't overflow containers
- [ ] Proper spacing between sections
- [ ] Consistent padding/margins across breakpoints

### Interactive Elements

- [ ] All buttons ≥ 44×44px touch target
- [ ] Links have adequate spacing (not too close)
- [ ] Forms are usable on mobile (inputs ≥ 44px height)
- [ ] Dropdowns/selects work on touch devices
- [ ] Modals are accessible and closeable

### Navigation

- [ ] Header visible and functional on all viewports
- [ ] Mobile menu (hamburger) works correctly
- [ ] Logo is appropriately sized
- [ ] Navigation items don't overlap
- [ ] Sticky header doesn't cover content

### Layout

- [ ] Hero section displays correctly (stacked on mobile)
- [ ] Grid layouts adapt properly (1→2→3→4 columns)
- [ ] Cards maintain aspect ratios
- [ ] Footer columns stack on mobile

### Accessibility

- [ ] Focus states visible on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Semantic HTML used correctly
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation works

### Performance

- [ ] Images are lazy-loaded
- [ ] Responsive images use srcset
- [ ] No layout shift (CLS < 0.1)
- [ ] Page loads in < 3s on 3G
- [ ] Lighthouse score: Mobile ≥ 50, Accessibility ≥ 90

---

## 📚 Quick Reference

### Common Responsive Patterns

```jsx
// Container
<div className="container mx-auto px-4 md:px-6 lg:px-8">

// Section spacing
<section className="py-12 md:py-16 lg:py-24">

// Responsive heading
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// Responsive image
<img className="w-full h-auto" loading="lazy" />

// Button
<button className="min-h-[44px] px-6 py-3 text-base">

// Card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

// Form
<form className="w-full max-w-lg mx-auto space-y-6">

// Modal
<div className="w-full max-w-md md:max-w-lg p-6 md:p-8">
```

---

## 🎯 Key Principles

1. **Mobile-First**: Design for smallest screen first, then enhance
2. **Touch-Friendly**: Minimum 44×44px for all interactive elements
3. **Readable**: Adequate font sizes, line heights, and contrast
4. **Accessible**: Semantic HTML, ARIA, keyboard navigation, focus states
5. **Performant**: Lazy-load, optimize images, defer scripts
6. **Consistent**: Use design tokens and spacing scale
7. **Flexible**: Use relative units (rem, %, vw) over fixed pixels
8. **Tested**: Verify on real devices and multiple viewports

---

**Document Version**: 1.0  
**Last Updated**: 2024-12-09  
**Maintained by**: ReVeo Studio Development Team
