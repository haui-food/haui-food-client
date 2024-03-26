import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  large = false,
  action = false,
  checkout = false,
  haveProducts = false,
  disabled = false,
  auth = false,
  authGoogle = false,
  className,
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = 'button';

  const props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    large,
    action,
    checkout,
    haveProducts,
    disabled,
    auth,
    authGoogle,
  });
  return (
    <Comp className={classes}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <p className={cx('title')}>{children}</p>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
