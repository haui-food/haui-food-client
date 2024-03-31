import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './AboutHaUIFood.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { QuotesIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function AboutHaUIFood() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cx('about')}>
      <img className={cx('about__img')} src={images.aboutOffice} alt="van-phong" />

      <div className={cx('container gx-5')}>
        <div className={cx('about__top')}>
          <h3 data-aos="zoom-in-right" className={cx('about__title')}>
            {t('about-HaUIFood.heading01')}
          </h3>
          <p data-aos="zoom-in-left" className={cx('about__desc')}>
            {t('about-HaUIFood.desc01')}
          </p>
          <p data-aos="zoom-in-left" className={cx('about__desc')}>
            {t('about-HaUIFood.desc02')}
          </p>
          <Link to={routes.home} rel="noreferrer" target="_blank" className={cx('about__btn')}>
            <Button more primary>
              {t('button.btn14')}
            </Button>
          </Link>
        </div>
        <div className={cx('about__intro')}>
          <div className={cx('about__intro-wrapper')}>
            <div className={cx('about__intro-item')} data-aos="fade-up-right">
              <h5 className={cx('about__intro-title')}>{t('about-HaUIFood.heading02')}</h5>
              <p className={cx('about__intro-desc')}>{t('about-HaUIFood.desc03')}</p>
            </div>
            <div className={cx('about__intro-item')} data-aos="fade-down-left">
              <h5 className={cx('about__intro-title')}>{t('about-HaUIFood.heading03')}</h5>
              <p className={cx('about__intro-desc')}>{t('about-HaUIFood.desc04')}</p>
            </div>
          </div>

          <div className={cx('about__intro-wrapper')}>
            <div className={cx('about__intro-item', 'about__intro-item--xl')}>
              <h5 data-aos="zoom-in-right" className={cx('about__intro-title')}>
                {t('about-HaUIFood.heading04')}
              </h5>
              <p data-aos="zoom-in-right" className={cx('about__intro-desc')}>
                {t('about-HaUIFood.desc05')}
              </p>

              <div className={cx('about__img-wrapper')}>
                <div className={cx('row')}>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in-right" className={cx('about__img-item')}>
                      <img src={images.simple} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>{t('about-HaUIFood.heading05')}</h5>
                      <p className={cx('about__img-desc')}>{t('about-HaUIFood.desc06')}</p>
                    </div>
                  </div>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in" className={cx('about__img-item')}>
                      <img src={images.happy} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>{t('about-HaUIFood.heading06')}</h5>
                      <p className={cx('about__img-desc')}>{t('about-HaUIFood.desc07')}</p>
                    </div>
                  </div>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in-left" className={cx('about__img-item')}>
                      <img src={images.together} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>{t('about-HaUIFood.heading07')}</h5>
                      <p className={cx('about__img-desc')}>{t('about-HaUIFood.desc08')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('about__main')}>
            <h3 className={cx('about__main-title')}>{t('about-HaUIFood.heading08')}</h3>

            <div className={cx('journey-list')}>
              <div className={cx('journey-item')}>
                <img data-aos="fade-right" src={images.trip2} alt="" className={cx('journey-item__img')} />
                <div className={cx('journey-item__dot')}></div>
                <div className={cx('journey-item__line')}></div>
                <div data-aos="fade-up-left" className={cx('journey-item__desc')}>
                  <h4 className={cx('title')}>{t('about-HaUIFood.heading09')}</h4>
                  <p className={cx('text')}>{t('about-HaUIFood.desc09')}</p>
                </div>
              </div>
              <div className={cx('journey-item')}>
                <img data-aos="fade-right" src={images.trip1} alt="" className={cx('journey-item__img')} />
                <div className={cx('journey-item__dot')}></div>
                <div className={cx('journey-item__line')}></div>
                <div data-aos="fade-up-left" className={cx('journey-item__desc')}>
                  <h4 className={cx('title')}>{t('about-HaUIFood.heading10')}</h4>
                  <p className={cx('text')}>{t('about-HaUIFood.desc10')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('about__footer')}>
        <div data-aos="zoom-in-right" className={cx('about__footer-word')}>
          <p className={cx('about__footer-text')}>
            <QuotesIcon className={cx('about__footer-quotes')} />
            {t('about-HaUIFood.desc11')}
            <QuotesIcon className={cx('about__footer-quotes', 'about__footer-quotes--close')} />
          </p>
        </div>
        <div className={cx('about__footer-bg')}></div>
      </div>
    </div>
  );
}

export default AboutHaUIFood;
