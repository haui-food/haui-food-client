import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';

import routes from '~/config/routes';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ArrowDownIcon, CartIcon, ClockIcon, CloseIcon } from '~/components/Icons';
import CartItem from '~/components/CartItem';

const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const isProduct = true;

  const headerRef = useRef(null);
  const languagesRef = useRef(null);
  const languageBtnRef = useRef(null);
  const cartRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      languagesRef.current &&
      !languagesRef.current.contains(event.target) &&
      !languageBtnRef.current.contains(event.target)
    ) {
      setShowLanguages(false);
    }
  }, []);

  const handleWheel = (e) => {
    if (cartRef.current) {
      cartRef.current.scrollTop += e.deltaY * 0.4;
    }
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 1) {
        headerRef.current.style.backgroundColor = '#fff';
      } else {
        headerRef.current.style.backgroundColor = 'transparent';
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const disableScroll = (event) => {
      event.preventDefault();
    };

    if (showCart) {
      window.addEventListener('wheel', disableScroll, { passive: false });
      window.addEventListener('touchmove', disableScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    }

    return () => {
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    };
  }, [showCart]);

  return (
    <div ref={headerRef} className={cx('wrapper')}>
      <div className={cx('container gx-5')}>
        <div className={cx('header')}>
          {/* Logo */}
          <Link to={routes.home}>
            <img src={images.logo} alt="logo" className={cx('header__logo')} />
          </Link>

          {/* Actions */}
          <div className={cx('header__actions')}>
            <div onClick={() => setShowCart(!showCart)} className={cx('header__actions-group', 'header__actions-cart')}>
              <Button action outline>
                <CartIcon className={cx('icon')} />
              </Button>
            </div>
            <div className={cx('header__actions-group')}>
              <Button action outline>
                {t('header.na02')}
              </Button>
            </div>
            <div
              className={cx('header__actions-group')}
              ref={languageBtnRef}
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <Button action outline rightIcon={<ArrowDownIcon className={cx('icon')} />}>
                {Cookies.get('lang').toUpperCase()}
              </Button>
            </div>

            {/* Language options */}
            <ul ref={languagesRef} className={cx('header__languages', showLanguages ? 'header__languages--show' : '')}>
              <li
                onClick={() => {
                  Cookies.set('lang', 'en');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                English
              </li>
              <li
                onClick={() => {
                  Cookies.set('lang', 'vi');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                Tiếng Việt
              </li>
              <li
                onClick={() => {
                  Cookies.set('lang', 'zh');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                中国人
              </li>
            </ul>
          </div>
        </div>

        {/* Cart */}
        <div className={cx('cart', showCart ? 'cart--show' : '')}>
          <div className={cx('cart__top')}>
            <button onClick={handleCloseCart} className={cx('cart__close')}>
              <CloseIcon />
            </button>
            {isProduct && (
              <div className={cx('cart__top-block')}>
                <h5 className={cx('cart__top-title')}>Giỏ đồ ăn</h5>
                <p className={cx('cart__top-desc')}>
                  <ClockIcon className={cx('cart__top-clock')} />
                  <span>Thời gian giao: 15 phút (Cách bạn 0,5 km)</span>
                </p>
              </div>
            )}
          </div>
          <div className={cx('cart__container', !isProduct ? 'cart__container--center' : '')}>
            {!isProduct && (
              <div className={cx('cart__empty')}>
                <img className={cx('cart__empty-img')} src={images.cart} alt="cart" />
                <h5 className={cx('cart__empty-title')}>Giỏ hàng trống</h5>
                <p className={cx('cart__empty-desc')}>Thêm sản phẩm vào giỏ hàng của bạn và đặt hàng tại đây.</p>
                <button onClick={handleCloseCart} className={cx('cart__empty-btn')}>
                  Tiếp trục mua hàng
                </button>
              </div>
            )}

            {isProduct && (
              <div ref={cartRef} onWheel={handleWheel} className={cx('cart__scroll')}>
                <div className={cx('cart__content')}>
                  <div className={cx('cart__products')}>
                    <Link to={'#!'}>
                      <h5 className={cx('cart__products-heading')}>HaUI Food</h5>
                    </Link>
                    <div className={cx('cart__products-list')}>
                      <CartItem />
                    </div>
                  </div>
                  <div className={cx('cart__summary')}>
                    <div className={cx('cart__summary-info')}>
                      <span className={cx('cart__summary-price')}>Tổng cộng</span>
                      <span className={cx('cart__summary-price')}>510.000 ₫</span>
                    </div>
                    <p className={cx('cart__summary-desc')}>Phí giao hàng sẽ được tính tự động sau khi bạn đặt đơn.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isProduct && (
            <div className={cx('cart__bottom')}>
              <div className={cx('cart__bottom-info')}>
                <span className={cx('cart__bottom-price')}>Tổng cộng</span>
                <span className={cx('cart__bottom-price')}>510.000 ₫</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Overlay */}
      {showCart && <div onClick={handleCloseCart} className={cx('overlay', showCart ? 'overlay--show' : '')}></div>}
    </div>
  );
}

export default Header;
