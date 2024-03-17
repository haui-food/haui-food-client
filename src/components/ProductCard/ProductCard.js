import classNames from 'classnames/bind';

import styles from './ProductCard.module.scss';
import { EmptyStarIcon, HaftStarIcon, StarIcon } from '../Icons';

const cx = classNames.bind(styles);

function ProductCard({ data, className }) {
  const rating = data.rating || 0;
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars !== 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) stars.push(<StarIcon className={cx('star-icon')} />);
    else if (i === fullStars + 1 && halfStars) stars.push(<HaftStarIcon className={cx('star-icon')} />);
    else stars.push(<EmptyStarIcon className={cx('star-icon')} />);
  }

  return (
    <div className={cx('product-card', className)}>
      <img src={data.image} className={cx('product-card__img')} alt="" />
      <div className={cx('product-card__content')}>
        <div className={cx('product-card__name')}>{data.name}</div>

        <div className={cx('product-card__categorise')}>{data.categorise}</div>
        <div className={cx('product-card__rating-container')}>
          <div className={cx('product-card__rating')}>{data.rating}</div>
          <div className={cx('star-container')}>
            {stars.map((star, index) => {
              return star;
            })}
          </div>
          <div className={cx('product-card__rating')}>Reviews</div>
        </div>

        <div className={cx('product-card__discount-container')}>
          <div className={cx('product-card__discount-tag')}></div>
          <div className={cx('product-card__discount-text')}>{data.discount}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
