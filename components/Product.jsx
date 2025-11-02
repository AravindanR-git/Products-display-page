import React, { useState } from "react";
import styles from "../styles/ProductCard.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Product = ({ product }) => {
  if (!product) return null;

  // Fake stock condition using rating.count
  const inStock = product.rating && product.rating.count > 100;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {/* Out of Stock Overlay */}
      {!inStock && (
        <div className={styles.outOfStockOverlay}>
          <div className={styles.outOfStockText}>Out of Stock</div>
        </div>
      )}

      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      {/* Product Details */}
      <div className={styles.details}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{product.title}</h3>
          <button className={styles.heartBtn} onClick={toggleFavorite}>
            {isFavorite ? (
              <FaHeart className={styles.heartIconFilled} />
            ) : (
              <FaRegHeart className={styles.heartIcon} />
            )}
          </button>
        </div>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Product;
