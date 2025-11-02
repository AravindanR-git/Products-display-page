import React from "react";
import styles from "../styles/Header.module.css";
import { Search, Heart, ShoppingBag, User } from "lucide-react";

export default function Header() {
  return (
    <header className={styles.header}>
      {/* --- Top Bar --- */}
      <div className={styles.topBar}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src="/logo.jpg" alt="Logo" className={styles.logo} />
        </div>

        {/* Title */}
        <h1 className={styles.title}>metta muse</h1>

        {/* Icons + Language */}
        <div className={styles.icons}>
          <Search className={styles.icon} />
          <Heart className={styles.icon} />
          <ShoppingBag className={styles.icon} />
          <User className={styles.icon} />
          <select className={styles.langSelect} defaultValue="ENG">
            <option>ENG</option>
            <option>FRA</option>
            <option>ESP</option>
          </select>
        </div>
      </div>

      {/* --- Navigation Bar --- */}
      <nav className={styles.navbar}>
        {["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"].map((item) => (
          <button key={item} className={styles.navItem}>
            {item}
          </button>
        ))}
      </nav>

      {/* --- Company Info Section (Below Navbar) --- */}
      <div className={styles.companyInfo}>
        <h2 className={styles.companyTitle}>DISCOVER OUR PRODUCTS </h2>
        <p className={styles.companyDescription}>
          Explore a wide range of fashion collections designed to inspire your
          style every season. From everyday essentials to premium pieces, our
          products combine comfort, elegance, and quality craftsmanship.
        </p>
      </div>
    </header>
  );
}
