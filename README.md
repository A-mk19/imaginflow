# Imaginflow.io 🌊
> Visual app builder — imagine your app, flow it into reality.

---

## 🧠 Dev Journal — Learning Log

### 📅 7 Jun 2026 — React Basics

---

## Topic 1 — Components

**Core idea:**
> Everything in React is a component. A component is just a function that returns HTML.

In plain HTML/JS you write everything in one file and manually update the page.
In React you break the UI into small reusable pieces called components.

**Rules:**
- Component names always start with a Capital letter
- Every component must return HTML (JSX)
- Components can be used like HTML tags: `<Header />`

**How it works:**

```
App (root)
├── Header         → shows title and subtitle
└── Sidebar        → contains the tools list
    ├── ToolItem   → "Select"
    ├── ToolItem   → "Rectangle"
    ├── ToolItem   → "Text"
    └── ToolItem   → "Circle"
```

**Visual:**

```
┌─────────────────────────────────┐
│  App                            │
│  ┌───────────────────────────┐  │
│  │  Header                   │  │
│  │  Imaginflow.io            │  │
│  │  Visual app builder       │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Sidebar                  │  │
│  │  ┌─────────┐              │  │
│  │  │ToolItem │ "Select"     │  │
│  │  └─────────┘              │  │
│  │  ┌─────────┐              │  │
│  │  │ToolItem │ "Rectangle"  │  │
│  │  └─────────┘              │  │
│  │  ┌─────────┐              │  │
│  │  │ToolItem │ "Text"       │  │
│  │  └─────────┘              │  │
│  │  ┌─────────┐              │  │
│  │  │ToolItem │ "Circle"     │  │
│  │  └─────────┘              │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Sample code:**
```jsx
function Header() {
  return (
    <div>
      <h1>Imaginflow.io</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />   // used like an HTML tag
    </div>
  )
}
```

---

## Topic 2 — Props

**Core idea:**
> Props are like parameters for components. Instead of hardcoding values inside a component, you pass them from outside.

**Without props** — hardcoded, not reusable:
```jsx
function ToolItem() {
  return <p>Select</p>   // always shows "Select", useless
}
```

**With props** — flexible, reusable:
```jsx
function ToolItem(props) {
  return <p>{props.name}</p>   // shows whatever you pass in
}

// use it:
<ToolItem name="Select" />
<ToolItem name="Rectangle" />
<ToolItem name="Circle" />
```

**How props flow:**

```
Sidebar
  │
  │  passes name="Select"
  ▼
ToolItem(props)
  │
  │  reads props.name → "Select"
  ▼
<p>Select</p>
```

**Visual:**

```
┌──────────────────────────────────────┐
│  Sidebar                             │
│                                      │
│  <ToolItem name="Select" />   ──┐    │
│  <ToolItem name="Rectangle" /> ─┼──► │  ToolItem(props)
│  <ToolItem name="Text" />      ─┘    │  returns <p>{props.name}</p>
│  <ToolItem name="Circle" />         │
└──────────────────────────────────────┘

Each call passes a different name.
Same component. Different output. That's props.
```

**Rules:**
- Props go in as `name="value"` on the tag
- Props come out as `props.name` inside the component
- Props flow one way — parent → child only
- `style={{ }}` needs double curly braces — outer `{}` = JS, inner `{}` = object
- Colors always need `#` — `"#888"` not `"888"`

---

## Topic 3 — State (useState)

**Core idea:**
> State is data that lives inside a component and can change. When state changes, React automatically updates the screen.

**Props vs State:**

```
Props  → data passed IN from outside  → cannot change inside component
State  → data that lives INSIDE       → can change anytime
```

**The whiteboard analogy:**
```
Whiteboard         = state
Writing on it      = setSelectedTool()
Everyone seeing it = React auto-updates the screen
```

**Syntax:**
```jsx
import { useState } from "react"

const [selectedTool, setSelectedTool] = useState("Select")
//     │              │                           │
//     │              │                           └── starting value
//     │              └── function to CHANGE the value
//     └── variable to READ the value
```

**Names are not keywords — just conventions:**
```
const           → JavaScript keyword  (real)
useState        → React function      (real)
selectedTool    → name you made up
setSelectedTool → name you made up
isSelected      → name you made up
onSelect        → name you made up
```

---

**Three concepts that work together:**

### 1. State — the whiteboard
```jsx
const [selectedTool, setSelectedTool] = useState("Select")
```
Holds the current value. Starts as "Select".

---

