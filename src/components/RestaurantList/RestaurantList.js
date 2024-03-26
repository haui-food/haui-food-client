import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { memo, useEffect, useState } from 'react';

import style from './RestaurantList.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader';
import NoResult from '../NoResult';
const cx = classNames.bind(style);
const nomalizeString = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
};
function RestaurentList({ category, query, type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurentList, setRestaurentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [isFirstMount, setFirstMount] = useState(true); // console.log('restaurentList');
  useEffect(() => {
    setFirstMount(false);
  }, []);

  let url = '';
  if (category) {
    const newCategory = nomalizeString(category);
    url = `https://testapi.io/api/lenghia0108/category/${newCategory}/page${currentPage}`;
  } else if (query) {
    url = `https://testapi.io/api/lenghia0108/restaurant/keyword=${query}`;
  } else if (!query && !category) {
    url = `https://testapi.io/api/lenghia0108/restaurent${currentPage}`;
  }
  // console.log(url);
  const fectRestaurants = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      // if (!response.ok) {
      //   throw new Error('Something went wrong');
      // }

      const data = await response.json();
      setTotalPages(data.totalPages);
      setTotalDocuments(data.totalDocuments);

      setRestaurentList((preRestaurent) => {
        return [...preRestaurent, ...data.data];
      });
      // console.log(restaurentList);
      setIsLoading(false);
      setCurrentPage((prePage) => prePage + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFirstMount && !query) {
      return;
    }
    if (!isFirstMount && query) {
      setRestaurentList([]);
      fectRestaurants();
    }
    console.log('query');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (isFirstMount) return;
    fectRestaurants();
    console.log('type');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  console.log('currantpage', currentPage);
  console.log('totalPages', totalPages);
  console.log(restaurentList.length);
  console.log(totalDocuments);
  console.log(restaurentList.length === totalDocuments);
  return (
    <div className={cx('restaurant-list')}>
      <div className={cx()}>
        <InfiniteScroll
          className={cx('infinite-scroll row')}
          dataLength={restaurentList.length}
          next={currentPage - 1 >= totalPages ? null : fectRestaurants}
          hasMore={restaurentList.length === totalDocuments ? false : true}
          scrollableTarget="restaurant-list"
        >
          {restaurentList.map((item, index) => {
            return (
              <div key={index} className={cx('col-xl-3 col-6')}>
                <div>
                  <ProductCard data={item} className={cx('restaurant-list__item')} />
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      {restaurentList.length <= 0 && <NoResult />}
      {isLoading && restaurentList.length > 0 && <Loader className={cx('list__loader')} />}
      {/* {currentPage - 1 === totalPage && <div className={cx('list__end')}></div>} */}
    </div>
  );
}

export default memo(RestaurentList);
