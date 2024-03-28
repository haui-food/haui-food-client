import React from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className={cx('bg-purple')}>
      <div className={cx('stars')}>
        <div className={cx('central-body')}>
          <img loading="lazy" className={cx('image-404')} src={images.notFound} alt="404" width="300px" />
          <Link to={routes.home} className={cx('btn-go-home')}>
            {t('button.btn13')}
          </Link>
        </div>
        <div className={cx('objects')}>
          <img loading="lazy" className={cx('object_rocket')} src={images.rocket} alt="rocket" width="40px" />
          <div className={cx('earth-moon')}>
            <img loading="lazy" className={cx('object_earth')} src={images.earth} alt="earth" width="100px" />
            <img loading="lazy" className={cx('object_moon')} src={images.moon} alt="moon" width="80px" />
          </div>
        </div>
        <div className={cx('glowing_stars')}>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
          <div className={cx('star')}></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
