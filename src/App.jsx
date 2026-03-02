import { useState } from "react";
import RightSideBar from "./components/custom/rightsidebar.jsx";
import LeftSideBar from "./components/custom/leftsidebar.jsx";
import ExpenseModal from "./components/custom/ExpenseModal.jsx";
import TargetCursor from "./components/TargetCursor.jsx";
import SAMPLE_EXPENSES from "./sampledata/expenses.js";
import "./styles/app.css";

function App() {
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { ...expense, id: Date.now(), createdAt: new Date() },
    ]);
    setIsModalOpen(false);
  };

  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <div className="layout">
        <LeftSideBar
          onAddClick={() => setIsModalOpen(true)}
          expenses={expenses}
          newMonth={1}
        />
        <RightSideBar expenses={expenses} newMonth={1} />
      </div>
      {isModalOpen && (
        <ExpenseModal
          onSave={addExpense}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
