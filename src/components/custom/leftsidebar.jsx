import "../../styles/leftsidebar.css";
import { Plus } from "lucide-react";
import ShineButton from "../ShineButton";

const LeftSideBar = () => {
  return (
    <div className="left-sidebar">
      <div className="title-text">Expenses</div>
      <ShineButton style={{ width: "100px" }}>
        <div className="plus-circle">
          <Plus size={14} />
        </div>
        <div className="plus-circle-text">Add</div>
      </ShineButton>
    </div>
  );
};

export default LeftSideBar;
