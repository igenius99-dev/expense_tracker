import RightSideBar from "./components/custom/rightsidebar.jsx";
import LeftSideBar from "./components/custom/leftsidebar.jsx";
import TargetCursor from "./components/TargetCursor.jsx";
import "./styles/app.css";

function App() {
  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <div className="layout">
        <LeftSideBar />
        <RightSideBar />
      </div>
    </>
  );
}

export default App;
