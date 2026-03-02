import "../../styles/leftsidebar.css";
import { Plus } from "lucide-react";
import ShineButton from "../ShineButton";
import ExpenseListView from "./ExpenseListView";
import TargetCursor from "../TargetCursor";

const LeftSideBar = ({ onAddClick, expenses, newMonth = 2 }) => {
  return (
    <div className="left-sidebar">
      <div className="left-sidebar-header">
        <div className="title-text">Expenses</div>
        <ShineButton
          className="shine-button cursor-target"
          style={{ width: "100px" }}
          onClick={onAddClick}
        >
          <div className="plus-circle">
            <Plus size={14} />
          </div>
          <div className="plus-circle-text">Add</div>
        </ShineButton>
      </div>
      <ExpenseListView expenses={expenses} newMonth={newMonth} />
    </div>
  );
};

export default LeftSideBar;
