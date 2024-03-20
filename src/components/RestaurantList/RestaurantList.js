import classNames from 'classnames/bind';
import style from './RestaurantList.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useState } from 'react';
import Loader from '../Loader';
const cx = classNames.bind(style);

function RestaurentList({ category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurentList, setRestaurentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [totalDocuments, setTotalDocuments] = useState(null);

  let url = '';
  if (category) {
    const newCategory = category.toLowerCase();
    // console.log(newCategory);
    url = `https://testapi.io/api/lenghia0108/category/${newCategory}/page${currentPage}`;
  } else {
    url = `https://testapi.io/api/lenghia0108/restaurent${currentPage}`;
  }

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
      setIsLoading(false);
      setCurrentPage((prePage) => prePage + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('row')}>
        <InfiniteScroll
          className={cx('infinite-scroll')}
          dataLength={restaurentList.length}
          next={currentPage - 1 === totalPages ? false : fectRestaurants}
          hasMore={restaurentList.length === totalDocuments ? false : true}
          scrollableTarget="restaurant-list"
        >
          {restaurentList.map((item, index) => {
            return (
              <div key={index} className={cx('col-xl-3 col-6')}>
                <div className={cx('restaurant-list__item')}>
                  <ProductCard data={item} />
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      {restaurentList.length <= 0 && <h2>không có kết quả</h2>}
      {isLoading && restaurentList.length > 0 && <Loader className={cx('list__loader')} />}
      {/* {currentPage - 1 === totalPage && <div className={cx('list__end')}></div>} */}
    </div>
  );
}

export default RestaurentList;
