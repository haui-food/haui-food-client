import classNames from 'classnames/bind';
import styles from './Restaurants.module.scss';
import { useParams, useLocation,useNavigate,useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ListSlider from '~/components/ListSlider/ListSlider';
import RestaurantList from '~/components/RestaurantList';
import BreadCrumb from '~/components/BreadCrumb/BreadCrumb';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Restaurants() {
  const { t } = useTranslation();
  const { category } = useParams();
  const url = useLocation();
  const [currentPageType, setCurrentPageType] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  // console.log(category);
  // console.log(searchParams);
  // kiểm tra xem đang là page restaurant hay restaurant by category
  useEffect(() => {
    window.scrollTo(2, 2);
    const scrollElement = document.documentElement;
    window.addEventListener('scroll', function () {
      console.log(scrollElement.scrollTop);
      if (scrollElement.scrollTop <= 0) {
        scrollElement.scrollTop = 2;
      }
    });
  }, []);

  useEffect(() => {
    if (url.pathname.includes('restaurant')) {
      setCurrentPageType('restaurant');
    }
    if (category) {
      setCurrentPageType('restaurantBycategory');
    }
  }, [category, currentPageType, url.pathname, query]);

  const handleClick = (e) => {
    if (searchValue.trim()) {
      navigate(`/restaurant?q=${searchValue}`);
    }
    e.target.blur();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('restaurant__search-container')}>
          <SearchIcon className={cx('restaurant__search-icon')} />
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleClick(e);
              }
            }}
            value={searchValue}
            id="restaurant-search"
            type="text"
            className={cx('restaurant__search')}
            placeholder=""
          />
          <label htmlFor="restaurant-search" className={cx('restaurant__search-label')}>
            {t('restaurant.placeholder')}
          </label>
        </div>
      </div>
      <div className={cx('restaurant__sparate')}></div>
      <div className={cx('container')}>
        <div className={cx('restaurant')}>
          <BreadCrumb className={cx('restaurant__breadcrumb')} />
          {currentPageType === 'restaurant' && !query && (
            <div className={cx('restaurant__popular-list')}>
              <div className={cx('restaurant__popular-title')}>
                {t('restaurant.title01')} <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
              </div>
              <ListSlider />

              <div className={cx('restaurant__popular-title')}>
                {t('restaurant.title02')} <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
              </div>
            </div>
          )}

          {currentPageType === 'restaurantBycategory' && (
            <div className={cx('restaurant__popular-list')}>
              {/* <BreadCrumb className={cx('restaurant__breadcrumb')} /> */}
              <div className={cx('restaurant__popular-title')}>
                {t('restaurant.title02')}
                <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
              </div>
            </div>
          )}
          {query && (
            <div className={cx('restaurant__popular-title')}>
              {query} {t('restaurant.at')} <span className={cx('restaurant__popular-title--highlight')}>HauiFood</span>
            </div>
          )}
          <div className={cx('restaurant__list')}>
            <RestaurantList category={category} query={query} type={currentPageType} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
