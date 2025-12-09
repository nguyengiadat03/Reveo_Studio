# ✅ Responsive Design QA Checklist

> **Quality Assurance checklist for testing responsive web applications**  
> Use this checklist to verify all responsive behaviors before deployment

---

## 📱 Test Viewports

### Mobile Devices (Portrait)

- [ ] **360×640** - Small Android (Galaxy S5)
- [ ] **375×667** - iPhone SE / 6/7/8
- [ ] **375×812** - iPhone X/11 Pro / 12 Mini
- [ ] **390×844** - iPhone 12/13/14
- [ ] **412×915** - Large Android (Pixel 5)
- [ ] **414×896** - iPhone XR/11 / XS Max

### Tablets

- [ ] **768×1024** - iPad (Portrait)
- [ ] **810×1080** - iPad Air (Portrait)
- [ ] **1024×768** - iPad (Landscape)
- [ ] **1024×1366** - iPad Pro 12.9" (Portrait)
- [ ] **1366×1024** - iPad Pro 12.9" (Landscape)

### Laptops / Desktops

- [ ] **1280×720** - HD (Small laptop)
- [ ] **1366×768** - Common laptop
- [ ] **1440×900** - MacBook Air / Pro 13"
- [ ] **1536×864** - HD+ laptop
- [ ] **1920×1080** - Full HD desktop
- [ ] **2560×1440** - 2K / QHD
- [ ] **3840×2160** - 4K / UHD

---

## 🎨 Visual & Layout Checks

### General Layout

- [ ] No horizontal scrollbar on any viewport
- [ ] All content visible without overflow
- [ ] Proper vertical spacing between sections
- [ ] Consistent edge padding (16px mobile → 32px+ desktop)
- [ ] Container max-width applied correctly
- [ ] No overlapping elements
- [ ] No cut-off text or images

### Typography

- [ ] All text is readable (minimum 14px on mobile)
- [ ] Headings scale appropriately across breakpoints
- [ ] Line length optimal (45-75 characters)
- [ ] Line height adequate (1.5 for body, 1.25 for headings)
- [ ] No text overflow or wrapping issues
- [ ] Font sizes increase on larger screens
- [ ] Text color contrast ≥ 4.5:1 (WCAG AA)

### Images & Media

- [ ] Images don't overflow containers
- [ ] Images maintain aspect ratio
- [ ] Responsive images load appropriate sizes
- [ ] Images are lazy-loaded (below fold)
- [ ] Videos are responsive (width: 100%, height: auto)
- [ ] Video controls accessible on mobile
- [ ] Background images scale correctly
- [ ] No pixelated or stretched images

### Spacing & Rhythm

- [ ] Consistent spacing scale used (4px base unit)
- [ ] Section padding increases with viewport size
- [ ] Card/component padding responsive
- [ ] Grid gaps appropriate for each breakpoint
- [ ] Vertical rhythm maintained throughout

---

## 🧭 Header / Navigation

### Desktop Navigation (≥1024px)

- [ ] Header height: 56-64px
- [ ] Logo visible and appropriately sized (40-44px)
- [ ] All navigation items visible
- [ ] Navigation items have adequate spacing (12-16px gap)
- [ ] Navigation items readable (14-16px font)
- [ ] CTA button visible and prominent
- [ ] Hover states work correctly
- [ ] Active page indicator visible

### Mobile Navigation (<1024px)

- [ ] Header height: 48-56px
- [ ] Logo visible and appropriately sized (32-40px)
- [ ] Hamburger menu visible and accessible
- [ ] Hamburger touch target ≥ 44×44px
- [ ] Mobile menu opens/closes smoothly
- [ ] Mobile menu items readable (14-16px)
- [ ] Mobile menu items have adequate spacing
- [ ] Mobile menu scrollable if content overflows
- [ ] Close button/icon clearly visible
- [ ] Background scroll locked when menu open

### Sticky/Fixed Header

- [ ] Header stays at top when scrolling
- [ ] Header doesn't cover page content
- [ ] z-index high enough (≥1000)
- [ ] Hide-on-scroll works (if implemented)
- [ ] No layout shift when header becomes sticky

---

## 🎯 Hero Section

### Desktop (≥1024px)

- [ ] Two-column layout (text + media)
- [ ] Columns balanced (50/50 or 60/40)
- [ ] Headline size: 48-60px
- [ ] Headline readable and impactful
- [ ] Description text: 18-20px
- [ ] CTA buttons prominent (48-52px height)
- [ ] Media (image/video) properly sized
- [ ] Vertical centering correct

### Mobile (<1024px)

- [ ] Single-column stacked layout
- [ ] Headline size: 28-36px
- [ ] Description text: 16-18px
- [ ] CTA buttons: 44-48px height
- [ ] CTA buttons full-width or centered
- [ ] Media appears above or below text logically
- [ ] Adequate spacing between elements (24-32px)

### General Hero Checks

- [ ] Background (if any) scales correctly
- [ ] Text readable over background
- [ ] All content above the fold on desktop
- [ ] Hero height appropriate (not too tall/short)
- [ ] No layout shift during load

