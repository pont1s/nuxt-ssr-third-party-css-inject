# Nuxt UI Kit Demo

This repository demonstrates a CSS injection bug on SSR (Server-Side Rendering) in Nuxt.

## Bug: CSS styles not injected during SSR

When using a UI component library with Nuxt SSR, the component styles are not included in the server-rendered HTML. This causes a flash of unstyled content (FOUC) or completely missing styles when JavaScript is disabled.

## Steps to Reproduce

### 1. Install dependencies

```bash
pnpm i
```

### 2. Build the Nuxt demo app

```bash
cd apps/nuxt-demo
pnpm run build
```

### 3. Start the preview server

```bash
pnpm run preview
```

### 4. Open the app and disable JavaScript

1. Open http://localhost:3000 in your browser
2. Open DevTools (F12)
3. Disable JavaScript for the tab:
   - Chrome: DevTools → Settings (F1) → Debugger → Disable JavaScript
   - Or: DevTools → Cmd+Shift+P → "Disable JavaScript"
4. Reload the page

## Expected Result

Button styles should be visible (red button) even with JavaScript disabled, as styles should be injected into the SSR-rendered HTML.

## Actual Result

Button styles are missing. The button appears unstyled because CSS is not injected during server-side rendering.

## Project Structure

```
├── apps/
│   ├── nuxt-demo/     # Nuxt 3 app demonstrating the bug
│   └── vue-demo/      # Vue 3 app (for comparison)
├── packages/
│   └── ui/            # Shared UI component library
└── ...
```
