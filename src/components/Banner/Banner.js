import React from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '../Icons';
const cx = classNames.bind(styles);

const listBanner = [
  'https://food.grab.com/static/page-home/VN-new-1.jpg',
  'https://food.grab.com/static/page-home/VN-new-2.jpg',
  'https://food.grab.com/static/page-home/VN-new-3.jpg',
];
function Banner({ className }) {
  const [bannerPath, setBannerPath] = useState(1);
  const [greeting, setGreeting] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours <= 12) {
      setGreeting('Good Morning');
    } else if (hours > 12 && hours <= 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  useEffect(() => {
    const randomPath = Math.floor(Math.random() * 3);
    // console.log(randomPath);
    setBannerPath(randomPath);
  }, []);

  return (
    <div className={cx('banner')} style={{ backgroundImage: `url(${listBanner[bannerPath]})` }}>
      <div className={cx('container')}>
        <div className={cx('banner__content-wrapper')}>
          <div className={cx('banner__content')}>
            <div className={cx('banner__greeting')}>{greeting}</div>
            <div className={cx('banner__caption')}>HauiFood Absolutely Good for You!</div>
            <div className={cx('banner__search-container')}>
              <input
                id="banner-search"
                name="banner-search"
                type="text"
                placeholder=""
                className={cx('banner__input-search')}
              />
              <label className={cx('banner__search-label')} htmlFor="banner-search">
                {t('home-banner.placeholder')}
              </label>
              <SearchIcon className={cx('search-icon')} />
            </div>
            <button className={cx('banner__search-btn')}>{t('home-banner.btn01')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
