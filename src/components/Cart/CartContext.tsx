import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface ShopProductItem {
    title: string;
    price: number;
    image?: string;
    id: string;
}

interface CartContextProps {
  cartItems: ShopProductItem[];
  addToCart: (item: ShopProductItem) => void;
}
interface CartProviderProps {
    children: ReactNode;
}

// Create the Cart Context
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {

  // Cart State Management
  const [cartItems, setCartItems] = useState<ShopProductItem[]>([]);

  // Add to Cart Function
  const addToCart = (item: ShopProductItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Get Cart Data
export const useCart = () => {
    const context = useContext(CartContext);
  
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
  
    return context;
  };
  