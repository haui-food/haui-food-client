import React from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingIcon, SearchIcon, CircleCloseIcon } from '../Icons';

const cx = classNames.bind(styles);

const listBanner = [
  'https://food.grab.com/static/page-home/VN-new-1.jpg',
  'https://food.grab.com/static/page-home/VN-new-2.jpg',
  'https://food.grab.com/static/page-home/VN-new-3.jpg',
];
function Banner({ className, onSearch, onSearchResult, onPage }) {
  const { t } = useTranslation();
  const [bannerPath, setBannerPath] = useState(1);
  const [greeting, setGreeting] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef();

  // hàm call api
  const fetchApi = async () => {
    setIsLoading(true);
    onSearch('loading');
    onSearchResult(searchResult);
    // const url = `https://api.mockfly.dev/mocks/b4cb85f6-7fe5-4258-85f4-1a73d7eef7f1/product${onPage}`;
    const url = `https://testapi.io/api/lenghia0108/product${onPage}`;
    const result = await fetch(url)
      .then((respone) => {
        return respone.json();
      })
      .catch((err) => {
        alert(err);
      });

    // console.log(result);
    onSearchResult(result);
    onSearch('true');
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log(isMounted);
    if (isMounted) {
      fetchApi();
    }
  }, [onPage]);

  // call api khi nhấn tìm kiếm
  const handleClick = () => {
    if (!searchValue.trim()) {
      return setSearchResult([]);
    }
    fetchApi();
  };

  // thiết lập câu chào của banner theo thời gian thực
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours <= 12) {
      setGreeting('Good Morning');
    } else if (hours > 12 && hours <= 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  // random ảnh của banner khi tải lại trang
  useEffect(() => {
    const randomPath = Math.floor(Math.random() * 3);

    setBannerPath(randomPath);
  }, []);

  // two way bindding
  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  //clear input khi bấm nút close
  const handleClear = () => {
    if (isLoading) {
      return;
    }
    setSearchValue('');
    inputRef.current.focus();
  };

  useEffect(() => {
    setIsMounted(true); // Thiết lập mounted là true khi component mount
    return () => {
      setIsMounted(false); // Reset mounted là false khi component unmount
    };
  }, []);

  return (
    <div className={cx('banner')} style={{ backgroundImage: `url(${listBanner[bannerPath]})` }}>
      <div className={cx('container')}>
        <div className={cx('banner__content-wrapper')}>
          <div className={cx('banner__content')}>
            <div className={cx('banner__greeting')}>{greeting}</div>
            <div className={cx('banner__caption')}>HauiFood Absolutely Good for You!</div>
            <div className={cx('banner__search-container')}>
              <input
                ref={inputRef}
                id="banner-search"
                name="banner-search"
                type="text"
                placeholder=""
                value={searchValue}
                onChange={handleChange}
                className={cx('banner__input-search')}
              />
              <label className={cx('banner__search-label')} htmlFor="banner-search">
                {t('home-banner.placeholder')}
              </label>

              {searchValue && (
                <div onClick={handleClear}>
                  <CircleCloseIcon className={cx('close-icon')} />
                </div>
              )}
              {!isLoading && (
                <div onClick={handleClick}>
                  <SearchIcon className={cx('search-icon')} />
                </div>
              )}
              {isLoading && <LoadingIcon className={cx('search-icon', 'banner__search-spinning-icon')} />}
            </div>
            <button onClick={handleClick} className={cx('banner__search-btn')}>
              {t('home-banner.btn01')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
