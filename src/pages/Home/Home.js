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

const listReasons = [
  {
    icon: CheckIcon,
    keyword: 'Nhanh nhất',
    text: 'GrabFood cung cấp dịch vụ giao đồ ăn nhanh nhất thị trường.',
  },
  {
    icon: CheckIcon,
    keyword: 'Dễ dàng nhất',
    text: 'Giờ đây, bạn chỉ cần thực hiện vài cú nhấp chuột hoặc chạm nhẹ là đã có thể đặt đồ ăn. Hãy đặt đồ ăn trực tuyến hoặc tải xuống siêu ứng dụng Grab của chúng tôi để có trải nghiệm nhanh hơn và thú vị hơn.',
  },
  {
    icon: CheckIcon,
    keyword: 'Đáp ứng mọi nhu cầu',
    text: 'Từ món ăn đặc sản địa phương đến các nhà hàng được ưa thích, nhiều lựa chọn đa dạng chắc chắn sẽ luôn làm hài lòng khẩu vị của bạn.',
  },
  {
    icon: CheckIcon,
    keyword: 'Thanh toán dễ dàng',
    text: 'Giao và nhận đồ ăn thật dễ dàng. Thanh toán bằng GrabPay thậm chí còn dễ dàng hơn nữa.',
  },
  {
    icon: CheckIcon,
    keyword: 'Nhiều quà tặng hơn ',
    text: 'Tích điểm GrabRewards cho mỗi đơn hàng của bạn và sử dụng điểm thưởng để đổi lấy nhiều ưu đãi hơn.',
  },
];

function Home() {
  const { t } = useTranslation();
  return (
    <div className={cx('home')}>
      <Banner />
      <div className={cx('sparate')}></div>
      <div className={cx('container')}>
        <h1 className={cx('home__title')}>
          Ưu đãi HauiFood tại <span className={cx('home__title--highlight')}>Haui</span>
        </h1>

        <ListPromo />

        <Button large className={cx('home__btn')}>
          See All promotions
        </Button>

        <div className={cx('home__title', 'home__title--margin')}>There's something for everyone!</div>

        <ListCategorise />

        <div className={cx('home__title', 'home__title--no-margin')}>Vì sao bạn nên Order trên GrabFood?</div>

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

        <div className={cx('home__title', 'home__title--margin')}>Những câu hỏi thường gặp</div>
        <div className={cx('home__sub-title')}>HauiFood là gì?</div>
        <p className={cx('home__faq-text')}>
          Lunch, Bún Cá Chấm Gốc Đa - Vũ Thạnh for Dinner! We are here to satisfy your hunger with a wide selection of
          merchant partners in Vietnam. GrabFood là dịch vụ Giao đồ ăn nhanh nhất tại Việt Nam. Chúng tôi đã sắp xếp tất
          cả các món ăn, nhà hàng và thực phẩm yêu thích của bạn một cách hợp lý để giúp bạn tìm được đồ ăn dễ dàng và
          nhanh chóng nhất có thể. Tìm và đặt món ăn yêu thích trên khắp Việt Nam - đặt đồ ăn trực tuyến chỉ bằng vài
          thao tác, từ món Lifted Coffee & Brunch cho bữa sáng, đến Maazi Indian – Nhà Hàng Ấn Độ cho bữa trưa, đến Bún
          Cá Chấm Gốc Đa – Vũ Thạnh cho bữa tối! Hãy để chúng tôi xua tan cơn đói của bạn nhờ một loạt đối tác bán đồ ăn
          ở Việt Nam.
        </p>

        <Button large className={cx('home__btn')}>
          Read More
        </Button>
      </div>
      <div className={cx('banner-footer')}>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col-xl-6 col-12')}>
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
            <div className={cx('col-xl-6 col-12')}>
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
