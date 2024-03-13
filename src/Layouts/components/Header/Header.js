import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import images from '~/assets/images';
import { useEffect, useRef } from 'react';
import Button from '~/components/Button';
import { ArrowDownIcon, CartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 1) {
        headerRef.current.style.backgroundColor = '#fff';
      } else {
        headerRef.current.style.backgroundColor = 'transparent';
      }
    };
  }, []);

  return (
    <div ref={headerRef} className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <Link to={routes.home}>
            <img src={images.logo} alt="logo" className={cx('header__logo')} />
          </Link>

          <div className={cx('header__actions')}>
            <Button action outline>
              <CartIcon className={cx('icon')} />
            </Button>
            <Button action outline>
              Đăng nhập/Đăng kí
            </Button>
            <Button action outline rightIcon={<ArrowDownIcon className={cx('icon')} />}>
              VI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
