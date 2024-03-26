import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CartItem.module.scss';
import Button from '../Button';
import { CloseIcon, MinusIcon, PlusIcon } from '../Icons';
import { useBasket } from '~/contexts/BasketContext';

const cx = classNames.bind(styles);

function CartItem({ data }) {
  const { cartItems, removeFromCart, updateCartItems } = useBasket();
  const [quantity, setQuantity] = useState(data.quantity);
  const [openChange, setOpenChange] = useState(false);
  const [changeQuantity, setChangeQuantity] = useState(data.quantity);

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

  const temporaryIncreasedQuantity = () => {
    setChangeQuantity((preQuantity) => preQuantity + 1);
  };

  const temporaryReducedQuantity = () => {
    if (changeQuantity > 0) {
      setChangeQuantity((preQuantity) => preQuantity - 1);
    }
  };

  const handleUpdateQuantity = () => {
    setQuantity(changeQuantity);
    const newCartItems = cartItems.items.map((cartItem) => {
      if (cartItem.id === data.id) {
        return { ...cartItem, quantity: changeQuantity };
      }
      return cartItem;
    });
    updateCartItems(newCartItems);
  };

  useEffect(() => {
    const matchingItem = cartItems.items.find((item) => item.id === data.id);
    if (matchingItem) {
      setQuantity(matchingItem.quantity);
    }
  }, [cartItems, data.id]);

  useEffect(() => {
    setChangeQuantity(quantity);
  }, [quantity]);

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

      <div className={cx('change-quantity', openChange ? 'change-quantity--show' : '')}>
        <button onClick={() => setOpenChange(false)} className={cx('change-quantity__close')}>
          <CloseIcon className={cx('change-quantity__icon')} />
        </button>
        <img src={data.image} className={cx('change-quantity__img')} alt="" />
        <div className={cx('change-quantity__first')}>
          <h1 className={cx('change-quantity__name')}>{data.name}</h1>
          <p className={cx('change-quantity__desc')}>{data.name}</p>
        </div>
        <div className={cx('change-quantity__last')}>
          <h2 className={cx('change-quantity__title')}>Thay đổi số lượng</h2>
          <div className={cx('change-quantity__btn-group')}>
            <button onClick={temporaryReducedQuantity} className={cx('change-quantity__quantity-btn')}>
              <MinusIcon />
            </button>
            <span className={cx('change-quantity__quantity-number')}>{changeQuantity}</span>
            <button onClick={temporaryIncreasedQuantity} className={cx('change-quantity__quantity-btn')}>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className={cx('change-quantity__footer')}>
          <div
            onClick={() => {
              handleUpdateQuantity();
              setOpenChange(false);
            }}
          >
            <Button checkout primary>
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