---

## 🃏 Cards & Grid Layouts

### Grid Behavior

- [ ] Mobile: 1 column
- [ ] Tablet: 2 columns (768px+)
- [ ] Desktop: 3 columns (1024px+)
- [ ] Large: 4 columns (1280px+) if applicable
- [ ] Grid gaps: 16px mobile → 24px desktop
- [ ] Cards align properly in grid
- [ ] No orphaned cards (unbalanced layout)

### Individual Cards

- [ ] Card padding: 12-16px mobile → 16-24px desktop
- [ ] Card images maintain aspect ratio
- [ ] Card titles readable (16-20px)
- [ ] Card descriptions readable (14-16px)
- [ ] Card buttons/links ≥ 44px touch target
- [ ] Hover states work on desktop
- [ ] Cards don't break layout when content varies
- [ ] Equal height cards (if design requires)

---

## 📝 Forms & Inputs

### Form Layout

- [ ] Full-width on mobile
- [ ] Constrained width on desktop (max 600-720px)
- [ ] Centered on desktop
- [ ] Adequate spacing between fields (16-24px)
- [ ] Two-column layout on desktop (if applicable)

### Input Fields

- [ ] Input height: 44-48px
- [ ] Input font size: 14-16px (avoid iOS zoom)
- [ ] Input padding: 12-16px horizontal
- [ ] Labels visible above inputs
- [ ] Placeholders not replacing labels
- [ ] Focus states clearly visible
- [ ] Error messages inline and readable
- [ ] Error states clearly indicated (color + icon)

### Buttons (Form)

- [ ] Submit button height ≥ 44px
- [ ] Submit button full-width on mobile
- [ ] Button text readable (14-16px)
- [ ] Disabled state visually distinct
- [ ] Loading state (if applicable)

### Selects & Dropdowns

- [ ] Select height: 44-48px
- [ ] Dropdown arrow visible
- [ ] Options readable on mobile
- [ ] Touch-friendly on mobile devices

---

## 🔘 Buttons & Interactive Elements

### Button Sizes

- [ ] All buttons ≥ 44×44px (W3C minimum)
- [ ] Primary buttons: 44-52px height
- [ ] Secondary buttons: 40-44px height
- [ ] Icon-only buttons: 44×44px minimum
- [ ] Button padding adequate (horizontal 16-24px)

### Button States

- [ ] Default state clearly styled
- [ ] Hover state visible (desktop)
- [ ] Active/pressed state visible
- [ ] Focus state visible (keyboard navigation)
- [ ] Disabled state clearly indicated
- [ ] Loading state (if applicable)

### Touch Targets

- [ ] All interactive elements ≥ 44×44px
- [ ] Adequate spacing between touch targets (8px minimum)
- [ ] Icons have proper hit area (visual 20-24px, touch 44px)
- [ ] Links in paragraphs have adequate line-height

---

## 🎨 Icons & Graphics

### Icon Sizing

- [ ] Inline icons: 16-20px
- [ ] Button icons: 20-24px (in 44px touch area)
- [ ] Decorative icons: 24-32px
- [ ] Large feature icons: 48-64px
- [ ] Icons scale on larger viewports

### Icon Accessibility

- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Meaningful icons have proper labels
- [ ] Icon-only buttons have `aria-label`
- [ ] Icons don't break layout
- [ ] SVGs optimized and performant

---

## 🪟 Modals & Overlays

### Modal Behavior

- [ ] Modal opens smoothly
- [ ] Modal closes on overlay click
- [ ] Modal closes on ESC key
- [ ] Modal closes on close button click
- [ ] Background scroll locked when modal open
- [ ] Focus trapped within modal
- [ ] Focus returns to trigger on close

### Modal Layout

- [ ] Mobile: Full-screen or near full-screen
- [ ] Desktop: Centered with max-width (600-720px)
- [ ] Modal padding: 24px mobile → 32px desktop
- [ ] Close button ≥ 44×44px
- [ ] Close button clearly visible
- [ ] Modal content scrollable if overflow
- [ ] Modal max-height respects viewport

### Modal Accessibility

- [ ] `role="dialog"` present
- [ ] `aria-modal="true"` present
- [ ] `aria-labelledby` references title
- [ ] Keyboard navigation works
- [ ] Screen reader announces modal

---

## 🦶 Footer

### Footer Layout

- [ ] Mobile: Single column (stacked)
- [ ] Tablet: 2 columns
- [ ] Desktop: 3-4 columns
- [ ] Adequate padding (larger than header)
- [ ] Columns balanced and aligned

### Footer Content

- [ ] All links readable (14-16px)
- [ ] All links have ≥ 44px touch target
- [ ] Social icons ≥ 44×44px
- [ ] Newsletter form usable
- [ ] Copyright text readable
- [ ] Logo/brand visible (if included)

---

## ♿ Accessibility Checks

### Keyboard Navigation