### 2. onSelect — the trigger
```jsx
onClick={() => props.onSelect(props.name)}
```
When you click a tool → fires → calls setSelectedTool → state changes.

```
onSelect is NOT a keyword
onSelect is a prop that carries setSelectedTool from App down to ToolItem

App
│  setSelectedTool         (the real function)
│  passed as onSelect
│
└── Sidebar
      │  received as props.onSelect
      │  passed again as onSelect
      │
      └── ToolItem
            clicked!
            props.onSelect("Rectangle")
            = setSelectedTool("Rectangle")
            state changes ✅
```

---

### 3. isSelected — the reaction
```jsx
isSelected={props.selectedTool === "Rectangle"}
```
After state changes → checks if current tool matches → returns true or false → updates color.

```
isSelected is NOT a condition itself
isSelected HOLDS the result of a condition

selectedTool = "Rectangle"

ToolItem "Select"    → "Rectangle" === "Select"    → false → grey
ToolItem "Rectangle" → "Rectangle" === "Rectangle" → true  → purple
ToolItem "Text"      → "Rectangle" === "Text"      → false → grey
ToolItem "Circle"    → "Rectangle" === "Circle"    → false → grey
```

---

**Full flow — what happens when you click "Rectangle":**

```
Click "Rectangle"
       ↓
onSelect("Rectangle") fires        ← trigger
       ↓
setSelectedTool("Rectangle") runs  ← state changes
       ↓
React re-renders                   ← automatic
       ↓
isSelected checks each ToolItem    ← reaction
       ↓
"Rectangle" turns purple
everything else turns grey         ← UI updates
```

---

**Visual — how everything connects:**

```
┌─────────────────────────────────────────────────┐
│  App                                            │
│                                                 │
│  selectedTool = "Rectangle"  ← state            │
│  setSelectedTool passed as onSelect             │
│        │                                        │
│        ▼                                        │
│  ┌─────────────────────────────────────────┐    │
│  │  Sidebar (props)                        │    │
│  │  props.selectedTool = "Rectangle"       │    │
│  │  props.onSelect = setSelectedTool       │    │
│  │                                         │    │
│  │  ┌───────────────────────────────────┐  │    │
│  │  │ToolItem "Select"                  │  │    │
│  │  │isSelected = false → color grey    │  │    │
│  │  └───────────────────────────────────┘  │    │
│  │  ┌───────────────────────────────────┐  │    │
│  │  │ToolItem "Rectangle" ← CLICKED     │  │    │
│  │  │isSelected = true  → color purple  │  │    │
│  │  └───────────────────────────────────┘  │    │
│  │  ┌───────────────────────────────────┐  │    │
│  │  │ToolItem "Text"                    │  │    │
│  │  │isSelected = false → color grey    │  │    │
│  │  └───────────────────────────────────┘  │    │
│  │  ┌───────────────────────────────────┐  │    │
│  │  │ToolItem "Circle"                  │  │    │
│  │  │isSelected = false → color grey    │  │    │
│  │  └───────────────────────────────────┘  │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**The golden rule of state:**
> Never change state directly.
> `selectedTool = "Circle"` ❌
> `setSelectedTool("Circle")` ✅

**One line summary:**
> State is the memory of your app. Triggers change it. React reacts to it.

---

## 🐛 Bugs Fixed — All 3 Lessons

| Bug | Wrong | Correct |
|-----|-------|---------|
| Component name lowercase | `function sidebar()` | `function Sidebar()` |
| Wrong style brackets | `style={({ color: "888" })}` | `style={{ color: "#888" }}` |
| Missing `#` in color | `"888"` | `"#888"` |
| Props not in parameters | `function Sidebar()` | `function Sidebar(props)` |
| Case sensitive prop name | `props.SelectedTool` | `props.selectedTool` |

---

## 📦 Tech Stack
- React (Vite)
- JavaScript
- Tailwind CSS *(coming soon)*
- Firebase *(coming soon)*
- Spring Boot *(coming soon)*

---

## one line definations

- **Components** — functions that return HTML and are used as tags to build the UI.

- **Props** — data passed into a component from outside to make it reusable.

- **State** — data that lives inside a component and when changed, React updates the screen automatically.

# Imaginflow.io 🌊
## Day 2 Notes — 8 Jun 2026
### Tailwind CSS + Full Layout Skeleton

---

## Topic 1 — Tailwind CSS

**Core idea:**
> Tailwind is just shortcuts for CSS. Every class = one CSS property. That's it.

**The pattern is always:**
```
property - value
bg       - gray-900    →   background-color: dark gray
text     - purple-400  →   color: purple
p        - 3           →   padding: 12px
```

