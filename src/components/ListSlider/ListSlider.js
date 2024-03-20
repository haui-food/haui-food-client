import classNames from 'classnames/bind';
import styles from './ListSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '~/components/ProductCard/ProductCard';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

function SampleNextArrow(props) {
  const { className, style, onClick, customClass } = props;
  return (
    <div
      className={`${className} ${customClass}`}
      style={{ ...style, display: 'block', color: 'rgb(103, 103, 103)' }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, customClass } = props;
  return (
    <div
      className={`${className} ${customClass}`}
      style={{ ...style, display: 'block', color: 'rgb(103, 103, 103)' }}
      onClick={onClick}
    ></div>
  );
}

const data = [
  {
    image:
      'https://food-cms.grab.com/compressed_webp/merchants/5-C4EKLZN2CBEUUE/hero/faff5dbaf7024a2c98f33303920f8ef1_1688956019240286277.webp',

    name: 'Xôi Chú Ngọng - Đê La Thành',
    categorise: 'Bánh Mì - Xôi',
    rating: 4.5,
    discount: 'ƯU đãi đến 10k',
  },
  {
    image:
      'https://food-cms.grab.com/compressed_webp/merchants/VNGFVN000006ic/hero/24fbc54429f749338dee3df63eeec532_1709525928028380920.webp',
    name: "McDonald's - Hồ Gươm",
    categorise: 'Gà rán-Burger, đồ ăn quốc tế',
    rating: 2.5,
    discount: 'Ưu đãi đến 15k',
  },
  {
    image:
      'https://food-cms.grab.com/compressed_webp/merchants/5-C4CEPAAEL4CJJA/hero/782d2085-530e-48fa-9fa2-f392d8f54a4f__store_cover__2023__08__01__06__31__39.webp',
    name: 'Quán Cơm Rang 1989 - Cơm Rang Văn Phòng',
    categorise: 'cơm',
    rating: 3,
    discount: 'Ưu đãi đến 25k',
  },
  {
    image:
      'https://food-cms.grab.com/compressed_webp/merchants/5-C2WXPA4DUGBXLT/hero/6a6aca09-adbb-4a42-95d9-1b774c5a0d85__store_cover__2023__09__27__14__59__26.webp',

    name: 'Gimbap PingPong',
    categorise: 'Món Quốc Tế',
    rating: 5,
    discount: 'Ưu đãi đến 55k',
  },
  {
    image:
      'https://food-cms.grab.com/compressed_webp/merchants/5-C4EGNT6GRU4XJN/hero/a633f82f-14ca-479b-9301-993145ac7c3c__store_cover__2023__08__02__20__56__41.webp',

    name: 'A đây rồi - Spaghetti & Salad',
    categorise: 'Món quốc tế, Salad Heathy - Đồ Chay',
    rating: 5,
    discount: 'Ưu đãi đến 55k',
  },
];

function ListPromo() {
  const settings = {
    speed: 500,
    className: cx('list-slider'),
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    nextArrow: <SampleNextArrow customClass={cx('next-arrow')} />,
    prevArrow: <SamplePrevArrow customClass={cx('prev-arrow')} />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
    ],
  };
  return (
    <div className={cx('list-promo')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <Slider {...settings}>
            {data.map((item, index) => {
              return (
                <div key={index} className={cx('item')}>
                  <ProductCard
                    className={cx({ 'first-item': index === 0 }, { 'last-item': index === data.length })}
                    data={item}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ListPromo;
