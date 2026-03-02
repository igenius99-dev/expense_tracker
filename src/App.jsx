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
  const [editingExpense, setEditingExpense] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const changeMonth = (delta) => {
    setMonth((prev) => {
      const next = prev + delta;
      if (next > 11) {
        setYear((y) => y + 1);
        return 0;
      }
      if (next < 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return next;
    });
  };

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { ...expense, id: Date.now(), createdAt: new Date() },
    ]);
    setIsModalOpen(false);
  };

  const updateExpense = (updated) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
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
          onEdit={handleEdit}
          onDelete={deleteExpense}
          onMonthChange={changeMonth}
          expenses={expenses}
          newMonth={month}
          year={year}
        />
        <RightSideBar expenses={expenses} newMonth={month} year={year} />
      </div>
      {isModalOpen && (
        <ExpenseModal
          onSave={addExpense}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {editingExpense && (
        <ExpenseModal
          expense={editingExpense}
          onSave={updateExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </>
  );
}

export default App;
