import styles from './index.module.css';
import classNames from 'classnames/bind';
import { AUTH_INPUT_LABELS, RESPONSE_STATUS } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
import { AuthCode } from '../../components/AuthCode';
import { useEffect, useState } from 'react';
import { signUp } from '../../lib/services';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

// Sign up page for authentication
export const SignUp = ({ toast }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode("");
    }, [email]);

    const onSignUp = () => {
        if(!email) toast('Please provide your email');
        else if(!password) toast('Please provide your password');
        else if(password.length < 8) toast('Password length must be at least 8');
        else if(password !== repeatPassword) toast('Passwords mismatch');
        else if(!code) toast('Please obtain your verification code');
        else if(inputCode !== code) toast('Verification code mismatch');
        else {
            signUp({ email, password, code, originalCode: inputCode })
                .then(res => {
                    const { status } = res;
                    if(status === RESPONSE_STATUS.INVALID_EMAIl) toast('Your email is invalid. Please contact the advisor.');
                    else if(status === RESPONSE_STATUS.USER_EXISTENT) toast('An user already exists');
                    else navigate('/');
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
            className={cx(styles.signUp)}
            label={AUTH_INPUT_LABELS.SIGN_UP}
            onClick={onSignUp}
        />
    </>
}