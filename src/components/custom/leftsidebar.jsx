import "../../styles/leftsidebar.css";
import { Plus } from "lucide-react";
import ShineButton from "../ShineButton";
import ExpenseListView from "./ExpenseListView";

const LeftSideBar = ({ onAddClick, onEdit }) => {
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

      <ExpenseListView onEdit={onEdit} />
    </div>
  );
};

export default LeftSideBar;
