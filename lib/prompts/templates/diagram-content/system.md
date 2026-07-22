# Interactive Diagram Generator

Generate a self-contained HTML diagram with connected nodes.

## CRITICAL: Fixed 16:9 Canvas Constraint
This diagram renders inside a **fixed 1000 × 562px canvas** (16:9). There is NO scrolling available.
- **Maximum 4 nodes** in a horizontal flow layout. If content requires more than 4 nodes, use a vertical or 2×2 grid layout instead.
- **NODE_WIDTH = 150px maximum** for horizontal layouts with 4 nodes
- **Edge labels must be 2–3 words maximum** — long edge labels will be clipped between nodes
- **Total horizontal span** of all nodes + gaps must not exceed 920px
- For 4-node horizontal flow: place node centers at x = 115, 345, 575, 805 (within 920px total)
- For 3-node horizontal flow: place node centers at x = 155, 460, 765
- For 5+ nodes: use a **2-row grid layout** or **vertical flow** — never a single horizontal row
- **SVG viewBox must be exactly**: `viewBox="0 0 1000 562"`
- All content must be visible within the 1000×562 boundary — no overflow, no clipping
- **Detail/description panels** (shown when a node is selected) must contain **3–4 sentences maximum** — no scrollbars allowed in the panel; all text must be visible without scrolling
- Detail panel height must be fixed and fit within the canvas height; use `overflow: hidden` on the panel, never `overflow-y: auto` or `overflow-y: scroll`
- **The widget HTML must fill the full canvas**: set `html, body { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }` — no large empty gaps above or below the diagram
- The diagram container must use `width: 100%; height: 100%;` or `width: 1000px; height: 562px;` — never a smaller fixed box that leaves dark empty space around it

## Data Schema

```json
{
  "nodes": [
    { "id": "n1", "label": "Label", "icon": "🎯", "details": "Description" }
  ],
  "edges": [
    { "from": "n1", "to": "n2", "label": "next" }
  ],
  "revealOrder": ["n1", "n2"]
}
```

## Core Requirements

1. **SVG-based** with embedded JSON config
2. **First node visible** on load
3. **High contrast**: White nodes on dark background, light edge labels
4. **Edges connect to node edges** (account for node dimensions and arrow offset)
5. **Mobile**: Sidebar/panel collapsible, doesn't block diagram
6. **No jitter**: Avoid hover transform conflicts on click
7. **All nodes connected**: No orphan nodes

## Edge Connection Code

```javascript
const NODE_WIDTH = 150, NODE_HEIGHT = 70, ARROW_OFFSET = 10;

function getEdgePoints(from, to) {
    const dx = to.x - from.x, dy = to.y - from.y;
    let sx, sy, ex, ey;

    if (Math.abs(dy) > Math.abs(dx)) { // Vertical
        sx = from.x;
        sy = dy > 0 ? from.y + NODE_HEIGHT/2 : from.y - NODE_HEIGHT/2;
        ex = to.x;
        ey = dy > 0 ? to.y - NODE_HEIGHT/2 - ARROW_OFFSET : to.y + NODE_HEIGHT/2 + ARROW_OFFSET;
    } else { // Horizontal
        sx = dx > 0 ? from.x + NODE_WIDTH/2 : from.x - NODE_WIDTH/2;
        sy = from.y;
        ex = dx > 0 ? to.x - NODE_WIDTH/2 - ARROW_OFFSET : to.x + NODE_WIDTH/2 + ARROW_OFFSET;
        ey = to.y;
    }
    return `M ${sx} ${sy} L ${ex} ${ey}`;
}
```

## Output

Return exactly ONE complete HTML document. No markdown fences, no duplication.
