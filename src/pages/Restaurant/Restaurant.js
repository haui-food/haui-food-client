import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Restaurant.module.scss';
import Banner from '~/components/Banner/Banner';
import ListPromo from '~/components/ListPromo/ListPromo';
import Button from '~/components/Button/Button';
import ListCategorise from '~/components/ListCategorise/ListCategorise';
import { CheckIcon } from '~/components/Icons';
import images from '~/assets/images';
import RestaurantHeader from '~/components/RestaurantHeader/RestaurantHeader';

const cx = classNames.bind(styles);

const Restaurant = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('restaurant')}>
        <RestaurantHeader />
      </div>
    </div>
  );
};

export default Restaurant;
