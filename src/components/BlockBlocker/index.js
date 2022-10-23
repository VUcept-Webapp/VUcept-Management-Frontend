import styles from './index.module.css';
import classNames from 'classnames/bind';
import Loading from '../../assets/icons/loading.svg';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Disable the table component and display the loading animation
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
                data-testid='block-blocker-div'
            >
                <img src={Loading} className={cx(styles.loading)} data-testid='block-blocker-img'/>
            </div>
        }
    </>
};

BlockBlocker.propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    show: PropTypes.bool.isRequired
}