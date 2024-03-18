import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem('basket'));
  const initialCartItems = storedCart || { items: [], quantity: 0, totalPrice: 0 };
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('basket'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.items.reduce((total, product) => total + product.price * product.quantity, 0);
    setCartItems((prevItems) => ({ ...prevItems, totalPrice: totalPrice }));
  }, [cartItems.items]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        const newItems = prevItems.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
        const newQuantity = prevItems.items.reduce((total, item) => total + item.quantity, 0) + 1;
        const newTotalPrice = +(Number(prevItems.totalPrice) + Number(product.price));

        console.log(newTotalPrice);
        if (newTotalPrice >= 2000000) {
          toast.warning('Giỏ hàng đã đầy, vui lòng thanh toán');
          return prevItems;
        }
        return { items: newItems, quantity: newQuantity, totalPrice: newTotalPrice };
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
        const newItems = [...prevItems.items, { ...product, quantity: 1 }];
        const newQuantity = prevItems.items.reduce((total, item) => total + item.quantity, 0) + 1;
        const newTotalPrice = +(Number(prevItems.totalPrice) + Number(product.price));

        if (newTotalPrice >= 2000000) {
          toast.warning('Giỏ hàng đã đầy, vui lòng thanh toán');
          return prevItems;
        }
        return { items: newItems, quantity: newQuantity, totalPrice: newTotalPrice };
      }
    });
  };

  const updateCartItems = (newCartItems) => {
    const totalPrice = newCartItems.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalQuantity = newCartItems.reduce((total, product) => total + product.quantity, 0);

    if (totalPrice >= 2000000) {
      toast.warning('Giỏ hàng đã đầy, vui lòng thanh toán');
      return;
    }

    // Cập nhật trạng thái cartItems chỉ khi giá trị tổng không vượt quá 2000000
    setCartItems({ items: newCartItems, quantity: totalQuantity, totalPrice: totalPrice });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const productToRemove = prevItems.items.find((item) => item.id === productId);
      const newItems = prevItems.items.filter((item) => item.id !== productId);
      const newQuantity = prevItems.items.reduce((total, item) => total + item.quantity, 0) - productToRemove.quantity;
      const newTotalPrice = prevItems.totalPrice - productToRemove.price * productToRemove.quantity;
      localStorage.setItem(
        'basket',
        JSON.stringify({ items: newItems, quantity: newQuantity, totalPrice: newTotalPrice }),
      );
      return { items: newItems, quantity: newQuantity, totalPrice: newTotalPrice };
    });
  };

  const clearCart = () => {
    setCartItems({ items: [], quantity: 0, totalPrice: 0 });
    localStorage.removeItem('basket');
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItems,
    clearCart,
  };

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
};

export default BasketProvider;
export const useBasket = () => useContext(BasketContext);
