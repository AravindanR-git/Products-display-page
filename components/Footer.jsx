import React from "react";
import styles from "../styles/Footer.module.css";
import {
  FaInstagram,
  FaLinkedin,
  FaApplePay,
  FaCcPaypal,
  FaCcMastercard,
  FaCcAmex,
  FaGooglePay,
} from "react-icons/fa";
import { PiCurrencyDollarBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* --- TOP SECTION --- */}
      <div className={styles.topSection}>
        {/* Left side */}
        <div className={styles.left}>
          <h3 className={styles.heading}>BE THE FIRST TO KNOW</h3>
          <p className={styles.subtext}>Sign up for updates from metta muse</p>

          <div className={styles.subscribeContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
        </div>

        {/* Right side */}
        <div className={styles.right}>
          <h3 className={styles.heading}>CONTACT US</h3>
          <p className={styles.subtext}>+44 221 133 5360</p>
          <p className={styles.subtext}>customercare@mettamuse.com</p>

          <h3 className={styles.heading}>CURRENCY</h3>
          <p className={styles.currency}>
            <PiCurrencyDollarBold className={styles.currencyIcon} /> +USD
          </p>
          <p className={styles.currencyNote}>
            Transactions will be completed in Euros and a currency reference is
            available on hover.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* --- BOTTOM SECTION --- */}
      <div className={styles.bottomSection}>
        {/* Column 1 */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>metta muse</h4>
          <ul>
            <li>About Us</li>
            <li>Stories</li>
            <li>Artisans</li>
            <li>Boutiques</li>
            <li>Contact Us</li>
            <li>EU Compliances Docs</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>QUICK LINKS</h4>
          <ul>
            <li>Orders & Shipping</li>
            <li>Join/Login as a Seller</li>
            <li>Payment & Pricing</li>
            <li>Return & Refunds</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>FOLLOW US</h4>
          <div className={styles.socialIcons}>
            <FaInstagram color="#E4405F" />
            <FaLinkedin color="#0A66C2" />
          </div>

          <h4 className={styles.columnTitle}>metta muse ACCEPTS</h4>
          <div className={styles.paymentIcons}>
            <FaGooglePay color="#34A853" />
            <FaCcMastercard color="#EB001B" />
            <FaCcPaypal color="#003087" />
            <FaCcAmex color="#2E77BB" />
            <FaApplePay color="#A3AAAE" />
          </div>
        </div>
      </div>

      <hr className={styles.divider} />
      <div className={styles.copyright}>
        Cpoyright @ 2023 mettamuse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
