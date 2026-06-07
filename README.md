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

## 🗺️ Roadmap
- [x] Project setup
- [x] React components
- [x] Props
- [x] State (useState)
- [ ] Canvas with react-konva
- [ ] Material panel
- [ ] Firebase auth
- [ ] Backend blocks
- [ ] Deployment