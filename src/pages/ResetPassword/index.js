import styles from './index.module.css';
import classNames from 'classnames/bind';
import { AUTH_INPUT_LABELS, RESPONSE_STATUS } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
import { AuthCode } from '../../components/AuthCode';
import { useEffect, useState } from 'react';
import { changePassword, signUp } from '../../lib/services';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

export const ResetPassword = ({ toast }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode("");
    }, [email]);

    const onReset = () => {
        if(!email) toast('Please provide your email');
        else if(!password) toast('Please provide your password');
        else if(password.length < 8) toast('Password length must be at least 8');
        else if(password !== repeatPassword) toast('Passwords mismatch');
        else if(!code) toast('Please obtain your verification code');
        else if(inputCode !== code) toast('Verification code mismatch');
        else {
            changePassword({ email, password })
                .then(res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.SUCCESS) navigate('/home/calendar');
                    if(status === RESPONSE_STATUS.REQUEST_SIGN_UP) toast('Please sign up first');
                    else if(status === RESPONSE_STATUS.INCORRECT_USER_EMAIL) toast('Invalid email');
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
            label={AUTH_INPUT_LABELS.NEW_PASSWORD}
            containerClassName={cx(styles.inputBlock)}
            value={password}
            onChange={setPassword}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.CONFIRM_PASSWORD}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setRepeatPassword}
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
            className={cx(styles.reset)}
            label={AUTH_INPUT_LABELS.RESET_PASSWORD}
            onClick={onReset}
        />
    </>
}