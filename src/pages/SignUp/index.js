import styles from './index.module.css';
import classNames from 'classnames/bind';
import { AUTH_INPUT_LABELS } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
const cx = classNames.bind(styles);

export const SignUp = () => {
    return <>
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.EMAIL}
            containerClassName={cx(styles.inputBlock)}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.PASSWORD}
            containerClassName={cx(styles.inputBlock)}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.CONFIRM_PASSWORD}
            containerClassName={cx(styles.inputBlock)}
        />
        <AuthButton
            className={cx(styles.signUp)}
            label={AUTH_INPUT_LABELS.SIGN_UP}
        />
    </>
}