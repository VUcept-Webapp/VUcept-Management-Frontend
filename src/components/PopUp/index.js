import styles from './index.module.css';
import classNames from 'classnames/bind';
import { Block } from '../Block';
const cx = classNames.bind(styles);


export const PopUp = (props) => {
    const {
        className,
        style,
        show,
        setShow,
        children
    } = props;

    return <>
        <div
            className={cx(styles.blocker, {
                [styles.show]: show
            })}
            onClick={() => setShow(false)}
        >
        </div>
        <Block 
            className={cx(styles.popUp, className, {
                [styles.show]: show
            })}
            style={style}
        >
            {children}
        </Block>
    </>
}