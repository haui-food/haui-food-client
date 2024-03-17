import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CartItem.module.scss';
import { MinusIcon, PlusIcon } from '../Icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function CartItem() {
  const [quantity, setQuantity] = useState(1);
  const [openChange, setOpenChange] = useState(false);

  const handleIncreasedQuantities = () => {
    setQuantity((preQuantity) => preQuantity + 1);
  };

  const handleReducedQuantities = () => {
    if (quantity > 0) {
      setQuantity((preQuantity) => preQuantity - 1);
    }
  };

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
        <img src={images.banhtieusr} alt="" className={cx('product__thumb')} />
      </div>

      <div className={cx('product__detail')}>
        <p className={cx('product__detail-name')}>Bánh Tiêu Cade Sầu Riêng</p>
        {quantity !== 0 && <span className={cx('product__detail-price')}>10.000</span>}
        {quantity === 0 && <button className={cx('product__detail-delete')}>Xóa</button>}
      </div>

      <div className={cx('change-quantity', openChange ? 'change-quantity--show' : '')}></div>
    </div>
  );
}

export default CartItem;
