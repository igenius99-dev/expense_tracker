import { useMemo } from "react";
import { CATEGORY_CONFIG } from "../CategoryIconConfig";
import { useExpenses } from "../../context/ExpenseContext";
import "../../styles/ExpenseOverview.css";

export default function ExpenseOverview() {
  const { expenses, month, year } = useExpenses();

  const { categoryTotals, maxAmount, monthLabel } = useMemo(() => {
    const monthly = expenses.filter((e) => {
      const d = new Date(e.createdAt);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    const totals = {};
    monthly.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });

    const sorted = Object.entries(totals).sort(([, a], [, b]) => b - a);
    const max = sorted.length ? sorted[0][1] : 0;

    const label = new Date(year, month).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return { categoryTotals: sorted, maxAmount: max, monthLabel: label };
  }, [expenses, month, year]);

  return (
    <div className="expense-overview">
      <h2 className="overview-title">Where your money go?</h2>
      <p className="overview-month">{monthLabel}</p>

      <div className="overview-categories">
        {categoryTotals.map(([category, amount]) => {
          const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Other;
          const percentage = maxAmount ? (amount / maxAmount) * 100 : 0;

          return (
            <div key={category} className="overview-category-row">
              <div className="overview-category-info">
                <span className="overview-category-name">{category}</span>
                <span className="overview-category-amount">
                  ${Number(amount).toLocaleString("en-US")}
                </span>
              </div>
              <div className="overview-bar-track">
                <div
                  className="overview-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
