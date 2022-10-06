import styles from './index.module.css';
import classNames from 'classnames/bind';
import Loading from '../../assets/icons/loading.svg';
const cx = classNames.bind(styles);

export const BlockBlocker = (props) => {
    const {
        className,
        style,
        show,
    } = props;
    
    return <>
        {show && 
            <div
                className={cx(styles.blocker, className)}
                style={style}
            >
                <img src={Loading} className={cx(styles.loading)}/>
            </div>
        }
    </>
}