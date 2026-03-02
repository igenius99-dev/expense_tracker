import { createContext, useContext } from "react";

export const ExpenseContext = createContext(null);

export function useExpenses() {
  const ctx = useContext(ExpenseContext);

  return ctx;
}
