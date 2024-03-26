import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './ForgotPassword.module.scss';
import { EmailIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function ForgotPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [button, setButton] = useState(t('button.btn08'));
  const [submit, setSubmit] = useState(true);

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);
  const [errors, setErrors] = useState('');

  const checkSubmit = useCallback(() => {
    setSubmit(!emailRegex.test(email) || email === '');
  }, [emailRegex, email]);

  const handleChangeEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setErrors(t('errors.err02'));
    }
    if (email === '') {
      setErrors(t('errors.err01'));
    }
    if (emailRegex.test(email)) {
      setErrors('');
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, checkSubmit, emailRegex, errors]);

  return (
    <div className={cx('forgot-password')}>
      <h1 className={cx('forgot-password__heading', 'shine')}>{t('forgot-password.heading')}</h1>
      <p className={cx('forgot-password__desc')}>{t('forgot-password.desc01')}</p>

      <form
        className={cx('form')}
        onSubmit={(e) => {
          e.preventDefault();
          setButton(t('button.btn09'));
          setSubmit(true);
        }}
      >
        <div className={cx('form__group')}>
          <div className={cx('form__text-input')} style={errors !== '' ? { border: '1px solid #f44336' } : {}}>
            <input
              type="email"
              name=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleChangeEmail();
              }}
              onBlur={handleChangeEmail}
              placeholder={t('form.tp01')}
              className={cx('form__input')}
            />
            <EmailIcon className={cx('form__input-icon', errors && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors}</p>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'forgot-password__btn-group')}>
          <Button primary auth disabled={submit}>
            {button}
          </Button>
        </div>
      </form>

      <p className={cx('forgot-password__footer')}>
        {t('forgot-password.desc02')}
        <Link className={cx('forgot-password__link')} to={routes.login}>
          {t('button.btn05')}
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
