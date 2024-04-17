import classNames from 'classnames/bind';
import style from './AuthTwinSetup.module.scss';
import { CheckIcon, RefreshIcon } from '../Icons';
import images from '~/assets/images';
import Button from '../Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

function generateSecretKey() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secretKey = '';
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    secretKey += charset[randomIndex];
    if ((i + 1) % 4 === 0 && i !== 31) {
      secretKey += ' '; // Thêm dấu cách sau mỗi 4 ký tự, trừ ở ký tự cuối cùng
    }
  }
  return secretKey;
}

// Sử dụng hàm để tạo ra một đoạn mã secret key 2FA có độ dài là 32 ký tự
const secretKey = generateSecretKey();
console.log(secretKey);

function AuthTwinSetup() {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isUseAuthTwin, setIsUseAuthTwin] = useState(false);
  const [secretKey, SetSecretKey] = useState(generateSecretKey());
  const [otpValue, setOtpValue] = useState('');
  const [errors, setErrors] = useState('');

  // handle select security method
  const handleSelectSecurityMethod = (type) => {
    if (type === 'use') setIsUseAuthTwin(true);
    if (type === 'no-use') setIsUseAuthTwin(false);
  };

  // handle refresh secret key
  const handleRefreshSecretKey = () => {
    SetSecretKey(generateSecretKey());
  };

  // handle otp input change

  const handleOtpInputChange = (event) => {
    // setOtpValue(event.target.value);
  };
  const validateOtpInput = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value) && value.length < 7) {
      console.log(value);
      setOtpValue(value);
      setErrors('');
    } else if (value.length > 7) {
      setErrors('Mã xác thực phải là 1 chuỗi gồm 6 chữ số');
    } else if (value.length === 6) {
      setErrors('');
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
              <p className={cx('secret-key__value')}>{secretKey}</p>
              <Button
                leftIcon={<RefreshIcon className={cx('refresh-icon')} />}
                className={cx('secret-key__refresh-btn')}
                onClick={handleRefreshSecretKey}
              >
                {t('authTwinSetup.refresh-btn')}
              </Button>
            </div>
          </div>
          <img className={cx('secret-key__qr-code')} src={images.avatarDefault} alt="" />
        </div>

        <div className={cx('otp__container')}>
          <div className={cx('otp__title')}>{t('authTwinSetup.title03')}</div>
          <div>
            <input
              className={cx('otp__input')}
              placeholder="XXXXXX"
              value={otpValue}
              onChange={(e) => {
                validateOtpInput(e);
              }}
            />
            {errors && <p>{errors}</p>}
          </div>
          <p className={cx('otp__note')}> {t('authTwinSetup.otpNote')}</p>
        </div>
        <Button leftIcon={<CheckIcon className={cx('btn-check-icon')} />} className={cx('update-btn')}>
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
