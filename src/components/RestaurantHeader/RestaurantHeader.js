import React from 'react';
import styles from './RestaurantHeader.module.scss';
import classnames from 'classnames/bind';
import { ArrowRightIcon } from '~/components/Icons';
const cx = classnames.bind(styles);

const RestaurantHeader = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('bread-scrum')}>
        <a href="#">Trang chủ</a>
        <ArrowRightIcon />
        <a href="#">Nhà Hàng</a>
        <ArrowRightIcon />
        <span>Xôi Chú Ngọng - Đê La Thành</span>
      </div>
      <h1 className={cx('name')}>Xôi chú ngọng - Đê la thành</h1>
    </div>
  );
};

export default RestaurantHeader;
