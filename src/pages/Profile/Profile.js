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
import { toast } from 'react-toastify';
import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';

const cx = classNames.bind(style);

function Profile() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const reduxData = useSelector((prop) => prop.user);
  const { t } = useTranslation();

  // console.log('UserInfo', userInfo);

  // list nav options
  const listOptions = [
    {
      title: t('profile.navTitle01'),
      icon: <div className={cx('special-icon')}></div>,
      isTitle: true,
    },
    {
      title: t('profile.nav01'),
      icon: <PersonalInfoIcon className={cx('icon')} />,
      navId: 'personnalInfo',
    },
    {
      title: t('profile.nav02'),
      icon: <PasswordIcon className={cx('icon')} />,
      navId: 'changePassword',
    },
    {
      title: t('profile.navTitle02'),
      icon: <div className={cx('special-icon')}></div>,
      isTitle: true,
    },
    {
      title: t('profile.nav03'),
      icon: <HelpIcon className={cx('icon')} />,
      navId: 'help',
    },
    {
      title: t('profile.nav04'),
      icon: <TermsOfUseIcon className={cx('icon')} />,
      navId: 'termsOfUse',
    },
  ];

  // const datePickerRef = useRef();
  const inputRefs = {
    fullName: useRef(null),
    email: useRef(null),
    phoneNumber: useRef(null),
    msv: useRef(null),
    avatar: useRef(null),
  };
  const [isChange, setIsChange] = useState(false);
  const [gender, setGender] = useState(userInfo?.gender);
  const [isShowGender, setIsShowGender] = useState(false);
  const [fullName, setFullName] = useState(userInfo?.fullname);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone);
  const [msv, setMsv] = useState(userInfo?.msv);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(userInfo?.email);
  const [imageSelected, setImageSelected] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [date, setDate] = useState([userInfo?.dateOfBirth ? new Date(userInfo?.dateOfBirth) : null]);
  const [isFirstMound, setIsFirstMound] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Personal Info');
  useEffect(() => {
    //eslint-disable-next-line
    // console.log('call api');
    dispatch(getUser());
    //eslint-enable-next-line
    upDateUserInfo();
    setIsFirstMound(false);
  }, []);

  const upDateUserInfo = () => {
    setUserInfo(reduxData.user);
    setEmail(reduxData.user?.email);
    setFullName(reduxData.user?.fullname);
    setMsv(reduxData.user?.msv || '');
    setPhoneNumber(reduxData.user?.phone || '');
    setDate([reduxData.user?.dateOfBirth ? new Date(reduxData.user?.dateOfBirth) : null]);
    setGender(reduxData.user?.gender);
    setIsChange(false);
    setImagePreview(null);
    setImageSelected(null);
    setErrors({});
  };

  useEffect(() => {
    // console.log('UserInfo', userInfo);
    if (!reduxData.isUpdate) {
      upDateUserInfo();
    } else if (reduxData.loading === false && reduxData.error === null && reduxData.isUpdate) {
      toast.success(t('profile.toast.successed'));
      upDateUserInfo();
    } else if (reduxData.loading === false && reduxData.error !== null && reduxData.isUpdate) {
      toast.error(t('profile.toast.error'));
      upDateUserInfo();
    }
    //eslint-disable-next-line
  }, [reduxData]);

  // handle when update
  const handleUpdate = async () => {
    validateInputs();
    validateDate(date);
    let isChange = true;
    let hasChanged = true;
    Object.values(errors).forEach((error) => {
      console.log(error);
      if (error !== '') {
        isChange = false;
        return;
      }
    });

    console.log('start date', date);
    // console.log('dateOfBirth', new Date(userInfo.dateOfBirth));
    // console.log(startDate.getTime() === new Date(userInfo.dateOfBirth).getTime());

    if (
      fullName === userInfo?.fullname &&
      phoneNumber === (userInfo?.phone || '') &&
      msv === (userInfo?.msv || '') &&
      gender === (userInfo?.gender === 'male' ? 'male' : 'female') &&
      date[0].getTime() === new Date(userInfo.dateOfBirth).getTime() &&
      imageSelected === null
    ) {
      toast.info(t('profile.toast.noChanged'));
      hasChanged = false;
      return;
    }

    if (isChange && hasChanged) {
      const data = {
        fullname: fullName,
        gender: gender,
        dateOfBirth: date[0],
        // phone: phoneNumber,
        // msv: msv,
      };
      dispatch(updateUserById({ userData: data, avatar: imageSelected }));
    } else {
      toast.error(t('profile.toast.noExactly'));
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    // console.log('selected image');

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageSelected(reader.result);
      };

      // Thêm try-catch để bắt lỗi khi đọc file
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        // Xử lý lỗi và hiển thị thông báo
        console.error('Error reading the file:', error);
        toast.error('Đã xảy ra lỗi khi đọc file.');
      }
    }
  };

  const handleCancel = () => {
    setFullName(userInfo?.fullname);
    setMsv(userInfo?.MSV || '');
    setPhoneNumber(userInfo?.phone || '');
    setEmail(userInfo?.email);
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

  const validateDate = (date) => {
    let newErrors = { ...errors };
    console.log('on change', date);

    if (!moment(date[0], 'DD.MM.YYYY', true).isValid()) {
      console.log('khong hop le');
      newErrors = { ...newErrors, birthDay: t('errors.birthDay.err05') };
    } else {
      const today = moment();
      const birthDay = moment(date[0], 'DD.MM.YYYY', true);
      // console.log(moment(date, 'DD.MM.YYYY', true));
      const age = today.diff(birthDay, 'years');
      // console.log('age', age);

      if (age < 0) {
        newErrors = { ...newErrors, birthDay: t('errors.birthDay.err02') };
      } else if (age < 18) {
        newErrors = { ...newErrors, birthDay: t('errors.birthDay.err03') };
      } else if (age > 100) {
        newErrors = { ...newErrors, birthDay: t('errors.birthDay.err04') };
      } else {
        newErrors = { ...newErrors, birthDay: '' };
      }
    }
    setDate(date);
    setErrors(newErrors);
  };

  const handleDateChange = (date) => {
    // console.log(date);
    validateDate(date);
  };

  //   const value = datePickerRef.current.input.value;
  //   console.log(value);

  //   const [day, month, year] = value.split('/');
  //   const inputDate = new Date(`${year}-${month}-${day}`);
  //   const currentDay = new Date();
  //   let newErrors = { ...errors }; // Sao chép errors hiện tại để thay đổi
  //   // console.log('start date', startDate.getFullYear());
  //   // console.log('4 year', year.toString().length === 4);
  //   // console.log('18 year', currentDay.getFullYear() - year < 18);

  //   if (inputDate instanceof Date && !isNaN(inputDate) && year?.toString().length === 4) {
  //     console.log('intant of date');
  //     setStartDate(inputDate);
  //   } else {
  //     return;
  //   }
  //   if (!(inputDate instanceof Date)) {
  //     return (newErrors = { ...newErrors, birthDay: 'Ngày sinh không hợp lệ' });
  //     // console.log('ngay sinh khong hop le');
  //   } else if (inputDate > currentDay) {
  //     newErrors = { ...newErrors, birthDay: 'Ngày sinh không thể lớn hơn hôm nay' };
  //     console.log('ngay sinh khong the lon hon ngay hom nay');
  //   } else if (year && year.toString().length === 4 && currentDay.getFullYear() - year < 18) {
  //     newErrors = { ...newErrors, birthDay: 'Bạn chưa đủ 18 tuổi' };
  //     console.log('ngay sinh khong the lon hon 18 tuoi');
  //   } else if (currentDay.getFullYear() - 100 > year && year === startDate?.getFullYear().toString()) {
  //     newErrors = { ...newErrors, birthDay: 'Bạn đã quá 100 tuổi' };
  //     console.log('ngay sinh khong the lon hon 100 tuoi');
  //   } else {
  //     newErrors = { ...newErrors, birthDay: '' }; // Không có lỗi
  //   }

  //   setErrors(newErrors);
  // };

  // console.log(image);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('row profile')}>
          <div className={cx('col-xl-3')}>
            <div className={cx('profile__img-container')}>
              <img
                className={cx('profile__img-cover')}
                src="https://plus.unsplash.com/premium_photo-1675725088215-a07116c0b75d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGdyZWVuJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
                alt="hauifood"
              />
              <div className={cx('profile__img-content', { 'no-change': !isChange })}>
                <div className={cx('profile__avatar-container')}>
                  <img
                    className={cx('profile__img')}
                    src={imagePreview ? imagePreview : userInfo?.avatar ? userInfo.avatar : images.avatarDefault}
                    alt="hauifood"
                  />
                  <div
                    className={cx('select-image-btn')}
                    onClick={() => {
                      inputRefs.avatar.current.click();
                    }}
                  >
                    <input
                      ref={inputRefs.avatar}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onInput={(e) => {
                        handleSelectImage(e);
                      }}
                    />
                    <div className={cx('profile__select-img-title')}>{t('profile.btn-select-img')}</div>
                  </div>
                </div>
                <div className={cx('profile__user-name')}>{userInfo?.fullname ? userInfo.fullname : 'HauiFood'}</div>
                <div className={cx('profile__registered-day')}>Registered: 20th May 2024</div>
              </div>
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
            <div className={cx('profile-content-container', { onLoader: reduxData.loading })}>
              {reduxData.loading && <Loader className={cx('loader')} />}
              {!reduxData.loading && (
                <div className={cx('profile-content')}>
                  <div className={cx('profile-input-container')}>
                    {/* {imageSelected && <img src={imagePreview} />} */}
                    <div className={cx('profile-content__title')}>{t('profile.nav01')}</div>
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
                          handleInputChange(e);
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
                        placeholder={t('profile.msv')}
                        value={msv}
                        onChange={(e) => {
                          handleInputChange(e);

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
                      <div className={cx('date-picker-container', { 'no-change': !isChange })}>
                        <Flatpickr
                          value={date}
                          // các option thêm cho thư viện
                          placeholder={t('profile.birthDay')}
                          options={{
                            dateFormat: 'd/m/Y',
                            // allowInput: true,
                            // maxDate: new Date(),
                          }}
                          onBlur={(e) => {
                            validateDate(date);
                          }}
                          onChange={(dateSelect) => {
                            handleDateChange(dateSelect);
                          }}
                        />
                      </div>
                      {errors.birthDay && <div className={cx('errors-message')}>{errors.birthDay}</div>}
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
                        <div className={cx('gender__selected-value')}>
                          {gender
                            ? gender === 'male'
                              ? t('profile.gender.male')
                              : t('profile.gender.female')
                            : t('profile.gender.title')}
                        </div>
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
