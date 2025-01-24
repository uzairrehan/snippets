import React from 'react';
import useCartStore from './cartStore';

const products = [
  { id: '1', name: 'Product 1', price: 100 },
  { id: '2', name: 'Product 2', price: 200 },
];

const ProductList = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button
              onClick={() =>
                addItem({ ...product, quantity: 1 })
              }
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
