import { useState } from "react"

function Header() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#a78bfa" }}>Imaginflow.io</h1>
      <p style={{ color: "#888", fontSize: "14px" }}>
        Visual app builder
      </p>
    </div>
  )
}

function ToolItems(props) {
  return (
    <p onClick={() => props.onSelect(props.name)}
      style={{
        color: props.isSelected ? "#fff" : "#888", fontSize: "14px"
      }}> {props.name}</p >
  )
}

function Sidebar(props) {

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: "#a78bfa" }}>Tools</h3>
      <p>{props.selectedTool}</p>
      <ToolItems name="Select" isSelected={props.selectedTool === "Select"} onSelect={props.onSelect} />
      <ToolItems name="Rectangle" isSelected={props.selectedTool === "Rectangle"} onSelect={props.onSelect} />
      <ToolItems name="Text" isSelected={props.selectedTool === "Text"} onSelect={props.onSelect} />
      <ToolItems name="Circle" isSelected={props.selectedTool === "Circle"} onSelect={props.onSelect} />
    </div>
  )
}

function App() {
  const [selectedTool, setSelectedTool] = useState("Select")

  return (
    <div >
      <Header />
      <p>{selectedTool}</p>
      <Sidebar selectedTool={selectedTool} onSelect={setSelectedTool} />
    </div>
  )
}

export default App