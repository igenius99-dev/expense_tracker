import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";
import { CATEGORY_CONFIG } from "../CategoryIconConfig";
import "../../styles/CategoryFilter.css";

const categories = Object.keys(CATEGORY_CONFIG);

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category) => {
    onCategoryChange(category);
    setOpen(false);
  };

  return (
    <div className="category-filter" ref={ref}>
      <button
        type="button"
        className="category-filter-btn cursor-target"
        onClick={() => setOpen((prev) => !prev)}
        data-active={!!selectedCategory}
      >
        <Filter size={16} />
        <span>{selectedCategory || "All"}</span>
      </button>

      {open && (
        <div className="category-filter-dropdown">
          <button
            type="button"
            className={`category-filter-option ${!selectedCategory ? "active" : ""}`}
            onClick={() => handleSelect(null)}
          >
            <span
              className="category-filter-dot"
              style={{ backgroundColor: "#9ca3af" }}
            />
            <span>All Categories</span>
          </button>
          {categories.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            const Icon = config.icon;
            return (
              <button
                type="button"
                key={cat}
                className={`category-filter-option  ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => handleSelect(cat)}
              >
                <span
                  className="category-filter-dot"
                  style={{ backgroundColor: config.color }}
                >
                  <Icon size={12} />
                </span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
