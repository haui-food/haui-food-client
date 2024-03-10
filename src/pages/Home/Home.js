import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  const { t } = useTranslation();

  return <h1 className={cx('heading')}>{t('header.na01')}</h1>;
}

export default Home;
