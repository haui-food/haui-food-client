import classNames from 'classnames/bind';
import styles from './RestaurentsByCategory.module.scss';

const cx = classNames.bind(styles);

function RestaurentsByCategory() {
  return (
    <div className={cx('wrapper')}>
      <h1>RestaurentsByCategory</h1>
    </div>
  );
}

export default RestaurentsByCategory;
