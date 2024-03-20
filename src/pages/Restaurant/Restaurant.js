import classNames from 'classnames/bind';
import styles from './Restaurant.module.scss';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListSlider from '~/components/ListSlider/ListSlider';
import RestaurantList from '~/components/RestaurantList';
const cx = classNames.bind(styles);

function Restaurant() {
  const { category } = useParams();
  const url = useLocation();
  const [currentPageType, setCurrentPageType] = useState(null);
  console.log(category);
  // kiểm tra xem đang là page restaurant hay restaurant by category
  useEffect(() => {
    if (url.pathname.includes('restaurant')) {
      setCurrentPageType('restaurant');
    }

    if (category) {
      setCurrentPageType('restaurantBycategory');
    }
  }, [category, currentPageType, url.pathname]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {currentPageType === 'restaurant' && (
          <div className={cx('restaurant__popular-list')}>
            <div className={cx('restaurant__popular-title')}>
              Popular Restaurants On <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
            </div>
            <ListSlider />

            <div className={cx('restaurant__popular-title')}>
              Restaurants On <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
            </div>
          </div>
        )}

        {currentPageType === 'restaurantBycategory' && (
          <div className={cx('restaurant__popular-list')}>
            <div className={cx('restaurant__popular-title')}>
              Restaurants On <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
            </div>
          </div>
        )}

        <div className={cx('restaurant__list')}>
          <RestaurantList category={category} />
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
