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
    <p style={{ color: "#888", fontSize: "14px" }}>{props.name}</p>
  )
}

function Sidebar() {
  return (
    <div style={{ padding: "20px" }}>
      <ToolItems name="Select" />
      <ToolItems name="Rectangle" />
      <ToolItems name="Text" />
      <ToolItems name="Circle" />
    </div>
  )
}

function App() {
  return (
    <div >
      <Header />
      <Sidebar />
    </div>
  )
}

export default App