import images from '~/assets/images';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { PasswordIcon, PersonalInfoIcon, HelpIcon, TermsOfUseIcon, ArrowDownIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserById } from '~/apiService/userService';
const cx = classNames.bind(style);

const listOptions = [
  {
    title: 'Manage Account',
    icon: <div className={cx('special-icon')}></div>,
    isTitle: true,
  },
  {
    title: 'Personal Info',
    icon: <PersonalInfoIcon className={cx('icon')} />,
  },
  {
    title: 'Change Password',
    icon: <PasswordIcon className={cx('icon')} />,
  },
  {
    title: 'Customer Service',
    icon: <div className={cx('special-icon')}></div>,
    isTitle: true,
  },
  {
    title: 'Help',
    icon: <HelpIcon className={cx('icon')} />,
  },
  {
    title: 'Terms of Use',
    icon: <TermsOfUseIcon className={cx('icon')} />,
  },
];

// const userInfo = {
//   name: 'Le Cong Nghia',
//   email: 'Lenghia0108@gmail.com',
//   phone: '0966859061',
//   MSV: '2021604236',
//   gender: 'Nam',
//   birthday: '01/08/2003',
// };

function parseDateStringToDate(dateString) {
  if (dateString) {
    console.log(dateString);
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  } else {
    return null;
  }
}
// const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

