import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './CartItem.module.scss';
import { MinusIcon, PlusIcon } from '../Icons';

const cx = classNames.bind(styles);

function CartItem() {
  const { t } = useTranslation();

  return (
    <div className={cx('product')}>
      <div className={cx('product__quantity')}>
        <MinusIcon />
        <span className={cx('product__quantity-number')}>1</span>
        <PlusIcon />
      </div>
      <div className={cx('product__img-wrap')}>
        <img src="" alt="" className={cx('product__thumb')} />
      </div>
      <div className={cx('product__detail')}>
        <p className={cx('product__detail-name')}>Bánh Tiêu Cade Sầu Riêng</p>
        <span className={cx('product__detail-price')}>10.000</span>
      </div>
    </div>
  );
}

export default CartItem;
