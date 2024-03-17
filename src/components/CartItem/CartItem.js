import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CartItem.module.scss';
import { MinusIcon, PlusIcon } from '../Icons';
import { useBasket } from '~/contexts/BasketContext';

const cx = classNames.bind(styles);

function CartItem({ data }) {
  const { cartItems, removeFromCart, updateCartItems } = useBasket();
  const [quantity, setQuantity] = useState(data.quantity);
  const [openChange, setOpenChange] = useState(false);

  const totalProductPrice = data.price * quantity;

  const handleIncreasedQuantities = useCallback(() => {
    setQuantity((preQuantity) => {
      const newQuantity = preQuantity + 1;

      const newCartItems = cartItems.items.map((cartItem) => {
        if (cartItem.id === data.id) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      updateCartItems(newCartItems);

      return newQuantity;
    });
  }, [cartItems, data.id, updateCartItems]);

  const handleReducedQuantities = () => {
    if (quantity > 1) {
      setQuantity((preQuantity) => {
        const newQuantity = preQuantity - 1;

        const newCartItems = cartItems.items.map((cartItem) => {
          if (cartItem.id === data.id) {
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        });

        updateCartItems(newCartItems);

        return newQuantity;
      });
    }

    if (quantity === 1) {
      setQuantity((preQuantity) => preQuantity - 1);
    }
  };

  useEffect(() => {
    const matchingItem = cartItems.items.find((item) => item.id === data.id);
    if (matchingItem) {
      setQuantity(matchingItem.quantity);
    }
  }, [cartItems, data.id]);

  return (
    <div className={cx('product')}>
      <div className={cx('product__quantity')}>
        <button onClick={handleReducedQuantities} className={cx('product__quantity-btn')}>
          <MinusIcon />
        </button>
        <span className={cx('product__quantity-number')}>{quantity}</span>
        <button onClick={handleIncreasedQuantities} className={cx('product__quantity-btn')}>
          <PlusIcon />
        </button>
      </div>
      <div className={cx('product__mobile-quantity')}>
        <button onClick={() => setOpenChange(!openChange)} className={cx('product__mobile-quantity-btn')}>
          {quantity} X
        </button>
      </div>

      <div className={cx('product__img-wrap')}>
        <img src={data.image} alt="" className={cx('product__thumb')} />
      </div>

      <div className={cx('product__detail')}>
        <p className={cx('product__detail-name')}>{data.name}</p>
        {quantity !== 0 && (
          <span className={cx('product__detail-price')}>{totalProductPrice.toLocaleString('vi-VN')} ₫</span>
        )}
        {quantity === 0 && (
          <button onClick={() => removeFromCart(data.id)} className={cx('product__detail-delete')}>
            Xóa
          </button>
        )}
      </div>

      <div className={cx('change-quantity', openChange ? 'change-quantity--show' : '')}></div>
    </div>
  );
}

export default CartItem;
