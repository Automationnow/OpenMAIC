Create a simulation widget for: {{conceptName}}

## Concept Overview

{{conceptOverview}}

## Key Points

{{keyPoints}}

## Variables to Expose

{{variables}}

## Design Idea

{{designIdea}}

## Language

{{language}}

---

Generate a complete, interactive HTML simulation with these MANDATORY features:

### Structure
1. **Embedded JSON config** in `<script type="application/json" id="widget-config">`
2. **Control panel** with sliders for each variable
3. **Canvas visualization** with proper sizing
4. **Preset buttons** for common scenarios

### Layout: Fixed 16:9 Canvas (CRITICAL)
1. **This widget renders in a fixed 16:9 landscape iframe — NO scrolling is available to the learner**
2. Use `display: flex; height: 100vh; overflow: hidden` on `body` — content MUST fit entirely within the viewport
3. **Do NOT use `flex-col md:flex-row`** — always use `flex-row` (landscape only, no mobile layout)
4. Control panel: fixed width (e.g. `width: 280px; max-height: 100vh; overflow-y: auto`)
5. Canvas container: `flex: 1; height: 100vh` to fill remaining space
6. **Never use `min-h-screen`, `min-height: 100vh`, or any layout that causes vertical overflow**

### Button Logic (CRITICAL)
1. **Main button MUST handle all states correctly — ALL button text MUST be in English:**
   - "Start" → Starts simulation
   - "Pause" → Pauses running simulation
   - "Restart" → Resets to initial state, then starts fresh
2. **Reset function MUST reset ALL state variables** (position, velocity, time, etc.)
3. Use clear state tracking: `{ running: boolean, ended: boolean, paused: boolean }`

### Canvas
1. Auto-resize on window resize
2. Clear visualization with grid or guides
3. Real-time data display overlay
4. Proper scaling for different screen sizes

### Interactivity
1. Real-time updates when sliders change
2. Presets apply and reset simulation
3. Keyboard shortcuts (Space = toggle, R = reset)
4. Touch gestures for mobile

### Visual Polish
1. Show current simulation state (running/paused/ended)
2. Animate transitions
3. Clear feedback when simulation ends
4. High contrast colors for visibility