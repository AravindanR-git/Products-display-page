import React from "react";
import Product from "./Product";

const ProductGrid = ({ products }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
