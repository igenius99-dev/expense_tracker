import { useMemo, useState } from "react";
import { X } from "lucide-react";
import "../../styles/ExpenseModal.css";
import { CATEGORY_CONFIG } from "../CategoryIconConfig";

const emptyForm = { title: "", description: "", category: "", amount: "" };

export default function ExpenseModal({ onSave, onClose, expense }) {
  const isEdit = Boolean(expense);
  const categories = useMemo(() => Object.keys(CATEGORY_CONFIG), []);
  const [form, setForm] = useState(
    expense
      ? {
          title: expense.title,
          description: expense.description || "",
          category: expense.category,
          amount: String(expense.amount),
        }
      : emptyForm,
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.category) next.category = "Please select a category";
    if (!form.amount) {
      next.amount = "Amount is required";
    } else if (!/^\d+$/.test(form.amount) || Number(form.amount) <= 0) {
      next.amount = "Amount must be a positive integer";
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({
      ...(expense || {}),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      amount: Number(form.amount),
    });
    setForm(emptyForm);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? "Edit Expense" : "Add Expense"}</h2>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Grocery shopping"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Optional notes..."
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="form-error">{errors.category}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount *</label>
              <input
                id="amount"
                name="amount"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 500"
                value={form.amount}
                onChange={handleChange}
              />
              {errors.amount && (
                <span className="form-error">{errors.amount}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {isEdit ? "Update Expense" : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
