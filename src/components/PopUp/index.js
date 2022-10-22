import styles from './index.module.css';
import classNames from 'classnames/bind';
import { Block } from '../Block';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Pop up block
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

PopUp.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired, // (show: Bool) => void
    children: PropTypes.object // child components
}