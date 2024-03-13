import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
  const { t } = useTranslation();

  const [imgUrl, setImgUrl] = useState('https://food.grab.com/static/page-home/VN-new-1.jpg');

  return (
    <div className={cx('home')}>
      <div
        className={cx('banner')}
        style={{ backgroundImage: 'url(https://food.grab.com/static/page-home/VN-new-3.jpg)' }}
      ></div>

      <div className={cx('container')}>
        <h1 className={cx('heading')}>{t('header.na01')}</h1>
      </div>
    </div>
  );
}

export default Home;
