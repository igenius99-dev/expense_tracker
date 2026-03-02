import { useState, useCallback } from "react";
import ExpenseProvider from "./context/ExpenseProvider";
import { useExpenses } from "./context/ExpenseContext";
import RightSideBar from "./components/custom/rightsidebar.jsx";
import LeftSideBar from "./components/custom/leftsidebar.jsx";
import ExpenseModal from "./components/custom/ExpenseModal.jsx";
import TargetCursor from "./components/TargetCursor.jsx";
import "./styles/app.css";

function AppContent() {
  const { addExpense, updateExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAdd = useCallback(
    (expense) => {
      addExpense(expense);
      setIsModalOpen(false);
    },
    [addExpense],
  );

  const handleUpdate = useCallback(
    (updated) => {
      updateExpense(updated);
      setEditingExpense(null);
    },
    [updateExpense],
  );

  const handleEdit = useCallback((expense) => {
    setEditingExpense(expense);
  }, []);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleCloseEdit = useCallback(() => setEditingExpense(null), []);

  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <div className="layout">
        <LeftSideBar onAddClick={handleOpenModal} onEdit={handleEdit} />
        <RightSideBar />
      </div>
      {isModalOpen && (
        <ExpenseModal
          onSave={handleAdd}
          onClose={handleCloseModal}
        />
      )}
      {editingExpense && (
        <ExpenseModal
          expense={editingExpense}
          onSave={handleUpdate}
          onClose={handleCloseEdit}
        />
      )}
    </>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
