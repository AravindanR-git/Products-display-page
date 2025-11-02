import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import Filter from "../components/Filter";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [priceRange, setPriceRange] = useState(5000); // ✅ Price filter value
  const [sortOption, setSortOption] = useState("Recommended");
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Fetch products
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        // ✅ Assign stock based on count (simulate inStock)
        const dataWithStock = data.map((item) => ({
          ...item,
          inStock: item.rating?.count > 200, // if count > 200 → in stock
        }));

        setProducts(dataWithStock);
        setFilteredProducts(dataWithStock);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (!e.target.closest(".recommend-box")) setShowDropdown(false);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // ✅ Handle checkbox filter change
  const handleFilterChange = (category, option, isChecked) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = new Set();

      if (isChecked) {
        updated[category].add(option);
      } else {
        updated[category].delete(option);
        if (updated[category].size === 0) delete updated[category];
      }
      return { ...updated };
    });
  };

  // ✅ Filtering + Sorting
  useEffect(() => {
    let filtered = [...products];

    // --- Price filter ---
    filtered = filtered.filter((p) => p.price <= priceRange);

    // --- Other filters ---
    Object.entries(selectedFilters).forEach(([category, options]) => {
      if (category === "Brand") {
        filtered = filtered.filter((p) =>
          Array.from(options).some((opt) =>
            p.title.toLowerCase().includes(opt.toLowerCase())
          )
        );
      } else if (category === "Color") {
        filtered = filtered.filter((p) =>
          Array.from(options).some((opt) =>
            p.description.toLowerCase().includes(opt.toLowerCase())
          )
        );
      } else if (category === "Customer Rating") {
        filtered = filtered.filter((p) => {
          const rating = p.rating?.rate || 0;
          return Array.from(options).some((opt) => {
            const minRating = parseInt(opt[0]); // "3★ & above" → 3
            return rating >= minRating;
          });
        });
      }
    });

    // --- Sorting logic ---
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest First") {
      filtered.reverse(); // fake since no date field
    } else if (sortOption === "Popular") {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(filtered);
  }, [selectedFilters, sortOption, priceRange, products]);

  // ✅ Count selected filters
  const totalSelected = Object.values(selectedFilters).reduce(
    (acc, set) => acc + set.size,
    0
  );

  return (
    <>
      <Header />

      <main className="main-container">
        {/* ✅ Sidebar Filter */}
        {showFilter && (
          <Filter
            onClose={() => setShowFilter(false)}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onPriceChange={setPriceRange}
            currentPrice={priceRange}
          />
        )}

        <section className="product-section">
          {/* ✅ Sticky Filter + Recommend Header */}
          <div className="sticky-filter-header">
            <div className="left-section">
              {!showFilter && (
                <>
                  <button
                    className="toggle-filter-btn"
                    onClick={() => setShowFilter(true)}
                  >
                    {totalSelected > 0
                      ? `Filter (${totalSelected})`
                      : "Show Filter"}
                  </button>

                  {/* ✅ Clear Filter Button */}
                  {totalSelected > 0 && (
                    <button
                      className="clear-filter-btn"
                      onClick={() => {
                        setSelectedFilters({});
                        setPriceRange(5000);
                      }}
                      style={{
                        marginLeft: "10px",
                        background: "#f5f5f5",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Clear Filters ✖
                    </button>
                  )}
                </>
              )}
              <p className="items-count">
                {filteredProducts.length} items available
              </p>
            </div>

            {/* ✅ Custom Recommend Dropdown */}
            <div className="right-section">
              <div
                className="recommend-box"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <span>{sortOption}</span>
                <span className="arrow">&#9662;</span>

                {showDropdown && (
                  <ul className="dropdown-menu">
                    {[
                      "Recommended",
                      "Newest First",
                      "Popular",
                      "Price: High to Low",
                      "Price: Low to High",
                    ].map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setShowDropdown(false);
                        }}
                        className={sortOption === option ? "active" : ""}
                      >
                        <span>{option}</span>
                        {sortOption === option && (
                          <span className="tick">✓</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* ✅ Product Grid */}
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <p style={{ textAlign: "center" }}>No products found.</p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