---

### Colors
```
bg-{color}-{shade}      →   background color
text-{color}-{shade}    →   text color
border-{color}-{shade}  →   border color

shades: 50 100 200 300 400 500 600 700 800 900 950
        lighter ←————————————————————→ darker
```

**Visual — Gray shades:**
```
50  ░░░░  100 ░░░░  200 ░░░░  300 ░░░░  400 ░░░░
500 ████  600 ████  700 ████  800 ████  900 ████  950 ████
light                                           dark
```

---

### Spacing (padding & margin)
```
p-{n}    →   padding all sides
px-{n}   →   padding left + right   (x = horizontal)
py-{n}   →   padding top + bottom   (y = vertical)
pt/pb/pl/pr  →   padding one side

m-{n}    →   margin all sides
mx/my/mt/mb/ml/mr  →   same pattern as padding

1 unit = 4px
p-1 = 4px   p-2 = 8px   p-3 = 12px
p-4 = 16px  p-6 = 24px  p-8 = 32px
```

**Visual:**
```
p-1  [▏] 4px
p-2  [▎] 8px
p-3  [▍] 12px
p-4  [▌] 16px
p-6  [▊] 24px
p-8  [█] 32px
```

**Key rule:**
> x = horizontal (left + right)
> y = vertical (top + bottom)
> Same as math — x axis goes sideways, y axis goes up/down

---

### Sizing
```
w-{n}      →   width  (same units, 1=4px)
h-{n}      →   height (same units, 1=4px)
w-full     →   width 100%
h-full     →   height 100%
h-screen   →   height 100vh (full screen)
w-screen   →   width 100vw
flex-1     →   takes all remaining space
```

**Visual — flex-1:**
```
┌──────────────────────────────────────────┐
│ w-48 sidebar │  flex-1 canvas  │ w-64 props│
│   192px      │ takes the rest  │  256px    │
└──────────────────────────────────────────┘
```

---

### Layout — Flexbox
```
flex              →   enable flexbox on container
flex-row          →   children side by side (default)
flex-col          →   children stacked vertically
items-center      →   center on cross axis
items-start       →   align to start
items-end         →   align to end
justify-center    →   center on main axis
justify-between   →   space between children
gap-{n}           →   space between children
overflow-hidden   →   hide overflow content
ml-auto           →   push element to far right
```

**Visual:**
```
flex-row:                    flex-col:
┌────┬────┬────┐             ┌────┐
│ A  │ B  │ C  │             │ A  │
└────┴────┴────┘             ├────┤
                             │ B  │
                             ├────┤
                             │ C  │
                             └────┘

justify-between:             items-center (in tall box):
┌─────────────────┐          ┌──────┐
│A      B       C │          │      │
└─────────────────┘          │ ABC  │
                             │      │
                             └──────┘
```

---

### Text
```
text-xs    →   12px
text-sm    →   14px
text-base  →   16px
text-lg    →   18px
text-xl    →   20px
text-2xl   →   24px
text-3xl   →   30px

font-normal    →   weight 400
font-medium    →   weight 500
font-semibold  →   weight 600
font-bold      →   weight 700

text-left      →   align left (default)
text-center    →   align center
text-right     →   align right

uppercase      →   ALL CAPS
tracking-widest →  wide letter spacing
```

---

### Border & Radius
```
border          →   1px solid border (MUST come before border-color)
border-{color}  →   border color (needs border first!)
border-t/b/l/r  →   one side only

rounded         →   small radius
rounded-lg      →   larger radius
rounded-full    →   circle
```

**Bug fixed:**
```jsx
// wrong - border-white alone does nothing
className="border-white"

// correct - need border first
className="border border-white"
```

---

### Hover & Cursor
```
hover:bg-{color}    →   background on hover
hover:text-{color}  →   text color on hover
cursor-pointer      →   hand cursor
cursor-crosshair    →   crosshair cursor (used on canvas)
```

---

## Topic 2 — Imaginflow Layout Built

**Final layout structure:**
```
┌─────────────────────────────────────────────────┐
│  HEADER  (h-16, bg-slate-950)                   │
│  Logo │ Project Name │ Icons + Buttons           │
├─────────────────────────────────────────────────┤
│  TOOLBAR  (h-8, bg-slate-950)                   │
│  Components │ Design │ Functions │ Connections  │
│  Execution │ Backend │ Database                 │
├──────────┬──────────────────────────┬────────────┤
│          │                          │            │
│ SIDEBAR  │       CANVAS             │ PROPERTIES │
│ w-50     │       flex-1             │ w-50       │
│ bg-slate │       bg-white           │ bg-slate   │
│ -950     │                          │ -950       │
│          │  [floating bottom bar]   │            │
└──────────┴──────────────────────────┴────────────┘
```

