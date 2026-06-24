import { useState, useRef } from "react"
import { PanelLeftClose, PanelRightClose, PanelBottomClose, Undo2, Redo2, Check, Eye, Download } from "lucide-react"


// {brand and header options section}
function Header(props) {
  return (
    <div className="flex px-4 h-16 bg-slate-950 items-center">

      {/* Left - Brand block */}
      <div className="flex">
        <img className="w-15 h-15" src="image copy.png" alt="" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold text-violet-500">Imaginflow.io</h1>
          <p className="text-gray-400 text-xs text-right font-semibold">imagin to build</p>
        </div>
      </div>

      {/* center-project-title */}
      <div className="flex-1 text-center">
        <h2 className="text-gray-50">Project Name</h2>
      </div>

      {/* right buttons */}
      <div className="flex items-center gap-4 text-center ">
        <Undo2 className="text-gray-400 cursor-pointer hover:text-white" size={18} />
        <Redo2 className="text-gray-400 cursor-pointer hover:text-white" size={18} />
        <PanelLeftClose onClick={props.toggelLeft} className="text-gray-400 cursor-pointer hover:text-white" size={18} />
        <PanelRightClose onClick={props.toggelRight} className="text-gray-400 cursor-pointer hover:text-white" size={18} />
        <PanelBottomClose onClick={props.toggelBottom} className="text-gray-400 cursor-pointer hover:text-white" size={18} />
        <button className="bg-green-500  hover:bg-gray-50 px-4 py-1 rounded-lg flex items-center justify-center gap-1"><Check size={14} /></button>
        <button className="bg-yellow-500 hover:bg-gray-50 px-4 py-1 rounded-lg flex items-center justify-center gap-1"><Eye size={14} /></button>
        <button className="bg-blue-500 hover:bg-gray-800 px-4 py-1 rounded-lg flex items-center justify-center gap-1"><Download size={14} /></button>
      </div>

    </div >
  )
}

// tool-bar props
function Tools(props) {
  return (
    <div>
      <h1 className={`font-semibold cursor-pointer px-3 py-1 text-xs  rounded ${props.isSelected ? "bg-white text-black" : "text-white"}`} onClick={() => props.onSelect(props.name)}>{props.name}</h1>
    </div >
  )
}


//Toolbar tab-options

function ToolBar(props) {
  return (
    <div className="flex bg-slate-950 h-8 gap-5 items-center p-2 border-y-1 border-gray-50">
      <Tools name="Components" isSelected={props.selectedTools === "Components"} onSelect={props.onSelect} />
      <Tools name="Design" isSelected={props.selectedTools === "Design"} onSelect={props.onSelect} />
      <Tools name="Functions" isSelected={props.selectedTools === "Functions"} onSelect={props.onSelect} />
      <Tools name="Connections" isSelected={props.selectedTools === "Connections"} onSelect={props.onSelect} />
      <Tools name="Execution" isSelected={props.selectedTools === "Execution"} onSelect={props.onSelect} />
      <Tools name="Backend" isSelected={props.selectedTools === "Backend"} onSelect={props.onSelect} />
      <Tools name="Database" isSelected={props.selectedTools === "Database"} onSelect={props.onSelect} />
    </div>
  )
}

// {SideBar component}
function SideBar(props) {
  return (
    // selected tool
    <div className="flex h-full w-50 bg-slate-950 flex-col p-2">
      <div className="p-1">
        <h3 className="text-gray-50">{props.selectedTools}</h3>
      </div>
      {/* drop downfor tools catogory */}
      <div className="w-full h-full border-2 border-gray-50 bg-slate-900 align-middle ">
        <div className="w-full flex border-2 border-gray-50 bg-gray-50 items-center ">
          <select className="w-full text-xs  " name="toolCatogory" id="toolCatogory">
            <option className="w-full" value="">1</option>
            <option className="w-full" value="">2</option>
            <option className="w-full" value="">3</option>
            <option className="w-full" value="">4</option>
            <option className="w-full" value="">5</option>
          </select>
        </div>
        {/* tools and components will appear here */}
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-gray-50 text-center ">all the respected Drag drop UI componets and tools will appers here as per tools and catogory</p>
        </div>
      </div>
    </div>
  )
}


//canvas function
function Canvas(props) {
  //useState for zoom with scroll wheel ans shift<-->
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef(null)
  //zoom function
  function handleZoom(e) {
    e.preventDefault();

    // SHIFT + SCROLL = horizontal scroll
    if (e.shiftKey) {
      canvasRef.current.scrollLeft += e.deltaY
      return
    }
    // zoomin-zoomout scroll wheel condition
    if (e.deltaY < 0) {
      setZoom(prev => Math.min(prev + 0.1, 3))    // scroll up = zoom IN, max 3x
    } else {
      setZoom(prev => Math.max(prev - 0.1, 0.2))  // scroll down = zoom OUT, min 0.2x
    }
  }
  return (
    // canavs parent-tag
    <div className="flex flex-1 h-full w-full bg-gray-50 ">
      {/* white board */}
      <div ref={canvasRef} className="flex flex-1 bg-white justify-center items-center overflow-auto cursor-crosshair p-2 relative " onWheel={handleZoom} >
        {/* <div  onWheel={handelZoom}> */}
        <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: "100%", height: "100%" }}>
          <p className="text-black">test text</p>
        </div>
        {props.showBottom && <div ></div>}

      </div>


    </div>
  )
}

function QuickAccessBar(props) {
  return (
    <div className="left-1/2 -translate-x-1/2 flex w-[60%] bg-slate-950 h-10 rounded-lg shadow-lg shadow-gray-700  fixed bottom-4 opacity-20 hover:opacity-100">
      < h1 > Bottom Bar</h1 >
    </div >
  )
}

function RightSidebar(props) {
  return (
    // selected tool
    <div className="flex h-full w-50 bg-slate-950 flex-col p-2">
      <p>properties</p>
    </div>
  )
}
// sidebar + canvas + propertis bar
function Middle(props) {
  return (
    <div className="flex flex-row flex-1 overflow-hidden">
      {props.showLeft && <SideBar selectedTools={props.selectedTools} />}
      <Canvas />
      {props.showBottom && <QuickAccessBar />}
      {props.showRight && <RightSidebar />}
    </div>
  )
}



function App() {
  // usestate for Toolbar-props
  const [selectedTools, setSelectedTools] = useState("Components")
  const [showLeft, setShowLeft] = useState(true)
  const [showRight, setShowRight] = useState(true)
  const [showBottom, setShowBottom] = useState(true)

  function toggelLeft() {
    setShowLeft(prev => !prev)
  }


  function toggelRight() {
    setShowRight(prev => !prev)
  }


  function toggelBottom() {
    setShowBottom(prev => !prev)
  }

  return (
    <div className="flex flex-col h-screen ">
      <Header toggelLeft={toggelLeft} toggelRight={toggelRight} toggelBottom={toggelBottom} />
      <ToolBar selectedTools={selectedTools} onSelect={setSelectedTools} />
      <Middle selectedTools={selectedTools} setSelectedTools={setSelectedTools} showLeft={showLeft} showRight={showRight} showBottom={showBottom} />
    </div>
  )
}

export default App