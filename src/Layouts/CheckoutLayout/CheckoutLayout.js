import classNames from 'classnames/bind';

import styles from './CheckoutLayout.module.scss';

import Header from '~/Layouts/components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