**Component tree:**
```
App
├── Header
├── ToolBar
│   └── Tools (×7)
└── Middle
    ├── SideBar
    ├── Canvas
    └── RightSidebar
```

---

## Topic 3 — useRef

**Core idea:**
> useRef gives you a direct reference to a DOM element so you can control it directly from code.

```jsx
const canvasRef = useRef(null)

// attach to element
<div ref={canvasRef}>

// now you can control it directly
canvasRef.current.scrollLeft += 100
```

Used in Canvas for horizontal scroll with Shift + scroll wheel.

---

## Topic 4 — Zoom with Scroll Wheel

**Core idea:**
> `onWheel` event fires when user scrolls. `e.deltaY` tells direction.

```jsx
function handleZoom(e) {
  e.preventDefault()

  // SHIFT + SCROLL = horizontal pan
  if (e.shiftKey) {
    canvasRef.current.scrollLeft += e.deltaY
    return
  }

  // scroll up = zoom in
  if (e.deltaY < 0) {
    setZoom(prev => Math.min(prev + 0.1, 3))    // max 3x
  }
  // scroll down = zoom out
  else {
    setZoom(prev => Math.max(prev - 0.1, 0.2))  // min 0.2x
  }
}
```

**Key rules:**
```
e.deltaY < 0  →  scroll UP
e.deltaY > 0  →  scroll DOWN

Math.min(value, max)  →  never goes above max
Math.max(value, min)  →  never goes below min

prev =>  →  safer way to update state based on previous value
```

**Apply zoom to element:**
```jsx
style={{
  transform: `scale(${zoom})`,      // backticks ` ` not quotes ' '
  transformOrigin: "top left"        // zoom from this point
}}
```

**CRITICAL bug fixed:**
```jsx
// wrong - single quotes, ${zoom} never works
transform: 'scale(${zoom})'

// correct - backticks allow JS variables
transform: `scale(${zoom})`
```

---

## Topic 5 — Lucide React Icons

**Install:**
```bash
npm install lucide-react
```

**Import and use:**
```jsx
import { Undo2, Redo2, PanelLeftClose, Check } from "lucide-react"

<Undo2 size={18} className="text-gray-400 hover:text-white cursor-pointer" />
```

**Icons used in Imaginflow:**
```
Undo2           →   undo action
Redo2           →   redo action
PanelLeftClose  →   hide left sidebar
PanelRightClose →   hide right properties
PanelBottomClose →  hide bottom bar
Check           →   save button
Eye             →   preview button
Download        →   deploy button
```

---

## 🐛 Bugs Fixed — Day 2

| Bug | Wrong | Correct |
|-----|-------|---------|
| JSX uses className not class | `class="flex"` | `className="flex"` |
| border needs border first | `border-white` | `border border-white` |
| w-{n} not px value | `w-48 = 48px` | `w-48 = 192px (×4)` |
| backticks for JS in strings | `'scale(${zoom})'` | `` `scale(${zoom})` `` |
| h-screen only once | Middle had `h-screen` | Middle uses `flex-1` |
| prop name case sensitive | `selectTools` | `selectedTools` |
| fixed width conflicts padding | `w-6 px-4` on button | remove `w-6` |
| Capital S in Scale | `transform: Scale()` | `transform: scale()` |

---

## One Line Summaries

> **Tailwind** — CSS shortcuts, every class = one property, pattern is property-value

> **className** — React uses className not class because class is a JS keyword

> **flex-1** — takes all remaining space after fixed-width siblings

> **h-screen only once** — only root div gets h-screen, children use flex-1

> **onWheel** — fires on scroll, deltaY < 0 is up, deltaY > 0 is down

> **Backticks** — use backticks for strings with JS variables, not quotes

---

## 📦 What's Installed
- React (Vite) ✅
- Tailwind CSS (@tailwindcss/vite) ✅
- lucide-react ✅

## 🗺️ Roadmap
- [x] Project setup
- [x] React components
- [x] Props
- [x] State (useState)
- [x] Tailwind CSS
- [x] Full layout skeleton
- [x] Zoom with scroll
- [ ] Canvas panning (click + drag)
- [ ] react-konva setup
- [ ] Draggable objects on canvas
- [ ] Material panel
- [ ] Firebase auth
- [ ] Backend blocks
- [ ] Deployment