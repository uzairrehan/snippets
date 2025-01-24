
// ```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inventory: number; 
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

type StoreType = {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
};

const cartStore = (set: (fn: (state: StoreType) => Partial<StoreType>) => void): StoreType => ({
  cart: {
    cartItems: [],
  },
  addToCart: (product: Product) => {
    set((state) => {
      const existingItem = state.cart.cartItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return {
          cart: {
            cartItems: state.cart.cartItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          },
        };
      } else {
        return {
          cart: {
            cartItems: [...state.cart.cartItems, { product, quantity: 1 }],
          },
        };
      }
    });
  },
  removeFromCart: (productId: string) => {
    set((state) => ({
      cart: {
        cartItems: state.cart.cartItems.filter((item) => item.product.id !== productId),
      },
    }));
  },
  increaseQuantity: (productId: string) => {
    set((state) => ({
      cart: {
        cartItems: state.cart.cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      },
    }));
  },
  decreaseQuantity: (productId: string) => {
    set((state) => ({
      cart: {
        cartItems: state.cart.cartItems.map((item) =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      },
    }));
  },
  clearCart: () => {
    set({ cart: { cartItems: [] } });
  },
});

const useCartStore = create<StoreType>()(
  devtools(
    persist(cartStore, {
      name: "cart-store",
    })
  )
);

export default useCartStore;
// ```

// **Explanation:**

// 1. **Interface Definitions:**
//    - `Product`: Defines the structure of a product with properties like `id`, `name`, `price`, `image`, etc.
//    - `CartItem`: Defines the structure of an item in the cart, containing the `product` and its `quantity`.
//    - `CartState`: Defines the state of the cart, containing an array of `cartItems`.

// 2. **Store Type:**
//    - `cart`: The current state of the cart.
//    - `addToCart`: Adds a product to the cart. If the product already exists, increases its quantity.
//    - `removeFromCart`: Removes a product from the cart.
//    - `increaseQuantity`: Increases the quantity of a product in the cart.
//    - `decreaseQuantity`: Decreases the quantity of a product in the cart (prevents quantity from going below 1).
//    - `clearCart`: Empties the cart.

// 3. **Cart Store Logic:**
//    - `addToCart`: Checks if the product already exists in the cart. If it does, increases its quantity. Otherwise, adds a new `CartItem` to the `cartItems` array.
//    - `removeFromCart`: Filters out the `CartItem` with the given `productId`.
//    - `increaseQuantity`: Increases the `quantity` of the specified product.
//    - `decreaseQuantity`: Decreases the `quantity` of the specified product, ensuring it doesn't go below 1.
//    - `clearCart`: Sets the `cartItems` array to an empty array.

// 4. **zustand Middleware:**
//    - `devtools`: Enables the Redux DevTools extension for debugging.
//    - `persist`: Persists the cart state to local storage using the `name` "cart-store".

// 5. **Usage:**
//    - `useCartStore`: Creates a custom hook to access and update the cart state.
//    - Example usage:
    //  ```typescript
     const cart = useCartStore((state) => state.cart);
     const addToCart = useCartStore((state) => state.addToCart);
     const removeFromCart = useCartStore((state) => state.removeFromCart);
//      // ... other actions
//      ```

// This store provides a basic foundation for an e-commerce cart. You can further enhance it by:

// - Adding features like applying discounts, calculating total price, handling order placement, etc.
// - Integrating with other parts of your e-commerce application, such as product listings, user authentication, etc.
// - Implementing more complex logic and state management patterns as needed.

// I hope this enhanced store provides a more comprehensive solution for your e-commerce application!
