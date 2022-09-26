import styles from './index.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const Block = (props) => {
    const {
        className,
        style,
        children
    } = props;
    
    return <div
        className={cx(styles.block, className)}
        style={style}
    >
        {children}
    </div>
}