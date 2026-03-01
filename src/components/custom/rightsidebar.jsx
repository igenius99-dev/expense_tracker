import "../../styles/rightsidebar.css";
import ExpenseOverview from "./ExpenseOverview";

const RightSideBar = ({ expenses }) => {
  return (
    <div className="right-sidebar">
      <ExpenseOverview expenses={expenses} newMonth={1} />
    </div>
  );
};

export default RightSideBar;
