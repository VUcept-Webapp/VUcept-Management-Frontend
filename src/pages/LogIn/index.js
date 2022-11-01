import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useWindowSize } from '../../lib/hooks';
import { AUTH_INPUT_LABELS, RESPONSE_STATUS, WINDOW_TYPE } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
import { useNavigate } from 'react-router-dom';
import { AuthCode } from '../../components/AuthCode';
import { useEffect, useState } from 'react';
import { login } from '../../lib/services';
const cx = classNames.bind(styles);

// Log in page for authentication
export const LogIn = ({ toast }) => {
    const navigate = useNavigate();
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode("");
    }, [email]);

    const onLogIn = () => {
        if(!email) toast('Please provide your email');
        else if(!password) toast('Please provide your password');
        else if(password.length < 8) toast('Password length must be at least 8');
        else if(!code) toast('Please obtain your verification code');
        else if(inputCode !== code) toast('Verification code mismatch');
        else {
            login({ email, password, code, originalCode: inputCode })
                .then(res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) navigate('/home/calendar');
                    if(status === RESPONSE_STATUS.INVALID_EMAIl) toast('Invalid email');
                    else if(status === RESPONSE_STATUS.REQUEST_SIGN_UP) toast('Please sign up first');
                    else if(status === RESPONSE_STATUS.INVALID_PASSWORD) toast('Incorrect password');
                    else toast('Internal error');
                })
                .catch(err => toast('Internal error'));
        }
    }

    return <>
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.EMAIL}
            containerClassName={cx(styles.inputBlock)}
            value={email}
            onChange={setEmail}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.PASSWORD}
            containerClassName={cx(styles.inputBlock)}
            value={password}
            onChange={setPassword}
            hide={true}
        />
        <AuthCode 
            label={AUTH_INPUT_LABELS.VERIFICATION_CODE}
            email={email}
            inputValue={inputCode}
            onInputChange={setInputCode}
            onCodeChange={(curCode) => setCode(curCode)}
            toast={toast}
        />
        <AuthButton
            className={cx(styles.logIn)}
            label={AUTH_INPUT_LABELS.LOG_IN}
            onClick={onLogIn}
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