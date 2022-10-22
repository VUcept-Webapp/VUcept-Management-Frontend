import styles from './index.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


export const ScreenBlocker = (props) => {
    const {
        show,
        onClick,
    } = props;

    return <>
        <div
            className={cx(styles.blocker, {
                [styles.show]: show
            })}
            onClick={() => {
                console.log('click blocker');
                onClick();
            }}
        >
        </div>
    </>
}