import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './SignIn.module.scss';
import { EmailIcon, GoogleIcon, PasswordIcon } from '~/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { loginUser } from '~/apiService/authService';

import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function SignIn() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState('password');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const checkSubmit = useCallback(() => {
    setSubmit(!emailRegex.test(email) || !passwordRegex.test(password) || email === '' || password === '');
  }, [emailRegex, passwordRegex, email, password]);

  const handleChangeEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: t('errors.err02') });
    }
    if (email === '') {
      setErrors({ ...errors, email: t('errors.err01') });
    }
    if (emailRegex.test(email)) {
      setErrors({ ...errors, email: '' });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, checkSubmit, emailRegex, errors]);

  const handleChangePassword = useCallback(() => {
    if (!passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password: t('errors.err04'),
      });
    }
    if (passwordRegex.test(password)) {
      setErrors({ ...errors, password: '' });
    }
    if (!password) {
      setErrors({ ...errors, password: t('errors.err03') });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordRegex, password, errors, checkSubmit]);

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginForm)).then((result) => {
      if (result.payload) {
        alert('Đăng nhập thành công');
        navigate('/');
      } else {
        alert('Thông tin tài khoản không chính xác');
      }
    });
  };

  return (
    <div className={cx('login')}>
      <h1 className={cx('login__heading', 'shine')}>{t('login.heading')}</h1>
      <p className={cx('login__desc')}>{t('login.desc01')}</p>

      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.email !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e);
              }}
              onBlur={handleChangeEmail}
              placeholder={t('form.tp01')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('form__input-icon', errors.email && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.email}</p>
        </div>

        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors.password !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange(e);
              }}
              onBlur={handleChangePassword}
              type={showPassword}
              name="password"
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.password && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.password}</p>
        </div>

        <div className={cx('form__group', 'form__group--inline')}>
          <label onChange={handleShowPassword} className={cx('form__checkbox')}>
            <input type="checkbox" name="" className={cx('form__checkbox-input')} />
            <span className={cx('form__checkbox-label')}>{t('form.lb01')}</span>
          </label>
          <Link className={cx('login__link', 'form__pull-right')} to={routes.forgotPassword}>
            {t('forgot-password.heading')}
          </Link>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'login__btn-group')}>
          <Button primary auth disabled={submit} onClick={handleSubmit}>
            {t('button.btn05')}
          </Button>
          <Button authGoogle leftIcon={<GoogleIcon className={cx('icon-google')} />}>
            {t('button.btn06')}
          </Button>
        </div>
      </form>

      <p className={cx('login__footer')}>
        {t('login.desc02')}
        <Link className={cx('login__link')} to={routes.signup}>
          {t('button.btn07')}
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
