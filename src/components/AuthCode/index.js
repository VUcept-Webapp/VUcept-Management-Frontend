import styles from './index.module.css';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { sendVerificationEmail } from '../../lib/services';
import { RESPONSE_STATUS } from '../../lib/constants';
const cx = classNames.bind(styles);

export const AuthCode = React.forwardRef((props, ref) => {
    const {
        email,
        label,
        containerClassName,
        containerStyle,
        inputValue,
        onInputChange,
        onCodeChange,
        toast,
    } = props;

    const [timeCount, setTimeCount] = useState(0);
    const timer = useRef();

    useEffect(() => {
        if(timeCount === 60) {
            let cur = 60;
            timer.current = setInterval(() => {
                console.log(timeCount);
                cur--;
                setTimeCount(cur);
            }, 1000);
        }
        else if(timeCount === 0) {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, [timeCount]);

    const onSend = () => {
        if(!email) toast('Please provide email');
        else sendVerificationEmail({email})
            .then(res => {
                const { status, code } = res;
                console.log('res', res);
                if(status === RESPONSE_STATUS.SUCCESS) {
                    onCodeChange(code.toString());
                    setTimeCount(60);
                }
                else toast('Internal error');
            })
            .catch(err => toast('Internal error'))
    }
    
    return <div
        className={cx(styles.inputBlock, containerClassName)}
        style={containerStyle}
    >
        <p
            className={cx(styles.label)}
        >
            {label || ""}
        </p>
        <div className={cx(styles.inputWrapper)}>
            <input 
                className={cx(styles.input)}
                value={inputValue}
                onChange={(event) => onInputChange(event.target.value)}
            />
            <div 
                className={cx(styles.button)}
                onClick={timeCount === 0 ? onSend : null}
            >
                {timeCount === 0 ? 'Send' : `Resend (${timeCount})`}
            </div>
        </div>
    </div>
})