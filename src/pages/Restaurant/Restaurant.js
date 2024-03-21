import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import RestaurantHeader from '~/components/RestaurantHeader/RestaurantHeader';
import styles from './Restaurant.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const data = [
  {
    id: 1,
    restaurantName: 'Xôi Chú Ngọng - Đê La Thành',
    products: 'Bánh Mì - Xôi',
    ratingStar: '4.2',
    time: '2.5 phút',
    distance: '2.1 km',
    openTime: 'Hôm nay 06:00-14:00 17:00-23:00',
    deliveryAddress: ['Địa chỉ giao hàng: Sảnh chính tòa A1', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ', '1:00 - 1:15', '2:00 - 2:15'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê', 'Trà trái cây'],
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    restaurantName: 'Mr.Eco Cơm Gạo Lứt - Healthy Meal - Kim Mã',
    products: 'Cơm Chay - Salad Healthy - Đồ Chay,Cơm,Bún - Phở - Cháo',
    ratingStar: '4.5',
    time: '2.5 phút',
    distance: '2.1 km',
    openTime: '09:00-20:30',
    deliveryAddress: ['Ngày giao hàng: Ngày hôm nay', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê'],
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    restaurantName: 'Xóm ăn đêm ',
    products: 'Ăn Vặt,Tráng Miệng,Gà Rán - Burger,Lẩu & Nướng - Quay',
    ratingStar: '4.3',
    time: '25 phút',
    distance: '3,4 km',
    openTime: '00:00-03:00 10:00-23:59',
    deliveryAddress: ['Địa điểm giao hàng: Sảnh chính tòa A1', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê', 'Trà trái cây'],
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    restaurantName: 'Nhà Hàng Sáu Béo',
    products: 'Ăn Vặt,Tráng Miệng,Gà Rán - Burger,Lẩu & Nướng - Quay',
    ratingStar: '4.3',
    time: '25 phút',
    distance: '3,4 km',
    openTime: '00:00-03:00 10:00-23:59',
    deliveryAddress: ['Ngày giao hàng: Ngày hôm nay', 'P101, Tòa A1', 'P102, Tòa A1', 'P103, Tòa A1'],
    deliveryTime: ['Thời gian giao hàng: Ngay bây giờ'],
    directories: ['Trà chanh tắc', 'Combo best seller', 'Xôi thịt', 'Bánh mỳ pate', 'Cà phê', 'Trà trái cây'],
    productsList: [
      {
        directory: 'Trà chanh tắc',
        products: [
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Mật Ong 500ML',
            description:
              'Trà Chanh Truyền Thống Kết Hợp Cùng Mật Ong Tạo Hương Vị Thanh Mát , Chua Ngọt Vừa Đủ . Gía trên chưa bao gồm topping Khách có thể mua thêm topping ở phần tùy chọn ạ',
            price: '20000',
          },
          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Chanh Thái Lan 700ML',
            description:
              'Trà Chanh Thái Lan Kết Hợp Trà Lài + Trà Thái Tạo Nên Hương Vị Đặc Trưng , Thanh Mát , Dễ Uống Khách Có Thể Tham Khảo ạ (Gía Trên Chưa Bao Gồm Topping , Khách Có Thể Mua Thêm Topping Trong Phần Tùy Chọn ) ạ',
            price: '20000',
          },

          {
            productImage:
              'https://food-cms.grab.com/compressed_webp/items/VNITE20230711063338167146/detail/menueditor_item_85e2db724c0249dea76aa01d98e7d417_1689861893322979818.webp',
            productName: 'Trà Tắc Truyền Thống',
            description:
              'Trà Tắc Đậm Vị , Chua Ngọt Vừa Đủ , Thanh Mát , Dễ uống . Trà Chưa Bao Gồm Topping ( Khách muốn thêm trân châu hoặc thạch cá có thể đặt trong phần tùy chọn ) ạ',
            price: '20000',
          },
        ],
      },
    ],
  },
];

const Restaurant = () => {
  const [restaurantInfor, setRestaurantInfor] = useState(null);
  const { restaurantid } = useParams();

  useEffect(() => {
    const restaurantId = parseInt(restaurantid);
    const selectedRestaurant = data.find((restaurant) => restaurant.id === restaurantId);
    setRestaurantInfor(selectedRestaurant);
    console.log(selectedRestaurant);
  }, [restaurantid]);

  const menuItems = restaurantInfor?.productsList.map((directory, index) => {
    return (
      <div className={cx('productCard')}>
        <h2>{directory.directory}</h2>
        {directory.products.map((product, idx) => {
          return (
            <div className={cx('productCard__detail')}>
              <div className={cx('productCard__detail--img')}>
                <img alt="ảnh" src={product.productImage} />
              </div>
              <div className={cx('productCard__detail--description')}>
                <div className={cx('productCard__detail--description--content')}>
                  <div className={cx('productCard__detail--description--content--title')}>{product.productName}</div>
                  <div className={cx('productCard__detail--description--content--describe')}>{product.description}</div>
                </div>
                <div className={cx('productCard__detail--description--price')}>{product.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className={cx('container')}>
      <div className={cx('restaurant')}>
        <RestaurantHeader restaurant={restaurantInfor} />
        <div className={cx('restaurant__content')}>{menuItems}</div>
        <div className={cx('restaurant__footer')}>
          <span>
            Chúng tôi luôn cố gắng cập nhật thông tin chính xác nhất. <a href="/">Hãy báo với chúng tôi</a> nếu bạn thấy
            bất kỳ thông tin không chính xác nào.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
