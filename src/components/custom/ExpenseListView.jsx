import { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CATEGORY_CONFIG } from "../CategoryIconConfig";
import { useExpenses } from "../../context/ExpenseContext";
import "../../styles/ExpenseListView.css";
import BarChart from "./BarChart";
import CategoryFilter from "./CategoryFilter";

function formatAmount(amount) {
  return `-${Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`;
}

function formatTime(date) {
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}

function formatMonth(month, year = new Date().getFullYear()) {
  return new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getDateLabel(date) {
  const today = new Date();
  const d = new Date(date);

  if (d.toDateString() === today.toDateString()) return "Today";

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function groupByDate(expenses) {
  const sorted = [...expenses].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const groups = [];
  const seen = {};

  sorted.forEach((exp) => {
    const key = new Date(exp.createdAt).toDateString();
    if (!seen[key]) {
      seen[key] = { key, items: [] };
      groups.push(seen[key]);
    }
    seen[key].items.push(exp);
  });

  return groups;
}

export default function ExpenseListView({ onEdit }) {
  const { expenses, deleteExpense, month, year, changeMonth } = useExpenses();
  const [categoryFilter, setCategoryFilter] = useState(null);

  const filtered = useMemo(() => {
    if (!categoryFilter) return expenses;
    return expenses.filter((e) => e.category === categoryFilter);
  }, [expenses, categoryFilter]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="expense-list-view">
      <div className="nav-container">
        <button
          type="button"
          className="nav-left cursor-target"
          onClick={() => changeMonth(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="nav-center">{formatMonth(month, year)}</div>
        <button
          type="button"
          className="nav-right cursor-target"
          onClick={() => changeMonth(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <BarChart />
      <CategoryFilter
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />
      {grouped.length === 0 && (
        <div className="expense-empty">No expenses found.</div>
      )}
      {grouped.map(({ key, items }) => (
        <div key={key} className="expense-date-group">
          <div className="expense-date-header">
            <span className="expense-date-label">
              {getDateLabel(items[0].createdAt)}
            </span>
            <MoreHorizontal size={20} color="#C4C9D4" />
          </div>

          {items.map((expense) => {
            const config =
              CATEGORY_CONFIG[expense.category] || CATEGORY_CONFIG.Other;
            const Icon = config.icon;

            return (
              <div key={expense.id} className="expense-item">
                <div
                  className="expense-icon"
                  style={{ backgroundColor: config.color }}
                >
                  <Icon size={22} />
                </div>
                <div className="expense-info">
                  <span className="expense-title">{expense.title}</span>
                  <span className="expense-meta">
                    {formatTime(new Date(expense.createdAt))}
                    {expense.description && ` \u2022 ${expense.description}`}
                  </span>
                </div>
                <span className="expense-amount">
                  {formatAmount(expense.amount)}
                </span>
                <button
                  className="expense-edit cursor-target"
                  type="button"
                  onClick={() => onEdit?.(expense)}
                >
                  <Pencil size={14} color="black" strokeWidth={2} />
                </button>
                <button
                  className="expense-delete cursor-target"
                  type="button"
                  onClick={() => deleteExpense(expense.id)}
                >
                  <Trash2 size={14} color="black" strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
