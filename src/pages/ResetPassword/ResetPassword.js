import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './ResetPassword.module.scss';
import { PasswordIcon } from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ResetPassword() {
  const { t } = useTranslation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [submit, setSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState('password');

  const passwordRegex = useMemo(() => /^(?=.*[@-_]).{8,}$/, []);
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

  const checkSubmit = useCallback(() => {
    setSubmit(
      !passwordRegex.test(newPassword) ||
        newPassword === '' ||
        confirmNewPassword === '' ||
        confirmNewPassword !== newPassword,
    );
  }, [passwordRegex, newPassword, confirmNewPassword]);

  const handleChangeNewPassword = useCallback(() => {
    if (!passwordRegex.test(newPassword)) {
      setErrors({
        ...errors,
        newPassword: t('errors.err04'),
      });
    }
    if (passwordRegex.test(newPassword)) {
      setErrors({ ...errors, newPassword: '' });
    }
    if (!newPassword) {
      setErrors({ ...errors, newPassword: t('errors.err03') });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordRegex, newPassword, errors, checkSubmit]);

  const handleChangeConfirmPassword = useCallback(() => {
    if (confirmNewPassword !== newPassword) {
      setErrors({ ...errors, confirmPassword: t('errors.err06') });
    }
    if (!confirmNewPassword) {
      setErrors({ ...errors, confirmPassword: t('errors.err07') });
    }
    if (confirmNewPassword === newPassword) {
      setErrors({ ...errors, confirmPassword: '' });
    }
    checkSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmNewPassword, newPassword, errors]);

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  return (
    <div className={cx('reset-password')}>
      <h1 className={cx('reset-password__heading', 'shine')}>{t('reset-password.heading')}</h1>
      <p className={cx('reset-password__desc')}>{t('reset-password.desc01')}</p>

      <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
        <div className={cx('form__group')}>
          <div
            className={cx('form__text-input')}
            style={errors.newPassword !== '' ? { border: '1px solid #f44336' } : {}}
          >
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={handleChangeNewPassword}
              type={showPassword}
              name=""
              placeholder={t('form.tp02')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.newPassword && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.newPassword}</p>
        </div>

        <div className={cx('form__group')}>
          <div
            className={cx('form__text-input')}
            style={errors.confirmPassword !== '' ? { border: '1px solid #f44336' } : {}}
          >
            <input
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onBlur={handleChangeConfirmPassword}
              type={showPassword}
              name=""
              placeholder={t('form.tp04')}
              className={cx('form__input')}
            />
            <PasswordIcon className={cx('form__input-icon', errors.confirmPassword && 'form__input-icon--err')} />
          </div>
          <p className={cx('form__error')}>{errors.confirmPassword}</p>
        </div>

        <div className={cx('form__group', 'form__group--inline')}>
          <label onChange={handleShowPassword} className={cx('form__checkbox')}>
            <input type="checkbox" name="" className={cx('form__checkbox-input')} />
            <span className={cx('form__checkbox-label')}>{t('form.lb01')}</span>
          </label>
        </div>

        <div style={submit ? { cursor: 'no-drop' } : {}} className={cx('form__group', 'reset-password__btn-group')}>
          <Button primary auth disabled={submit}>
            {t('button.btn12')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
