import ExitIcon from '../../assets/icons/exit.svg';
import MenuIcon from '../../assets/icons/menu.svg';
import UserIcon from '../../assets/icons/user.svg';
import DashboardIcon from '../../assets/icons/dashboard.svg';
import UsersIcon from '../../assets/icons/users.svg';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { Outlet, useHref, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from '../../lib/hooks';
import { HOME_NAV_LABELS, ROUTES, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

export const HomeLayout = () => {
    const { width, type } = useWindowSize();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const { params: { ["*"]: route } } = useMatch('/home/*');
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 600 || isMobile;

    return <div
        className={cx(styles.page)}
    >
        <div
            className={cx(styles.control, {
                [styles.small]: isSmall
            })}
        >
            <img src={MenuIcon} onClick={() => setShowMenu(!showMenu)} className={cx(styles.controlIcon, {
                [styles.small]: isSmall
            })}/>
            <img src={UserIcon} className={cx(styles.controlIcon, {
                [styles.small]: isSmall
            })}/>
            <img src={ExitIcon} className={cx(styles.controlIcon, {
                [styles.small]: isSmall
            })}/>
        </div>
        <div className={cx(styles.wrapper, {
                [styles.small]: isSmall
        })}>
            <div
                className={cx(styles.leftBar, {
                    [styles.small]: isSmall,
                    [styles.show]: showMenu
                })}
            >
                <div onClick={() => navigate('/home/dashBoard')} className={cx(styles.navItem, {
                    [styles.selected]: route === ROUTES.DASHBOARD
                })}>
                    <img src={DashboardIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.DASHBOARD}</span>
                </div>  
                <div onClick={() => navigate('/home/userManagement')} className={cx(styles.navItem, {
                    [styles.selected]: route === ROUTES.USER_MANAGEMENT
                })}>
                    <img src={UsersIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.USER_MANAGEMENT}</span>
                </div>  
            </div>
            <div
                className={cx(styles.main, {
                    [styles.mobile]: isMobile
                })}
            >
                <Outlet />
            </div>
        </div>
    </div>
}