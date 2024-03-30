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
            HaUIFood là nền tảng Thương mại Điện tử hàng đầu tại HaUI.
          </h3>
          <p data-aos="zoom-in-left" className={cx('about__desc')}>
            Ra mắt vào năm 2024, HaUIFood mang đến cho người dùng trong khu vực trải nghiệm mua sắm trực tuyến đơn giản,
            an toàn và nhanh chóng thông qua hệ thống hỗ trợ thanh toán và vận hành vững mạnh.
          </p>
          <p data-aos="zoom-in-left" className={cx('about__desc')}>
            Chúng tôi tin rằng trải nghiệm mua sắm trực tuyến cần đơn giản, dễ dàng và mang lại niềm vui cho người dùng.
            Sứ mệnh này cũng là nguồn cảm hứng thúc đẩy chúng tôi phát triển từng ngày.
          </p>
          <Link to={routes.home} rel="noreferrer" target="_blank" className={cx('about__btn')}>
            <Button more primary>
              Tìm hiểu thêm
            </Button>
          </Link>
        </div>
        <div className={cx('about__intro')}>
          <div className={cx('about__intro-wrapper')}>
            <div className={cx('about__intro-item')} data-aos="fade-up-right">
              <h5 className={cx('about__intro-title')}>Mục tiêu của chúng tôi</h5>
              <p className={cx('about__intro-desc')}>
                HaUIFood mong muốn góp phần làm cho xã hội trở nên tốt đẹp hơn bằng sức mạnh công nghệ thông qua việc
                kết nối cộng đồng người mua và người bán.
              </p>
            </div>
            <div className={cx('about__intro-item')} data-aos="fade-down-left">
              <h5 className={cx('about__intro-title')}>Định vị của chúng tôi</h5>
              <p className={cx('about__intro-desc')}>
                Thông qua HaUIFood, người dùng Internet trên toàn khu vực có thể trải nghiệm mua sắm trực tuyến với các
                sản phẩm đa dạng, kết nối với cộng đồng người bán, và tận hưởng quá trình nhận hàng liền mạch.
              </p>
            </div>
          </div>

          <div className={cx('about__intro-wrapper')}>
            <div className={cx('about__intro-item', 'about__intro-item--xl')}>
              <h5 data-aos="zoom-in-right" className={cx('about__intro-title')}>
                Phương châm của chúng tôi
              </h5>
              <p data-aos="zoom-in-right" className={cx('about__intro-desc')}>
                Phương châm Simple, Happy and Together xác định tính cách thương hiệu HaUIFood thông qua lời nói và hành
                động. Phương châm này hiện hữu ở bất cứ đâu trong hành trình phát triển của chúng tôi.
              </p>

              <div className={cx('about__img-wrapper')}>
                <div className={cx('row')}>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in-right" className={cx('about__img-item')}>
                      <img src={images.simple} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>Simple</h5>
                      <p className={cx('about__img-desc')}>
                        Chúng tôi tin vào sự đơn giản và toàn vẹn, đảm bảo một cuộc sống chân thật và đúng với bản thân
                        mình.
                      </p>
                    </div>
                  </div>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in" className={cx('about__img-item')}>
                      <img src={images.happy} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>Happy</h5>
                      <p className={cx('about__img-desc')}>
                        Chúng tôi thân thiện, vui vẻ, và tràn đầy năng lượng, lan tỏa niềm vui với mọi người.
                      </p>
                    </div>
                  </div>
                  <div className={cx('col col-12 col-xxl-4 col-xl-4 col-lg-6')}>
                    <div data-aos="zoom-in-left" className={cx('about__img-item')}>
                      <img src={images.together} className={cx('about__img-thumb')} alt="simple" />
                      <h5 className={cx('about__img-title')}>Together</h5>
                      <p className={cx('about__img-desc')}>
                        Chúng tôi thích dành thời gian cùng nhau, khi mua sắm trực tuyến với bạn bè và gia đình - cùng
                        nhau làm những việc chúng tôi yêu thích
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('about__main')}>
            <h3 className={cx('about__main-title')}>Hành trình của HaUIFood</h3>

            <div className={cx('journey-list')}>
              <div className={cx('journey-item')}>
                <img data-aos="fade-right" src={images.trip2} alt="" className={cx('journey-item__img')} />
                <div className={cx('journey-item__dot')}></div>
                <div className={cx('journey-item__line')}></div>
                <div data-aos="fade-up-left" className={cx('journey-item__desc')}>
                  <h4 className={cx('title')}>Khởi tạo dự án</h4>
                  <p className={cx('text')}>Ngày 10/03/2024 khởi tạo dự án.</p>
                </div>
              </div>
              <div className={cx('journey-item')}>
                <img data-aos="fade-right" src={images.trip1} alt="" className={cx('journey-item__img')} />
                <div className={cx('journey-item__dot')}></div>
                <div className={cx('journey-item__line')}></div>
                <div data-aos="fade-up-left" className={cx('journey-item__desc')}>
                  <h4 className={cx('title')}>Đang trong quá trình phát triển</h4>
                  <p className={cx('text')}>Dự kiến hoàn thành trong 2 tháng tới.</p>
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
            Thấu hiểu người khác là chìa khóa để lãnh đạo thành công. Tại HaUIFood, mang lại trải nghiệm tốt nhất cho
            nhân viên, đối tác và người dùng chính là mục tiêu mà chúng tôi hướng đến.
          </p>
        </div>
        <div className={cx('about__footer-bg')}></div>
      </div>
    </div>
  );
}

export default AboutHaUIFood;
