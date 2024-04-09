import images from '~/assets/images';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import { PasswordIcon, PersonalInfoIcon, HelpIcon, TermsOfUseIcon, ArrowDownIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserById, getUser } from '~/apiService/userService';
import Loader from '~/components/Loader';
import { useTranslation } from 'react-i18next';
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

function Profile() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const reduxData = useSelector((prop) => prop.user);
  const { t } = useTranslation();
  useEffect(() => {
    //eslint-disable-next-line
    dispatch(getUser());
    setUserInfo(reduxData.user);
  }, []);

  // console.log('UserInfo', userInfo);

  const [selectedOption, setSelectedOption] = useState('Personal Info');
  const [startDate, setStartDate] = useState(userInfo?.dateOfBirth ? new Date(userInfo?.dateOfBirth) : null);
  const datePickerRef = useRef();
  const inputRefs = {
    fullName: useRef(null),
    email: useRef(null),
    phoneNumber: useRef(null),
    msv: useRef(null),
  };
  const [isChange, setIsChange] = useState(false);
  const [gender, setGender] = useState(userInfo?.gender);
  const [isShowGender, setIsShowGender] = useState(false);
  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone);
  const [msv, setMsv] = useState(userInfo?.MSV);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(userInfo?.email);
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log('UserInfo', userInfo);
    setUserInfo(reduxData.user);
    setEmail(userInfo?.email);
    setFullName(userInfo?.fullname);
    setPhoneNumber(userInfo?.phone || '');
    setStartDate(userInfo?.dateOfBirth ? new Date(userInfo?.dateOfBirth) : null);
    setGender(
      userInfo?.gender
        ? userInfo.gender.toLowerCase() === 'male'
          ? t('profile.gender.male')
          : t('profile.gender.female')
        : '',
    );
  }, [reduxData.user, userInfo]);

  const handleUpdate = () => {
    validateInputs();
    validateDatePicker();
    console.log(errors);
    let isChange = true;
    Object.values(errors).forEach((error) => {
      console.log(error);
      if (error !== '') {
        isChange = false;
        return;
      }
    });

    if (isChange) {
      const data = {
        fullname: fullName,
        gender: userInfo?.gender,
        dateOfBirth: startDate,
        // phone: phoneNumber,
        // msv: msv,
      };
      dispatch(updateUserById({ userData: data, avatar: image }));
    } else {
      alert('loi');
    }
  };

  const handleCancel = () => {
    setFullName(userInfo?.fullname);
    setMsv(userInfo?.MSV || '');
    setPhoneNumber(userInfo?.phone || '');
    setEmail(userInfo?.email);
    setStartDate(userInfo?.dateOfBirth ? new Date(userInfo?.dateOfBirth) : null);
    setGender(
      userInfo?.gender
        ? userInfo.gender.toLowerCase() === 'male'
          ? t('profile.gender.male')
          : t('profile.gender.female')
        : '',
    );
    setErrors({});
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
        if (/^\d*$/.test(value)) {
          console.log(value.length);
          if (value.length > 10) {
            setErrors((preErr) => ({ ...preErr, msv: 'Mã sinh viên tối đa 10 ký tự' }));
            break;
          }
          // console.log('msv', value);
          setMsv(value);
          setErrors((preErr) => ({ ...preErr, msv: '' }));
        } else {
          setMsv('');
        }
        break;
      default:
        break;
    }
  };

  const validateInputs = () => {
    let newErrors = {};
    const fullName = inputRefs.fullName.current.value;
    const phoneNumber = inputRefs.phoneNumber.current.value;
    const msv = inputRefs.msv.current.value;
    // console.log(fullName, phoneNumber, msv);
    if (fullName.trim() === '') {
      newErrors = { ...newErrors, fullName: t('errors.fullName.err01') };
    }

    if (phoneNumber.trim() === '') {
      newErrors = { ...newErrors, phoneNumber: '' };
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phoneNumber)) {
      newErrors = { ...newErrors, phoneNumber: t('errors.phoneNumber.err02') };
    }

    if (msv.trim() === '') {
      newErrors = { ...newErrors, msv: '' };
    } else if (msv.trim().length !== 10) {
      newErrors = { ...newErrors, msv: t('errors.msv.err02') };
    } else {
      const currentYear = new Date().getFullYear();
      const firstFourDigits = parseInt(msv.trim().substring(0, 4), 10);
      if (firstFourDigits > currentYear) {
        newErrors = { ...newErrors, msv: t('errors.msv.err04') };
      } else if (firstFourDigits < currentYear - 6) {
        newErrors = { ...newErrors, msv: t('errors.msv.err03') };
      }
    }
    setErrors(newErrors);
  };

  const validateDatePicker = () => {
    const value = datePickerRef.current.input.value;
    // console.log(value);
    const [day, month, year] = value.split('/');
    const inputDate = new Date(`${year}-${month}-${day}`);
    const currentDay = new Date();
    let newErrors = { ...errors }; // Sao chép errors hiện tại để thay đổi
    console.log('inputdate', errors);
    if (!(inputDate instanceof Date) || isNaN(inputDate) || (year && year.toString().length !== 4)) {
      newErrors = { ...newErrors, birthDay: 'Ngày sinh không hợp lệ' };
      console.log('ngay sinh khong hop le');
    } else if (inputDate > currentDay) {
      newErrors = { ...newErrors, birthDay: 'Ngày sinh không thể lớn hơn hôm nay' };
      console.log('ngay sinh khong the lon hon ngay hom nay');
    } else if (currentDay.getFullYear() - year < 18) {
      newErrors = { ...newErrors, birthDay: 'Bạn chưa đủ 18 tuổi' };
      console.log('ngay sinh khong the lon hon 18 tuoi');
    } else if (currentDay.getFullYear() - 100 > year && year === startDate.getFullYear().toString()) {
      newErrors = { ...newErrors, birthDay: 'Bạn đã quá 100 tuổi' };
      console.log('ngay sinh khong the lon hon 100 tuoi');
    } else {
      // newErrors = { ...newErrors, birthDay: '' }; // Không có lỗi
    }

    setErrors(newErrors);
  };
  // console.log(image);
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
              {reduxData.loading && <Loader />}
              {!reduxData.loading && (
                <div className={cx('profile-content')}>
                  <div className={cx('profile-input-container')}>
                    <input
                      type="file"
                      onChange={(e) => {
                        const files = e.target.files;
                        setImage(files);
                        // console.log(e.target.files);
                      }}
                    />
                    <div className={cx('profile-content__title')}>Personal Info</div>
                    <div className={cx('profile__sub-row')}></div>
                    {/* full name */}
                    <div className={cx('profile-input-group')}>
                      <label className={cx('profile-input-group__label')} htmlFor="fullName">
                        {t('profile.fullName')}
                      </label>
                      <input
                        ref={inputRefs.fullName}
                        className={cx({ 'no-change': !isChange }, { isError: errors.fullName })}
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder={t('profile.fullName')}
                        value={fullName}
                        onChange={(e) => {
                          handleInputChange(e);
                          // handleBlur(e);
                          validateInputs();
                        }}
                        onBlur={validateInputs}
                      />
                      {errors.fullName && <div className={cx('errors-message')}>{errors.fullName}</div>}
                      <div className={cx('placeholder-fake')}></div>
                    </div>

                    {/* email */}
                    <div className={cx('profile-input-group')}>
                      <label className={cx('profile-input-group__label')} htmlFor="email">
                        {t('profile.email')}
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
                        {t('profile.phoneNumber')}
                      </label>
                      <input
                        ref={inputRefs.phoneNumber}
                        className={cx({ 'no-change': !isChange }, { isError: errors.phoneNumber })}
                        type="text"
                        name="phoneNumber"
                        id="phone-number"
                        placeholder={t('profile.phoneNumber')}
                        value={phoneNumber}
                        onChange={(e) => {
                          // setStartDate(startDate);
                          handleInputChange(e);
                          // handleBlur(e);
                          validateInputs();
                        }}
                        onBlur={validateInputs}
                      />
                      {errors.phoneNumber && <div className={cx('errors-message')}>{errors.phoneNumber}</div>}
                      <div className={cx('placeholder-fake')}></div>
                    </div>

                    {/* msv */}

                    <div className={cx('profile-input-group')}>
                      <label className={cx('profile-input-group__label')} htmlFor="msv">
                        {t('profile.msv')}
                      </label>
                      <input
                        ref={inputRefs.msv}
                        className={cx({ 'no-change': !isChange }, { isError: errors.msv })}
                        type="text"
                        max={10}
                        name="msv"
                        // id="msv"
                        placeholder={t('profile.msv')}
                        value={msv}
                        onChange={(e) => {
                          handleInputChange(e);
                          // handleBlur(e);
                          validateInputs();
                        }}
                        onBlur={validateInputs}
                      />
                      {errors.msv && <div className={cx('errors-message')}>{errors.msv}</div>}
                    </div>

                    {/* birth day */}
                    <div className={cx('profile-input-group')}>
                      <label className={cx('profile-input-group__label')} htmlFor="birth-day">
                        {t('profile.birthDay')}
                      </label>
                      {/* {errors.birthDay && <div className={cx('errors-message')}>{errors.birthDay}</div>} */}
                      <div className={cx('date-picker-container', { 'no-change': !isChange })}>
                        <DatePicker
                          ref={datePickerRef}
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          onChange={(date, event) => {
                            // handleDatePickerChange(date);
                            setStartDate(date);
                            // handleBlur(event);
                            validateDatePicker();
                          }}
                          showMonthDropdown
                          showYearDropdown
                          className={cx('date-picker-input', { isError: errors.birthDay })}
                          onBlur={validateDatePicker}
                          name="birthDay"
                        />
                      </div>
                      {errors.birthDay && <div className={cx('errors-message')}>{errors.birthDay}</div>}
                      {/* <div className={cx('placeholder-fake')}></div> */}
                    </div>

                    {/* Gioi tinh */}
                    <div className={cx('profile-input-group')}>
                      <div className={cx('profile-input-group__label')} htmlFor="gender">
                        {t('profile.gender.title')}
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
                              setGender('male');
                            }}
                          >
                            {t('profile.gender.male')}
                          </li>
                          <li
                            className={cx('gender__option')}
                            onClick={() => {
                              setGender('female');
                            }}
                          >
                            {t('profile.gender.female')}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {!isChange && (
                    <div className={cx('btn-container')}>
                      <Button
                        className={cx('change-btn')}
                        onClick={() => {
                          setIsChange(true);
                        }}
                      >
                        {t('profile.btn-edit')}
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
                        {t('profile.btn-cancel')}
                      </Button>
                      <Button
                        className={cx('update-btn')}
                        onClick={(e) => {
                          handleUpdate();
                        }}
                      >
                        {t('profile.btn-update')}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
