import React, { useState } from "react";

export default function Filter({
  onClose,
  selectedFilters,
  onFilterChange,
  onPriceChange, // 👈 new prop
  currentPrice,  // 👈 new prop
}) {
  const filterOptions = {
    Discount: ["10%", "20%", "30%", "40%", "50%"],
    "Customer Rating": ["1★ & above", "2★ & above", "3★ & above", "4★ & above"],
    Brand: ["Zara", "H&M", "Levi's", "Nike", "Adidas"],
    Color: ["Red", "Blue", "Black", "White", "Green"],
    Size: ["S", "M", "L", "XL"],
    Customizable: [],
    "Ideal For": ["Men", "Women", "Kids"],
    Occasion: ["Casual", "Formal", "Party"],
    Work: ["Printed", "Embroidered"],
    Fabric: ["Cotton", "Silk", "Denim"],
    Segment: ["Premium", "Budget"],
    "Suitable For": ["Daily Wear", "Festive"],
    Pattern: ["Solid", "Striped", "Floral"],
  };

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-top">
        <h3>Filters</h3>
        <button className="hide-filter-btn" onClick={onClose}>
          ✕ Hide Filter
        </button>
      </div>

      {/* ✅ Price Range Filter */}
      <div className="filter-group">
        <div
          className="filter-header"
          onClick={() => toggleCategory("Price Range")}
        >
          <h4>Price Range</h4>
          <span className="arrow">
            {openCategory === "Price Range" ? "▲" : "▼"}
          </span>
        </div>

        {openCategory === "Price Range" && (
          <div className="filter-options price-slider">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={currentPrice}
              onChange={(e) => onPriceChange(e.target.value)}
            />
            <div className="price-labels">
              <span>₹0</span>
              <span>₹{currentPrice}</span>
              <span>₹5000+</span>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Other filters */}
      {Object.entries(filterOptions).map(([category, options]) => {
        const checkedCount = selectedFilters[category]?.size || 0;
        const isOpen = openCategory === category;

        if (category === "Customizable") {
          return (
            <div key={category} className="filter-group single-filter">
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFilters[category]?.has("Customizable") || false}
                  onChange={(e) =>
                    onFilterChange(category, "Customizable", e.target.checked)
                  }
                />
                {category}
              </label>
            </div>
          );
        }

        return (
          <div key={category} className="filter-group">
            <div
              className="filter-header"
              onClick={() => toggleCategory(category)}
            >
              <h4>{category}</h4>
              {checkedCount > 0 && (
                <span className="checked-count">({checkedCount})</span>
              )}
              <span className="arrow">{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className="filter-options">
                {options.map((option) => (
                  <label key={option} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category]?.has(option) || false}
                      onChange={(e) =>
                        onFilterChange(category, option, e.target.checked)
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