function Profile() {
  const data = useSelector((state) => state.auth);
  const userInfo = data.user;
  console.log('Profile', userInfo);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('Personal Info');
  const [startDate, setStartDate] = useState(new Date(userInfo.dateOfBirth));
  const [isChange, setIsChange] = useState(false);
  const [gender, setGender] = useState('Nam');
  const [isShowGender, setIsShowGender] = useState(false);
  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone);
  const [msv, setMsv] = useState(userInfo?.MSV);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(userInfo?.email);
  const handleCancel = () => {
    // console.log('cancelled');
    setGender(userInfo.gender);
    setFullName(userInfo.fullname);
    setMsv(userInfo.MSV);
    setStartDate(userInfo.birthday);
    setPhoneNumber(userInfo.phone || '');
    setEmail(userInfo.email);
    setStartDate(new Date(userInfo.dateOfBirth));
    setErrors({});
  };

  function isValidDate(dateString) {
    // Kiểm tra xem đầu vào có đúng định dạng dd/MM/yyyy không
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }

    // Tách ngày, tháng, năm từ chuỗi
    const [day, month, year] = dateString.split('/');

    // Chuyển đổi ngày, tháng, năm thành số nguyên
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10) - 1; // Tháng trong JavaScript tính từ 0 (0 - 11)
    const yearInt = parseInt(year, 10);

    // Kiểm tra tính hợp lệ của ngày
    const dateObject = new Date(yearInt, monthInt, dayInt);
    return (
      dateObject.getFullYear() === yearInt && dateObject.getMonth() === monthInt && dateObject.getDate() === dayInt
    );
  }
  const handleDatePickerChange = (date, event) => {
    setStartDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'fullName':
        setFullName(value);
        setErrors((preErr) => ({ ...preErr, fullName: '' }));
        break;
      case 'phoneNumber':
        if (/^\d*$/.test(value)) {
          setPhoneNumber(value);
          setErrors((preErr) => ({ ...preErr, phoneNumber: '' }));
        }
        break;
      case 'msv':
        if (/^(\d+|)$/.test(value[value.length - 1]) || value.length === 0) {
          // console.log('0 -9', value);
          if (value.length > 10) {
            setErrors((preErr) => ({ ...preErr, msv: 'Mã sinh viên tối đa 10 ký tự' }));
            break;
          }
          // console.log('msv', value);
          setMsv(value);
          setErrors((preErr) => ({ ...preErr, msv: '' }));
          break;
        }
        break;

      case 'birthDay':
        console.log('birthDay', value);
        break;

      default:
        break;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      if (name === 'fullName') {
        if (value.trim() === '') {
          return (newErrors = { ...newErrors, fullName: 'Vui lòng nhập họ tên' });
        }
      }

      if (name === 'phoneNumber') {
        if (value.trim() === '') {
          return (newErrors = { ...newErrors, phoneNumber: 'Phone number is required' });
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value)) {
          return (newErrors = { ...newErrors, phoneNumber: 'số điện thoạt không hợp lệ' });
        }
      }

      if (name === 'msv') {
        if (value.trim() === '') {
          return (newErrors = { ...newErrors, msv: 'MSV is required' });
        } else if (value.trim().length === 10) {
          newErrors = { ...newErrors, msv: '' };
          const currentYear = new Date().getFullYear();
          const firstFourDigits = parseInt(value.substring(0, 4), 10);

          if (firstFourDigits > currentYear) {
            return (newErrors = { ...newErrors, msv: '4 số đầu không hợp lệ' });
          } else if (firstFourDigits < currentYear - 6) {
            return (newErrors = { ...newErrors, msv: 'thằng chó mày đã ra trường' });
          }
        } else if (value.trim().length < 10) {
          return (newErrors = { ...newErrors, msv: 'Mã sinh viên phải có độ dài 10 ký tự' });
        } else {
        }
      }

      if (name === 'birthDay') {
        // const currentYear = new Date().getFullYear;
        const [day, month, year] = value.split('/');
        const inputDate = new Date(`${year}-${month}-${day}`);
        console.log('input date', inputDate);
        const currentDay = new Date();
        console.log('year', year);

        // if (dateRegex.test(value)) {
        //   return (newErrors = { ...newErrors, birthDay: 'Ngày sinh không hợp lệ' });
        // }
        if (!(inputDate instanceof Date) || isNaN(inputDate)) {
          return (newErrors = { ...newErrors, birthDay: 'Ngày sinh không hợp lệ' });
        }

        if (inputDate > currentDay) {
          return (newErrors = { ...newErrors, birthDay: 'Ngày sinh không thể lớn hơn hôm nay' });
        } else if (currentDay.getFullYear() - year < 18) {
          return (newErrors = { ...newErrors, birthDay: 'Thằng chó mày không đủ tuổi' });
        } else if (currentDay.getFullYear() - 100 > year) {
          console.log('10', currentDay.getFullYear() - 100);
          newErrors = { ...newErrors, birthDay: 'Thằng chó mày chết rồi' };
        } else {
          newErrors = { ...newErrors, birthDay: '' };
        }
      }

      return newErrors;
    });
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('row profile')}>
          <div className={cx('col-xl-3')}>
            <div
              className={cx('profile__img-container')}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1491146179969-d674118945ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVhZiUyMGdyZWVuJTIwYmFja2dyb3VuZCUyMGZvb2R8ZW58MHx8MHx8fDA%3D')",
              }}
            >
              <img className={cx('profile__img')} src={images.avatarDefault} alt="Profile" />
              <div className={cx('profile__user-name')}>Le Nghia</div>
              <div className={cx('profile__registered-day')}>Registered: 20th May 2024</div>
            </div>

            <div className={cx('profile-nav-container')}>
              <ul className={cx('profile-nav')}>
                {listOptions.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.isTitle && <Button className={cx('profile-nav__title')}>{item.title}</Button>}

                      {!item.isTitle && (
                        <Button
                          className={cx('profile-nav__item', {
                            'profile-nav__item-active': item.title === selectedOption,
                          })}
                          leftIcon={item.icon}
                          onClick={() => {
                            setSelectedOption(item.title);
                          }}
                        >
                          {item.title}
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={cx('col-xl-9')}>
            <div className={cx('profile-content-container')}>
              <div className={cx('profile-content')}>
                <div className={cx('profile-input-container')}>
                  <div className={cx('profile-content__title')}>Personal Info</div>
                  <div></div>
                  {/* full name */}
                  <div className={cx('profile-input-group')}>
                    <label className={cx('profile-input-group__label')} htmlFor="fullName">
                      Fullname
                    </label>
                    <input
                      className={cx({ 'no-change': !isChange }, { isError: errors.fullName })}
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Fullname"
                      value={fullName}
                      onChange={(e) => {
                        handleInputChange(e);
                        handleBlur(e);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.fullName && <div className={cx('errors-message')}>{errors.fullName}</div>}
                    <div className={cx('placeholder-fake')}></div>
                  </div>

                  {/* email */}
                  <div className={cx('profile-input-group')}>
                    <label className={cx('profile-input-group__label')} htmlFor="email">
                      Email
                    </label>
                    <input
                      className={cx('no-change')}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                    />
                    {/* <div className={cx('placeholder-fake')}></div> */}
                  </div>

                  {/* phone number */}

                  <div className={cx('profile-input-group')}>
                    <label className={cx('profile-input-group__label')} htmlFor="phoneNumber">
                      Phone
                    </label>
                    <input
                      className={cx({ 'no-change': !isChange }, { isError: errors.phoneNumber })}
                      type="text"
                      name="phoneNumber"
                      id="phone-number"
                      placeholder="Phone"
                      value={phoneNumber}
                      onChange={(e) => {
                        handleInputChange(e);
                        handleBlur(e);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && <div className={cx('errors-message')}>{errors.phoneNumber}</div>}
                    <div className={cx('placeholder-fake')}></div>
                  </div>

                  {/* msv */}

                  <div className={cx('profile-input-group')}>
                    <label className={cx('profile-input-group__label')} htmlFor="msv">
                      MSV
                    </label>
                    <input
                      className={cx({ 'no-change': !isChange }, { isError: errors.msv })}
                      type="text"
                      name="msv"
                      id="msv"
                      placeholder="MSV"
                      value={msv}
                      onChange={(e) => {
                        handleInputChange(e);
                        handleBlur(e);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.msv && <div className={cx('errors-message')}>{errors.msv}</div>}
                    {/* <div className={cx('placeholder-fake')}></div> */}
                  </div>

                  {/* birth day */}
                  <div className={cx('profile-input-group')}>
                    <label className={cx('profile-input-group__label')} htmlFor="birth-day">
                      Birth day
                      {/* <input type="date" name="birth-day" id="birth-day" /> */}
                    </label>
                    <div className={cx('date-picker-container', { 'no-change': !isChange })}>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={(date, event) => {
                          handleDatePickerChange(date, event);
                          handleBlur(event);
                        }}
                        showMonthDropdown
                        showYearDropdown
                        className={cx('date-picker-input', { isError: errors.birthDay })}
                        // onBlur={handleBlur}
                        name="birthDay"
                      />
                    </div>
                    {errors.birthDay && <div className={cx('errors-message')}>{errors.birthDay}</div>}
                    {/* <div className={cx('placeholder-fake')}></div> */}
                  </div>

                  {/* Gioi tinh */}
                  <div className={cx('profile-input-group')}>
                    <div className={cx('profile-input-group__label')} htmlFor="gender">
                      Giới tính
                    </div>
                    <div
                      className={cx('gender-container', { 'no-change': !isChange })}
                      onClick={() => {
                        setIsShowGender(!isShowGender);
                      }}
                    >
                      <div className={cx('gender__selected-value')}>{gender}</div>
                      <ArrowDownIcon className={cx('gender__icon')} />
                      <ul
                        className={cx('gender__options', { isShow: isShowGender })}
                        onClick={() => {
                          setIsShowGender(!isShowGender);
                        }}
                      >
                        <li
                          className={cx('gender__option')}
                          onClick={() => {
                            setGender('Nam');
                          }}
                        >
                          Nam
                        </li>
                        <li
                          className={cx('gender__option')}
                          onClick={() => {
                            setGender('Nữ');
                          }}
                        >
                          Nữ
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <div></div> */}
                </div>

                {!isChange && (
                  <div className={cx('btn-container')}>
                    <Button
                      className={cx('change-btn')}
                      onClick={() => {
                        setIsChange(true);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                )}

                {isChange && (
                  <div className={cx('btn-container')}>
                    <Button
                      className={cx('cancel-btn')}
                      onClick={() => {
                        handleCancel();
                        setIsChange(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={cx('update-btn')}
                      onClick={(e) => {
                        if (Object.values(errors).every((error) => error === '')) {
                          // dispatch(updateUserById({userId: userInfo})
                        } else {
                          alert('van con loi');
                        }
                      }}
                    >
                      Update
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
