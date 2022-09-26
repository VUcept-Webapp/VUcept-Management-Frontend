import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useWindowSize } from '../../lib/hooks';
import { AUTH_INPUT_LABELS, WINDOW_TYPE } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

export const LogIn = () => {
    const navigate = useNavigate();
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = isMobile || width < 600;
    return <>
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.EMAIL}
            containerClassName={cx(styles.inputBlock)}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.PASSWORD}
            containerClassName={cx(styles.inputBlock)}
        />
        <AuthButton
            className={cx(styles.logIn)}
            label={AUTH_INPUT_LABELS.LOG_IN}
        />
        <div className={cx(styles.oneTimeLinks)}>
            <span 
                className={cx(styles.oneTimeLink, {
                    [styles.vertical]: width <= 1000 || isMobile
                })}
                onClick={() => navigate('signUp')}
            >
                {AUTH_INPUT_LABELS.CREATE_ACCOUNT}
            </span>
            {width > 1000 && <div className={cx(styles.verticalDividor)}></div>}
            <span 
                className={cx(styles.oneTimeLink, {
                    [styles.vertical]: width <= 1000 || isMobile
                })}
                onClick={() => navigate('resetPassword')}
            >
                {AUTH_INPUT_LABELS.FORGOT_PASSWORD}
            </span>
        </div>
    </>
}