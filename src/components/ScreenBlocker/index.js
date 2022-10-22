import styles from './index.module.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Block the whole screen, preventing the click event from triggering
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
            onClick={() => onClick()}
        >
        </div>
    </>
}

ScreenBlocker.propTypes = {
    show: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired // () => void
}