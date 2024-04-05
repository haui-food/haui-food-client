import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';

import { useBasket } from '~/contexts/BasketContext';
import routes from '~/config/routes';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ArrowDownIcon, CartIcon, ClockIcon, CloseIcon, HomeIcon, MenuIcon } from '~/components/Icons';
import CartItem from '~/components/CartItem';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const { cartItems, clearCart } = useBasket();

  const [logo, setLogo] = useState(images.logoVip1);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(cartItems.totalPrice);
  const [displayQuantity, setDisplayQuantity] = useState(cartItems.quantity);
  const isProduct = cartItems.items.length > 0 ? true : false;
  const isCarts = cartItems.items.length > 0 ? true : false;
  const [isLogin, setIsLogin] = useState(false);

  const headerRef = useRef(null);
  const languagesRef = useRef(null);
  const languageBtnRef = useRef(null);
  const cartRef = useRef(null);

  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (auth || token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [auth]);

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
    if (showCart) {
      setShowCart(false);
    }
    if (showMenu) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) {
        if (window.scrollY > 0) {
          headerRef.current.style.backgroundColor = '#fff';
          headerRef.current.style.boxShadow = '0 1px 1px rgba(0, 0, 0, 0.12)';

          setLogo(images.logoVip2);
        } else {
          headerRef.current.style.backgroundColor = 'transparent';
          headerRef.current.style.boxShadow = '0 1px 1px transparent';
          if (location.pathname !== '/') {
            setLogo(images.logoVip2);
          } else {
            setLogo(images.logoVip1);
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [location]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setLogo(images.logoVip2);
    } else {
      setLogo(images.logoVip1);
    }
  }, [location]);

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
    } else {
      window.removeEventListener('wheel', disableScroll);
    }

    return () => {
      window.removeEventListener('wheel', disableScroll);
    };
  }, [showCart]);

  useEffect(() => {
    setDisplayPrice(cartItems.totalPrice);
    setDisplayQuantity(cartItems.quantity);
  }, [cartItems.totalPrice, cartItems.quantity]);

  return (
    <div ref={headerRef} className={cx('wrapper')}>
      <div className={cx('container gx-5')}>
        <div className={cx('header')}>
          {/* Mobile Menu */}
          <button onClick={() => setShowMenu(!showMenu)} className={cx('header__menu')}>
            <MenuIcon />
          </button>
          <ul className={cx('header__menu-options', showMenu ? 'header__menu-options--show' : '')}>
            <Link
              to={routes.home}
              onClick={() => {
                setShowCart(false);
                setShowMenu(false);
              }}
              className={cx('header__menu-option')}
            >
              <HomeIcon className={cx('icon')} />
              {t('header.na01')}
            </Link>
            <li
              onClick={() => {
                setShowCart(false);
                setShowMenu(false);
              }}
              className={cx('header__menu-option')}
            >
              <CartIcon className={cx('icon')} />
              {t('cart.title03')}
            </li>
            <li className={cx('header__menu-bottom')}></li>
          </ul>

          {/* Logo */}
          <Link
            to={routes.home}
            onClick={(e) => {
              location.pathname === '/' && e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={logo} alt="logo" className={cx('header__logo')} />
          </Link>

          {/* Actions */}
          <nav className={cx('header__actions')}>
            <div onClick={() => setShowCart(!showCart)} className={cx('header__actions-group', 'header__actions-cart')}>
              <Button haveProducts={isCarts} action outline leftIcon={<CartIcon className={cx('icon')} />}>
                {displayPrice !== 0 ? `${displayPrice.toLocaleString('vi-VN')} ₫` : ''}
              </Button>
              {isCarts && <span className={cx('header__actions-quantity')}>{displayQuantity}</span>}
            </div>
            {!isLogin && (
              <div className={cx('header__actions-group')}>
                <Link to={routes.login}>
                  <Button action outline>
                    {t('header.na02')}
                  </Button>
                </Link>
              </div>
            )}
            {isLogin && (
              <div className={cx('header__actions-group')}>
                <Link to={'#!'}>
                  <img className={cx('header__actions-avatar')} src={images.avatarDefault} alt="avatar" />
                </Link>
              </div>
            )}
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
                  Cookies.set('lang', 'zh');
                  setShowLanguages(false);

                  window.location.reload();
                }}
                className={cx('header__language')}
              >
                中国人
              </li>
            </ul>
          </nav>
        </div>

        {/* Cart */}
        <div className={cx('cart', showCart ? 'cart--show' : '')}>
          <div className={cx('cart__top')}>
            <button onClick={handleCloseCart} className={cx('cart__close')}>
              <CloseIcon />
            </button>
            {isProduct && (
              <div className={cx('cart__top-block')}>
                <h5 className={cx('cart__top-title')}>{t('cart.title01')}</h5>
                <p className={cx('cart__top-desc')}>
                  <ClockIcon className={cx('cart__top-clock')} />
                  <span>
                    {t('cart.desc01')} 15 {t('cart.desc05')}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className={cx('cart__container', !isProduct ? 'cart__container--center' : '')}>
            {!isProduct && (
              <div className={cx('cart__empty')}>
                <img className={cx('cart__empty-img')} src={images.cart} alt="cart" />
                <h5 className={cx('cart__empty-title')}>{t('cart.title02')}</h5>
                <p className={cx('cart__empty-desc')}>{t('cart.desc02')}</p>
                <button onClick={handleCloseCart} className={cx('cart__empty-btn')}>
                  {t('button.btn02')}
                </button>
              </div>
            )}

            {isProduct && (
              <div ref={cartRef} onWheel={handleWheel} className={cx('cart__scroll')}>
                <div className={cx('cart__content')}>
                  <div className={cx('cart__products')}>
                    <div className={cx('cart__products-top')}>
                      <Link to={'#!'}>
                        <h5 className={cx('cart__products-heading')}>HaUI Food</h5>
                      </Link>
                      <button onClick={() => clearCart()} className={cx('cart__products-delete-all')}>
                        {t('button.btn04')}
                      </button>
                    </div>
                    <div className={cx('cart__products-list')}>
                      {cartItems.items.map((cartItem) => (
                        <CartItem key={cartItem.id} data={cartItem} />
                      ))}
                    </div>
                  </div>
                  <div className={cx('cart__summary')}>
                    <div className={cx('cart__summary-info')}>
                      <span className={cx('cart__summary-price')}>{t('cart.desc03')}</span>
                      <span className={cx('cart__summary-price')}>
                        {cartItems.totalPrice.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                    <p className={cx('cart__summary-desc')}>{t('cart.desc04')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isProduct && (
            <div className={cx('cart__bottom')}>
              <div className={cx('cart__bottom-info')}>
                <span className={cx('cart__bottom-price')}>{t('cart.desc03')}</span>
                <span className={cx('cart__bottom-price')}>{cartItems.totalPrice.toLocaleString('vi-VN')} ₫</span>
              </div>
              <Button checkout primary>
                {/* {t('button.btn01')} */}
                {t('button.btn03')}
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Overlay */}
      {(showCart || showMenu) && (
        <div onClick={handleCloseCart} className={cx('overlay', showMenu || showCart ? 'overlay--show' : '')}></div>
      )}
    </div>
  );
}

export default Header;
