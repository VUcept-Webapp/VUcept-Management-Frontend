import styles from './index.module.css';
import classNames from 'classnames/bind';
import { AUTH_INPUT_LABELS } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
const cx = classNames.bind(styles);

export const ResetPassword = () => {
    return <>
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.RESET_PASSWORD}
            containerClassName={cx(styles.inputBlock)}
        />
        <AuthButton
            className={cx(styles.reset)}
            label={AUTH_INPUT_LABELS.SEND_EMAIL}
        />
    </>
}