import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './RestaurantList.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../Loader';
import NoResult from '../NoResult';
import { getRestaurants } from '~/apiService/restaurantService';
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
  const [isFirstMount, setFirstMount] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  // console.log('restaurentList');
  // const [keyword, setKeyword] = useState(query);

  const limit = 8;
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.restaurant);

  useEffect(() => {
    setIsLoading(reduxData.loading);
  }, [reduxData]);

  useEffect(() => {
    setFirstMount(false);
  }, []);

  // let url = '';
  // if (category) {
  //   const newCategory = nomalizeString(category);
  //   url = `https://testapi.io/api/lenghia0108/category/${newCategory}/page${currentPage}`;
  // } else if (query) {
  //   url = `https://testapi.io/api/lenghia0108/restaurant/keyword=${query}`;
  // } else if (!query && !category) {
  //   url = `https://testapi.io/api/lenghia0108/restaurent${currentPage}`;
  // }
  // console.log(url);
  const fectRestaurants = async () => {
    console.log('call api');
    if (!query) {
      dispatch(getRestaurants({ limit: limit, page: currentPage })).then((result) => {
        console.log(result);
        if (result.payload.code === 200) {
          setTotalPages(result.payload.data.totalPage);
          setTotalDocuments(result.payload.data.totalResult);
          setRestaurentList((preRestaurent) => {
            return [...preRestaurent, ...result.payload.data.shops];
          });
          setCurrentPage((pre) => ++pre);
          // setIsLoading(false);
        }
      });
    } else if (query) {
      // console.log('in query');
      dispatch(getRestaurants({ limit: limit, page: currentPage, keyword: query })).then((result) => {
        if (result.payload.code === 200) {
          console.log(result);
          if (result.payload.data.totalResult > 0) {
            setTotalPages(result.payload.data.totalPage);
            setTotalDocuments(result.payload.data.totalResult);
            setRestaurentList((preRestaurent) => {
              return [...preRestaurent, ...result.payload.data.shops];
            });
            setCurrentPage((pre) => {
              return ++pre;
            });
          } else {
            setHasMore(false);
          }
        }
      });
    } else {
      console.log('categories');
      setCurrentPage(1);
      setRestaurentList([]);
      setTotalPages(0);
      setTotalDocuments(0);
    }
  };

  useEffect(() => {
    // if (isFirstMount) {
    //   return;
    // }
    console.log('query change');
    console.log(query);
    if (!isFirstMount && query) {
      // console.log('in query');
      setCurrentPage(1);
      setRestaurentList([]);
      // setTotalPages(0);
      setTotalDocuments(0);
      setHasMore(true);
      // fectRestaurants();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    // if (isFirstMount && query) return;
    // fectRestaurants();
    setCurrentPage(1);
    setTotalPages(0);
    setRestaurentList([]);
    setTotalDocuments(0);
    setHasMore(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  console.log(query);
  console.log('currentPage', currentPage);
  console.log('totalDocuments', totalDocuments);
  console.log('restaurentList', restaurentList);
  console.log(hasMore);
  console.log('');

  return (
    <div className={cx('restaurant-list')}>
      <div className={cx()}>
        <InfiniteScroll
          scrollThreshold="5%"
          className={cx('infinite-scroll row')}
          dataLength={totalDocuments === 0 ? 8 : totalDocuments}
          next={() => {
            console.log('next');
            fectRestaurants();
            currentPage === 1 && totalDocuments === 0 && totalDocuments
              ? setHasMore(true)
              : restaurentList.length < totalDocuments
              ? setHasMore(true)
              : setHasMore(false);
          }}
          // hasMore={restaurentList.length === totalDocuments ? false : true}
          hasMore={hasMore}
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
      {!isLoading && restaurentList.length <= 0 && <NoResult />}
      {isLoading && restaurentList.length > 0 && <Loader className={cx('list__loader')} />}
      {/* {currentPage - 1 === totalPage && <div className={cx('list__end')}></div>} */}
    </div>
  );
}

export default memo(RestaurentList);
