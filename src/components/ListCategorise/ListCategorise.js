import classNames from 'classnames/bind';

import styles from './ListCategorise.module.scss';

const cx = classNames.bind(styles);

const data = [
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/collections/68/icons/upload-photo-icon_3d16a293ac324b7e9aed94d783a57864_1548575050539497623.webp',
    name: 'Weekend Treats',
  },
  {
    image:
      'https://food-cms.grab.com/compressed_webp/cuisine/209/icons/upload-photo-icon_65f41b40038b4b3ea672402e609d0e96_1548908793958778523.webp',
    name: 'Thịt',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/cuisine/83/icons/cedda467431a49bd88fb1fdf40a4c4a0_1562559607379193479.webp',
    name: 'Hủ tiếu',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/cuisine/135/icons/Pizza_32aed38d4c1d4dbcb2fe711f0aeb6e15_1547819221409327403.webp',
    name: 'Pizza',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/cuisine/62/icons/FastFood_4710e425c3d24db2aa4280aa207a22d3_1547819143037208832.webp',
    name: 'Gà rán - Burger',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/collections/38/icons/upload-photo-icon_11130fe9f9154c09b507516072864902_1548777275151458249.webp',
    name: 'Đồ uống lạnh',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/cuisine/130/icons/upload-photo-icon_5175b157c8114e51898b264e1173fafb_1548303610212783174.webp',

    name: 'Mỳ ý',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/collections/36/icons/upload-photo-icon_e816de4ec50a4e7a95fc6cc52e3072cd_1548575711684762474.webp',
    name: 'Hiso Party',
  },
  {
    image:
      'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/cuisine/29/icons/a928e8df0b8b4dfc856ac176c2cf6ecb_1662695866769706068.webp',
    name: 'Trà sữa',
  },
];

function ListCategorise() {
  return (
    <div className={cx('list-categorise', 'row')}>
      {data.map((item, index) => (
        <div className={cx('col-xl-3 col-6')}>
          <div className={cx('list-categorise__item')} key={index}>
            <img className={cx('category-img')} src={item.image} alt={item.name} />
            <span className={cx('category-name')}>{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListCategorise;
