# Imaginflow.io
Visual app builder — drag, connect, deploy.
Started: 7 June 2026

---

## Week 1 — React Fundamentals

### Topic 1 — Components
- Everything in React is a component
- A component is just a function that returns HTML
- Component names must always start with a Capital letter
- App() is the root component — everything lives inside it
- You use a component like an HTML tag: <Header />
- React treats lowercase tags as HTML, uppercase as your components

### Topic 2 — Props
- Props are like parameters for a component
- They let you pass data from outside instead of hardcoding
- You pass props like attributes: <ToolItem name="Select" />
- You read props inside the component: {props.name}
- Same component, different data each time — that's the power of props
- style={{ }} needs double curly braces — outer {} means JS, inner {} is the object
- Colors always need # — "#888" not "888"

---

## Project Structure
- Header — top bar with project name
- Sidebar — tools panel (Select, Rectangle, Text, Circle)
- ToolItem — reusable single tool button component
- App — root component that holds everything