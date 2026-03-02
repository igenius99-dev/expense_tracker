import { useMemo } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";
import { CATEGORY_CONFIG } from "../CategoryIconConfig";
import "../../styles/ExpenseListView.css";
import TargetCursor from "../TargetCursor";
import BarChart from "./BarChart";

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

export default function ExpenseListView({ expenses, newMonth = 2 }) {
  const grouped = useMemo(() => groupByDate(expenses), [expenses]);

  if (!expenses.length) return null;

  return (
    <div className="expense-list-view">
      <BarChart expenses={expenses} newMonth={newMonth} />
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
                <button className="expense-edit cursor-target" type="button">
                  <Pencil size={14} color="black" strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
