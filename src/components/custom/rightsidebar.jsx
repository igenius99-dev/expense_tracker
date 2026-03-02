import "../../styles/rightsidebar.css";
import ExpenseOverview from "./ExpenseOverview";

const RightSideBar = ({ expenses, newMonth = 2, year }) => {
  return (
    <div className="right-sidebar">
      <ExpenseOverview expenses={expenses} newMonth={newMonth} year={year} />
    </div>
  );
};

export default RightSideBar;
