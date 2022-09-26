import LoveVU from '../../assets/icons/loveVU.svg';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useWindowSize } from '../../lib/hooks';
import { WINDOW_TYPE } from '../../lib/constants';
import { Outlet } from 'react-router-dom';
const cx = classNames.bind(styles);

export const AuthLayout = () => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = isMobile || width < 600;
    return <div className={cx(styles.page)}>
        <div className={cx(styles.container, {
            [styles.mobile]: isMobile,
        })}>
            {!isSmall && <div className={cx(styles.logoContainer)}>
                <img src={LoveVU} className={cx(styles.logo)}/>
            </div>}
            <div className={cx(styles.inputsContainer, {
                [styles.smallScreen]: isSmall
            })}>
                <div className={cx(styles.inputsWrapper)}>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>;
}