- [ ] All interactive elements focusable
- [ ] Focus order logical (top to bottom, left to right)
- [ ] Focus states clearly visible
- [ ] No keyboard traps
- [ ] Skip to main content link (optional but recommended)

### Screen Reader

- [ ] Semantic HTML used (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] Headings in correct order (h1 → h2 → h3)
- [ ] One h1 per page
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] ARIA labels where needed
- [ ] ARIA roles correct

### Color & Contrast

- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] Large text contrast ≥ 3:1
- [ ] Interactive element contrast ≥ 3:1
- [ ] Color not sole indicator of information
- [ ] Links distinguishable from text

### Motion & Animation

- [ ] Animations respect `prefers-reduced-motion`
- [ ] No auto-playing videos with sound
- [ ] Carousels have pause button
- [ ] Parallax effects optional/reduced

---

## ⚡ Performance Checks

### Loading Performance

- [ ] Page loads in < 3 seconds (3G)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] No layout shift (CLS < 0.1)

### Images

- [ ] Images lazy-loaded (below fold)
- [ ] Responsive images use `srcset`
- [ ] Modern formats used (WebP with fallback)
- [ ] Images compressed/optimized
- [ ] Proper image dimensions set (width/height)

### Scripts & Styles

- [ ] Critical CSS inlined
- [ ] Non-critical CSS deferred
- [ ] JavaScript deferred/async
- [ ] No render-blocking resources
- [ ] Bundle size optimized

### Lighthouse Scores (Target)

- [ ] Performance: ≥ 50 (mobile), ≥ 90 (desktop)
- [ ] Accessibility: ≥ 90
- [ ] Best Practices: ≥ 90
- [ ] SEO: ≥ 90

---

## 🌐 Browser & Device Testing

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Real Device Testing

- [ ] iPhone (any model)
- [ ] Android phone (any model)
- [ ] iPad or Android tablet
- [ ] Desktop/laptop

---

## 🔍 Edge Cases & Stress Tests

### Content Variations

- [ ] Very long text (headlines, paragraphs)
- [ ] Very short text
- [ ] Missing images (broken links)
- [ ] Many items in list/grid (20+ cards)
- [ ] Few items in list/grid (1-2 cards)
- [ ] Empty states

### User Interactions

- [ ] Rapid clicking/tapping
- [ ] Double-tap zoom (mobile)
- [ ] Pinch zoom (mobile)
- [ ] Landscape orientation (mobile/tablet)
- [ ] Portrait orientation (mobile/tablet)
- [ ] Window resize (desktop)

### Network Conditions

- [ ] Slow 3G
- [ ] Fast 3G
- [ ] 4G
- [ ] Offline (if PWA)

---

## 📋 Pre-Launch Checklist

### Final Verification

- [ ] All viewports tested (mobile, tablet, desktop)
- [ ] All browsers tested
- [ ] At least one real device tested
- [ ] Accessibility audit passed
- [ ] Lighthouse scores meet targets
- [ ] No console errors
- [ ] No broken links
- [ ] Forms submit correctly
- [ ] Analytics tracking works
- [ ] SEO meta tags present

### Documentation

- [ ] Responsive guidelines followed
- [ ] Design tokens documented
- [ ] Component library up to date
- [ ] Known issues logged
- [ ] Browser support documented

---

## 🛠️ Testing Tools

### Browser DevTools

- **Chrome DevTools**: Device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
- **Firefox Responsive Mode**: (Ctrl+Shift+M / Cmd+Option+M)
- **Safari Responsive Mode**: Develop > Enter Responsive Design Mode

### Online Tools

- **Responsive Checker**: [responsivedesignchecker.com](https://responsivedesignchecker.com)
- **BrowserStack**: Real device testing
- **LambdaTest**: Cross-browser testing
- **Sizzy**: Multi-device preview

### Lighthouse

```bash
# Chrome DevTools > Lighthouse tab
# Or CLI:
npm install -g lighthouse
lighthouse https://example.com --view
```

### Accessibility

- **axe DevTools**: Browser extension
- **WAVE**: [wave.webaim.org](https://wave.webaim.org)
- **Contrast Checker**: [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)

---

## 📝 Bug Report Template

```markdown
### Issue Description
[Brief description of the issue]

### Viewport/Device
- Device: [e.g., iPhone 12, Desktop]
- Screen Size: [e.g., 375×812]
- Browser: [e.g., Safari 15]
- OS: [e.g., iOS 15]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots
[Attach screenshots if applicable]

### Severity
- [ ] Critical (blocks usage)
- [ ] High (major functionality affected)
- [ ] Medium (minor functionality affected)
- [ ] Low (cosmetic issue)
```

---

## ✅ Sign-Off

### Tested By

- **Name**: ___________________
- **Date**: ___________________
- **Role**: ___________________

### Approval

- [ ] All critical issues resolved
- [ ] All high-priority issues resolved
- [ ] Medium/low issues logged for future
- [ ] Ready for production deployment

**Approved By**: ___________________  
**Date**: ___________________

---

**Checklist Version**: 1.0  
**Last Updated**: 2024-12-09  
**Project**: ReVeo Studio
