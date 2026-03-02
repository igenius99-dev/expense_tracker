import { useMemo, useState } from "react";
import TargetCursor from "../TargetCursor";
import "../../styles/BarChart.css";

function getDailyTotals(expenses, newMonth = 0) {
  const now = new Date();
  const year = now.getFullYear();
  const month = Number(newMonth);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const buckets = Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1),
    total: 0,
  }));

  expenses.forEach((exp) => {
    const expDate = new Date(exp.createdAt);

    if (expDate.getFullYear() === year && expDate.getMonth() === month) {
      const dayIndex = expDate.getDate() - 1;
      buckets[dayIndex].total += exp.amount;
    }
  });

  return buckets;
}

const BarChart = ({ expenses = [], newMonth = 0 }) => {
  const dailyTotals = useMemo(
    () => getDailyTotals(expenses, newMonth),
    [expenses, newMonth],
  );

  const logMax = useMemo(
    () => Math.log(Math.max(...dailyTotals.map((d) => d.total), 1) + 1),
    [dailyTotals],
  );

  const todayStr = new Date().toDateString();
  const [activeIndex, setActiveIndex] = useState(null);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const formatAmount = (amount) => `$${Number(amount).toLocaleString("en-US")}`;

  return (
    <div className="bar-chart">
      <div className="bar-chart-bars">
        {dailyTotals.map((day, i) => {
          const ratio = day.total > 0 ? Math.log(day.total + 1) / logMax : 0;
          const heightPct = day.total > 0 ? Math.max(ratio * 100, 12) : 4;
          const isToday = day.date.toDateString() === todayStr;

          return (
            <div
              key={i}
              className="bar-chart-bar-wrapper"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {activeIndex === i && (
                <div className="bar-chart-tooltip">
                  <span className="bar-chart-tooltip-date">
                    {formatDate(day.date)}
                  </span>
                  <span className="bar-chart-tooltip-amount">
                    {formatAmount(day.total)}
                  </span>
                </div>
              )}
              <div
                className={`bar-chart-bar ${
                  isToday ? "bar-chart-bar--active" : ""
                } cursor-target`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
