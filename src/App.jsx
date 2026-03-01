import { useState } from "react";
import RightSideBar from "./components/custom/rightsidebar.jsx";
import LeftSideBar from "./components/custom/leftsidebar.jsx";
import ExpenseModal from "./components/custom/ExpenseModal.jsx";
import TargetCursor from "./components/TargetCursor.jsx";
import "./styles/app.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { ...expense, id: Date.now(), date: new Date().toLocaleDateString() },
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
        <LeftSideBar onAddClick={() => setIsModalOpen(true)} />
        <RightSideBar />
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
