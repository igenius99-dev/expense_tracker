import { useReducer, useState, useCallback, useMemo } from "react";
import { ExpenseContext } from "./ExpenseContext";
import SAMPLE_EXPENSES from "../sampledata/expenses";

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { ...action.payload, id: crypto.randomUUID(), createdAt: new Date() },
      ];
    case "UPDATE":
      return state.map((e) =>
        e.id === action.payload.id ? action.payload : e,
      );
    case "DELETE":
      return state.filter((e) => e.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpenseProvider({ children }) {
  const [expenses, dispatch] = useReducer(expenseReducer, SAMPLE_EXPENSES);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const changeMonth = useCallback((delta) => {
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
  }, []);

  const addExpense = useCallback(
    (expense) => dispatch({ type: "ADD", payload: expense }),
    [],
  );

  const updateExpense = useCallback(
    (expense) => dispatch({ type: "UPDATE", payload: expense }),
    [],
  );

  const deleteExpense = useCallback(
    (id) => dispatch({ type: "DELETE", payload: id }),
    [],
  );

  const value = useMemo(
    () => ({
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      month,
      year,
      changeMonth,
    }),
    [
      expenses,
      addExpense,
      updateExpense,
      deleteExpense,
      month,
      year,
      changeMonth,
    ],
  );

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}
