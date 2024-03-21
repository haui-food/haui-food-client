import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowDownIcon, StarIcon, ClockIcon, CalendarIcon } from '../Icons';
import classnames from 'classnames/bind';
import styles from './RestaurantHeader.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const cx = classnames.bind(styles);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'white' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'black' }} onClick={onClick} />;
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const RestaurantHeader = ({ restaurant }) => {
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [isOpenAddr, setIsOpenAddr] = useState(false);
  const [isOpenShippingTime, setIsOpenShippingTime] = useState(false);
  // const [directories, setDirectories] = useState([]);
  useEffect(() => {
    if (restaurant) {
      setDeliveryAddress(restaurant.deliveryAddress[0]);
      setDeliveryTime(restaurant.deliveryTime[0]);
    }
  }, [restaurant]);

  if (!restaurant || !deliveryAddress) {
    return null;
  }

  const toggleDropdownAddr = () => {
    setIsOpenAddr(!isOpenAddr);
    setIsOpenShippingTime(false);
  };

  const toggleDropdownTime = () => {
    setIsOpenShippingTime(!isOpenShippingTime);
    setIsOpenAddr(false);
  };

  const handleAddrItemClick = (value) => {
    console.log('Selected value:', value); // Xử lý giá trị đã chọn từ dropdown
    setDeliveryAddress(value);
    setIsOpenAddr(false); // Ẩn dropdown menu sau khi lựa chọn
  };

  const handleTimeItemClick = (value) => {
    console.log('Selected value:', value); // Xử lý giá trị đã chọn từ dropdown
    setDeliveryTime(value);
    setIsOpenShippingTime(false); // Ẩn dropdown menu sau khi lựa chọn
  };

  return (
    <div className={cx('header')}>
      <div className={cx('header__breadcrumb')}>
        <a href="/">Trang chủ</a>
        <ArrowRightIcon className={cx('arrowRightIcon')} />
        <a href="#">Nhà hàng</a>
        <ArrowRightIcon className={cx('arrowRightIcon')} />
        <span>{restaurant.restaurantName || ''}</span>
      </div>
      <h1>{restaurant.restaurantName || ''}</h1>

      <div className={cx('header__cuisine')}>{restaurant.products}</div>
      <div className={cx('header__ratingAndDistance')}>
        <StarIcon className={cx('header__ratingAndDistance--star')} />
        <span>{restaurant.ratingStar}</span>

        <div className={cx('header__ratingAndDistance--timerAndDistance')}>
          <ClockIcon />
          <span>
            {restaurant.time} - {restaurant.distance}
          </span>
        </div>
      </div>
      {restaurant.openTime === '' ? (
        ''
      ) : (
        <div classnames={cx('header__openHours')}>
          <span>Giờ mở cửa</span>
          <span className={cx('header__openHours--hours')}>{restaurant.openTime}</span>
        </div>
      )}

      <div className={cx('header__promoWrapper')}>
        Ưu đãi <div className={cx('header__promoWrapper--detail')}>Xem chi tiết</div>
      </div>

      <div className={cx('header__selectBox')}>
        <div className={cx('date-box')}>
          <section className={cx('header__selectBox--selected')} onClick={toggleDropdownAddr}>
            <article className={cx('header__selectBox--selected--calendar')}>
              <div>
                <CalendarIcon />
                <span>{deliveryAddress}</span>
              </div>
              <ArrowDownIcon />
            </article>
          </section>
          {isOpenAddr && (
            <div className={cx('date-box__submenu')}>
              <ul className={styles.dropdownMenu}>
                {restaurant.deliveryAddress.map((option, index) => (
                  <li key={index} onClick={() => handleAddrItemClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={cx('time-box')}>
          <section className={cx('header__selectBox--selected', 'time-box')} onClick={toggleDropdownTime}>
            <article className={cx('header__selectBox--selected--timer')}>
              <div>
                <ClockIcon /> <span>{deliveryTime}</span>
              </div>
              <ArrowDownIcon />
            </article>
          </section>
          {isOpenShippingTime && (
            <div className={cx('time-box__submenu')}>
              <ul className={styles.dropdownMenu}>
                {restaurant.deliveryTime.map((option, index) => (
                  <li key={index} onClick={() => handleTimeItemClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="slider-container">
        <Slider {...settings} className="slider">
          {restaurant.directories.map((item, index) => {
            return (
              <div className={cx('header__category')} key={index}>
                {item}
              </div>
            );
          }) || ''}
        </Slider>
      </div>
    </div>
  );
};

export default RestaurantHeader;
