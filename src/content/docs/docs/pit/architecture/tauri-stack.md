---
title: "Tauri Stack"
description: "[Tauri](https://tauri.app) is a Rust framework for building desktop apps with web-based UIs. Unlike Electron (which bundles Chromium, ~250 MB overhead), Taur..."
---

> Tauri 2 + React + TypeScript + Tailwind + shadcn/ui + Zustand. Rust backend hosting a system webview.

## What Tauri is

[Tauri](https://tauri.app) is a Rust framework for building desktop apps with web-based UIs. Unlike Electron (which bundles Chromium, ~250 MB overhead), Tauri uses the **system's native webview** (WebView2 on Windows, WKWebView on macOS, WebKitGTK on Linux). This gives:

- **~80–100 MB total app size** vs Electron's 250+ MB
- **Better memory usage** (no second browser running)
- **Native OS look-and-feel** for window chrome
- **Rust backend** is a first-class citizen, not a glued-on subprocess

## How Tauri talks to React

Two mechanisms:

### Tauri commands (UI → Rust)

JavaScript calls Rust functions like normal async APIs:

```typescript
import { invoke } from "@tauri-apps/api/core";

const patches = await invoke<Patch[]>("load_song", { songId: "abc" });
```

On the Rust side:
```rust
#[tauri::command]
async fn load_song(song_id: String) -> Result<Vec<Patch>, String> {
    // ... business logic ...
}
```

Tauri auto-generates the IPC bridge. Round-trip time: sub-microsecond when in-process.

### Tauri events (Rust → UI)

Rust pushes updates to the webview:

```rust
app_handle.emit("meter-update", MeterData { l: -3.0, r: -3.5 })?;
```

```typescript
import { listen } from "@tauri-apps/api/event";

await listen<MeterData>("meter-update", (event) => {
    setMeter(event.payload);
});
```

Used for real-time UI updates: meter levels, MIDI activity dots, patch-change notifications.

## The full stack

| Layer | Tech | Purpose |
|---|---|---|
| **Audio engine** | Rust + Overture | Real-time audio processing, plugin hosting |
| **App orchestration** | Rust + Tauri | Show/Song/Patch model, file I/O, command dispatch |
| **IPC** | Tauri commands + events | UI ↔ Rust communication |
| **UI runtime** | System webview (WebView2 / WKWebView) | Renders HTML/CSS/JS |
| **UI framework** | React 18 + TypeScript | Component model |
| **Styling** | Tailwind CSS + shadcn/ui | Design system |
| **State** | Zustand | Lightweight state management |
| **Build** | Vite | Fast dev server, fast builds |
| **Component dev** | Storybook 8 | Isolated component development |
| **Testing** | Vitest + Playwright | Unit + E2E |

## Why these specific choices

### React over Vue/Svelte
- Largest ecosystem
- shadcn/ui is excellent and React-specific
- Tauri Mobile docs / examples lean React
- Hiring (if we ever hire) easiest

### TypeScript not JavaScript
- The data model (Show, Song, Patch, MIDI message, etc.) benefits enormously from typing
- Tauri-generated bindings are typed

### Tailwind + shadcn/ui
- shadcn/ui = headless, customizable component primitives
- Tailwind = utility-first CSS, fast iteration
- Both work seamlessly with Storybook
- Theme tokens (CSS variables) make light/dark/high-contrast trivial

### Zustand over Redux / MobX
- Tiny (~1KB)
- No boilerplate
- Works perfectly with React Hooks
- Easy to reason about for a small-to-medium app

### Vite over webpack
- Faster dev server (sub-second HMR)
- Better defaults
- Tauri's official template uses Vite

## Process model

Tauri starts ONE main process (Rust). That process:
1. Runs the Tauri runtime + main event loop
2. Runs Stardust's app code (Show/Song/Patch model, command handlers)
3. **Embeds Overture** (audio library) — runs the audio thread inside this same process
4. Spawns a system webview process for the UI (managed by Tauri)
5. **Spawns child processes per VST plugin** for [sandboxing](/docs/pit/reliability/plugin-crash-isolation/)

Total process count: 1 (Stardust) + 1 (webview, OS-managed) + N (plugins) = typically 5–15 processes for a real Show.

## What about Electron

Comparison for the record:

| | Tauri 2 | Electron |
|---|---|---|
| Backend lang | Rust | Node.js |
| Webview | System | Bundled Chromium |
| Bundle size | ~10 MB installer, ~80 MB installed | ~50 MB installer, ~250 MB installed |
| Memory | Lower | Higher (full Chromium instance) |
| Audio | Pure Rust (CPAL, etc.) | Via Node native modules |
| Native APIs | Direct Rust | node-ffi / native modules |
| Maturity | 2022+ stable | 2013+ mature |

For an audio app, Rust + Tauri is the right call. Audio processing wants to be in a system language anyway.

## What about Native (no webview)

We considered:
- **egui / iced** — pure Rust UI frameworks
- **Native macOS Swift + Windows WPF** — separate UIs per platform
- **Qt / GTK** — cross-platform native toolkits

Verdict: webview gives us **familiar UI tools (React) + faster iteration + good-enough performance**. Native UI frameworks in Rust are not yet mature enough for an app this UI-heavy. Cross-platform native (Qt/GTK) carries its own legacy.

## Performance

The webview runs UI rendering. Tauri commands are sub-microsecond. The audio thread is fully Rust, doesn't go through the webview, doesn't even know it exists.

So: UI runs at 30-60 FPS for animations, audio thread runs at 375 callbacks/sec (at 128 samples / 48 kHz), they coexist with no contention because they're independent.

## Related pages

- [Architecture Overview](/docs/pit/architecture/overview/)
- [Real-Time Audio](/docs/pit/reliability/latency-budget/)
- [Plugin Sandboxing](/docs/pit/reliability/plugin-crash-isolation/)
- Screen Inventory
- [ADR: Why Rust + Tauri](/docs/pit/architecture/tauri-stack/)
