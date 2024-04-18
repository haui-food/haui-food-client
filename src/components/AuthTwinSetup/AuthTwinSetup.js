import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getSecretKey } from '~/apiService/authService';
import { reFreshStatus } from '~/features/authSlice';
import { getLocalStorageItem, updateFieldInLocalStorage, addOrUpdateFieldInLocalStorage } from '~/utils/localStorage';
import { generateQRCodeImage } from '~/utils/qrCode';

import style from './AuthTwinSetup.module.scss';
import { CheckIcon, RefreshIcon } from '../Icons';
import images from '~/assets/images';
import Button from '../Button';

const cx = classNames.bind(style);

function AuthTwinSetup() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [isUseAuthTwin, setIsUseAuthTwin] = useState(false);
  const [secretKey, SetSecretKey] = useState();
  const [otpValue, setOtpValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [qrImg, setQrImg] = useState('');
  const [isFirstMounted, setIsFirstMounted] = useState(true);

  const reduxData = useSelector((state) => state.auth);
  const userInfo = getLocalStorageItem('user');
  useEffect(() => {
    const secretKey = userInfo?.secret ? userInfo.secret : '';
    setQrImg(generateQRCodeImage(userInfo.email, secretKey));
    SetSecretKey(secretKey);
    setIsFirstMounted(false);
  }, []);

  useEffect(() => {
    if (!isFirstMounted) {
      SetSecretKey(reduxData.secretKey);
      setQrImg(generateQRCodeImage(userInfo.email, reduxData.secretKey));
      addOrUpdateFieldInLocalStorage('user', 'secretTemp', reduxData.secretKey);
      if (reduxData.secretStatus === 200) {
        toast.success('lam moi thanh cong');
      } else if (reduxData.secretStatus === 429) {
        toast.error('quá nhiều request');
      }
    }
    dispatch(reFreshStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxData.secretStatus, dispatch]);

  // handle select security method
  const handleSelectSecurityMethod = (type) => {
    if (type === 'use') setIsUseAuthTwin(true);
    if (type === 'no-use') setIsUseAuthTwin(false);
  };

  // handle refresh secret key
  const handleRefreshSecretKey = () => {
    dispatch(getSecretKey());
  };

  // handle otp input change

  const handleOtpInputChange = (event) => {
    // setOtpValue(event.target.value);
  };

  const validateOtpInput = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value) && value.length < 7) {
      setOtpValue(value);
      setIsUpdate(false);
    }
    if (value.length === 6) {
      setIsUpdate(true);
    }
  };

  return (
    <div className={cx('auth-twin-wrapper')}>
      <h2 className={cx('auth-twin__title')}>{t('authTwinSetup.title01')}</h2>
      <div className={cx('first-row')}>
        <p className={cx('first-row__desc')}>
          <div>
            <CheckIcon className={cx('check-icon')} />
          </div>
          {t('authTwinSetup.desc01')}
        </p>

        <p className={cx('first-row__desc')}>
          <div>
            <CheckIcon className={cx('check-icon')} />
          </div>
          {t('authTwinSetup.desc02')}
        </p>

        <p className={cx('first-row__desc')}>
          <div>
            <CheckIcon className={cx('check-icon')} />
          </div>
          <p>
            {t('authTwinSetup.desc03.1')}
            <a target="blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605">
              <strong className={cx('strong')}> IOS </strong>
            </a>
            {t('authTwinSetup.desc03.2')}
            <a
              target="blank"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
            >
              <strong className={cx('strong')}> Android </strong>
            </a>
          </p>
        </p>
      </div>

      <div className={cx('security-method')}>
        {/* method security */}
        <div className={cx('security-method__title')}>{t('authTwinSetup.title02')}</div>
        <div className={cx('security-method__options')}>
          <label
            className={cx('security-method__option-label')}
            onClick={() => {
              handleSelectSecurityMethod('no-use');
            }}
          >
            <input type="radio" name="security-method" checked={!isUseAuthTwin} />
            {t('authTwinSetup.method01')}
          </label>
          <label
            className={cx('security-method__option-label')}
            onClick={() => {
              handleSelectSecurityMethod('use');
            }}
          >
            <input type="radio" name="security-method" checked={isUseAuthTwin} />
            {t('authTwinSetup.method02')}
          </label>
        </div>
      </div>

      <div className={cx('secret-key__container')}>
        <div className={cx('secret-key__first-row')}>
          <div className={cx('secret-key__content')}>
            <p className={cx('secret-key__desc')}>{t('authTwinSetup.desc04')}</p>

            <p className={cx('secret-key__label')}>Secret Key:</p>
            <div className={cx('secret-key__value-container')}>
              <div className={cx('secret-key__value')}>{secretKey}</div>
              <Button
                leftIcon={<RefreshIcon className={cx('refresh-icon')} />}
                className={cx('secret-key__refresh-btn')}
                disabled={!isUseAuthTwin}
                onClick={() => {
                  handleRefreshSecretKey();
                }}
              >
                {t('authTwinSetup.refresh-btn')}
              </Button>
            </div>
          </div>
          <img
            className={cx('secret-key__qr-code')}
            src={qrImg}
            alt="QR Code"
            crossorigin="anonymous"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = images.avatarDefault;
            }} // Xử lý khi ảnh không thể tải được
          />
        </div>

        <div className={cx('otp__container')}>
          <div className={cx('otp__title')}>{t('authTwinSetup.title03')}</div>
          <div>
            <input
              className={cx('otp__input', { isDisabled: !isUseAuthTwin })}
              placeholder="XXXXXX"
              value={otpValue}
              onChange={(e) => {
                validateOtpInput(e);
              }}
            />
          </div>
          <p className={cx('otp__note')}> {t('authTwinSetup.otpNote')}</p>
        </div>
        <Button
          leftIcon={<CheckIcon className={cx('btn-check-icon')} />}
          className={cx('update-btn')}
          disabled={!isUseAuthTwin || !isUpdate}
        >
          {t('authTwinSetup.update-btn')}
        </Button>

        <div className={cx('note__container')}>
          <p className={cx('note__title')}>{t('authTwinSetup.title04')}</p>
          <div className={cx('note__desc')}>
            1.{' '}
            <p>
              {t('authTwinSetup.note01')}
              <strong className={cx('strong')}>HauiFood</strong>
            </p>
          </div>
          <div className={cx('note__desc')}>
            2.
            <p> {t('authTwinSetup.note02')}</p>
          </div>
          <div className={cx('note__desc')}>
            3. <p>{t('authTwinSetup.note03')}</p>
          </div>
          <div className={cx('note__desc')}>
            4. <p> {t('authTwinSetup.note04')}</p>
          </div>
          <p className={cx('note__desc')}>
            {t('authTwinSetup.note05.1')}
            <a target="blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605">
              <strong className={cx('strong')}>IOS</strong>
            </a>
            {t('authTwinSetup.note05.2')}
            <a
              target="blank"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
            >
              <strong className={cx('strong')}>Android</strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default AuthTwinSetup;
