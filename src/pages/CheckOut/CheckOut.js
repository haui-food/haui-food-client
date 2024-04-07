import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './CheckOut.module.scss';
import { useEffect } from 'react';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CheckOut() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cx('checkout')}>
      <div className={cx('container gx-5')}>
        <div className={cx('checkout__top')}>
          <div>
            <h1 className={cx('checkout__heading')}>Bước cuối cùng - Thanh toán</h1>
            <h4 className={cx('checkout__name')}>LÂM SUSHI - Cơm Cà Ri Vị Nhật</h4>
          </div>
        </div>
      </div>

      <div className={cx('checkout__content')}></div>

      <div className={cx('checkout__bottom')}>
        <div className={cx('container gx-5 justify-content-center')}>
          <div className={cx('checkout__bottom-footer')}>
            <div className={cx('checkout__bottom-info')}>
              <h5>Tổng cộng</h5>
              <h4>73.100 ₫</h4>
            </div>
            <Button order primary>
              Đặt đơn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
