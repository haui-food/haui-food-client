import classNames from 'classnames/bind';
import style from './ListResutl.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import ReactPaginate from 'react-paginate';
const cx = classNames.bind(style);

function ListResutl({ data, className, onChangePage }) {
  // console.log('data list', data);

  if (data === undefined || !Array.isArray(data.data) || data.length === 0) {
    return <h1>Khong co ket qua</h1>;
  }

  const handlePageChange = (event) => {
    onChangePage(event.selected + 1);
  };

  return (
    <div className={cx('list')}>
      {data && (
        <div className={cx('list-container')}>
          <div className={cx('row gy-5')}>
            {data.data.map((item, index) => {
              return (
                <div key={index} className={cx('col-xl-3 col-6')}>
                  <ProductCard data={item} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className={cx('pagination-container')}>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName={cx('page-item')}
          pageLinkClassName={cx('page-item-link')}
          previousClassName={cx('prev-item')}
          previousLinkClassName={cx('page-item-link')}
          nextClassName={cx('next-item')}
          nextLinkClassName={cx('page-item-link')}
          breakLabel="..."
          breakClassName={cx('page-item')}
          breakLinkClassName={cx('page-item-link')}
          pageCount={3}
          marginPagesDisplayed={3}
          pageRangeDisplayed={2}
          containerClassName={cx('pagination')}
          activeClassName={cx('page-item-active')}
          forcePage={+(data.currentPage - 1)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ListResutl;
