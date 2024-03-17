import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';

import Banner from '~/components/Banner/Banner';
import ListPromo from '~/components/ListPromo/ListPromo';
import Button from '~/components/Button/Button';
import ListCategorise from '~/components/ListCategorise/ListCategorise';
import { CheckIcon } from '~/components/Icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Home() {
  const { t } = useTranslation();
  const listReasons = [
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword01'),
      text: t('home.reasonText01'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword02'),
      text: t('home.reasonText02'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword03'),
      text: t('home.reasonText03'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword04'),
      text: t('home.reasonText04'),
    },
    {
      icon: CheckIcon,
      keyword: t('home.reasonKeyword05'),
      text: t('home.reasonText05'),
    },
  ];
  return (
    <div className={cx('home')}>
      <div>
        <Banner />
      </div>
      <div className={cx('sparate')}></div>
      <div className={cx('container')}>
        <h1 className={cx('home__title-1')}>
          {t('home.title01')} <span className={cx('home__title-1--highlight')}>Haui</span>
        </h1>

        <div>
          <ListPromo />
        </div>

        <Button large className={cx('home__btn')}>
          See All promotions
        </Button>

        <div className={cx('home__title-2', 'home__title--margin')}>{t('home.title02')}</div>

        <ListCategorise />

        <div className={cx('home__title-3', 'home__title--no-margin')}>{t('home.title03')}</div>

        <div className={cx('reason-container')}>
          {listReasons.map((reason, index) => {
            const Icon = reason.icon || <></>;

            return (
              <div className={cx('reason-item')}>
                <Icon className={cx('reason-item__check-icon')} />
                <p className={cx('reason-item__text')}>
                  <span className={cx('reason-item__keyword')}>{reason.keyword}</span> - {reason.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className={cx('home__title-4')}>{t('home.title04')}</div>
        <div className={cx('home__sub-title')}>{t('home.subtitle')}</div>
        <p className={cx('home__faq-text')}>{t('home.desc01')}</p>

        <Button large className={cx('home__btn')}>
          Read More
        </Button>
      </div>
      <div className={cx('banner-footer')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-md-6 col-12')}>
              <div className={cx('banner-footer__left')}>
                <img
                  src="https://food.grab.com/static/page-home/bottom-food-options.svg"
                  alt="HauiFood"
                  className={cx('banner-footer__left-img')}
                />

                <div className={cx('banner-footer__title')}>Curated restaurants</div>
                <p className={cx('banner-footer__desc')}>
                  From small bites to big meals, we won't limit your appetite. Go ahead and order all you want.
                </p>
              </div>
            </div>
            <div className={cx('col-md-6 col-12')}>
              <div className={cx('banner-footer__right')}>
                <img
                  src="https://food.grab.com/static/images/ilus-cool-features-app.svg"
                  alt="HauiFood"
                  className={cx('banner-footer__right-img')}
                />
                <div className={cx('banner-footer__title')}>More cool features available on the app</div>
                <p className={cx('banner-footer__desc')}>
                  Download Grab app to use other payment methods and enjoy seamless communication with your driver.
                </p>

                <div className={cx('banner-footer__logo-container')}>
                  <img src={images.appStore} className={cx('banner-footer__logo')} alt="" />
                  <img src={images.googlePlay} className={cx('banner-footer__logo')} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
