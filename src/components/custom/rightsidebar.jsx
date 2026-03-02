import "../../styles/rightsidebar.css";
import ExpenseOverview from "./ExpenseOverview";

const RightSideBar = ({ expenses, newMonth = 2 }) => {
  return (
    <div className="right-sidebar">
      <ExpenseOverview expenses={expenses} newMonth={newMonth} />
    </div>
  );
};

export default RightSideBar;
