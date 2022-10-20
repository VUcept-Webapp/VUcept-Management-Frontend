import ExitIcon from '../../assets/icons/exit.svg';
import MenuIcon from '../../assets/icons/menu.svg';
import UserIcon from '../../assets/icons/user.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import ClockIcon from '../../assets/icons/clock.svg';
import FileIcon from '../../assets/icons/file.svg';
import BoyIcon from '../../assets/icons/boy.svg';
import DashboardIcon from '../../assets/icons/dashboard.svg';
import UsersIcon from '../../assets/icons/users.svg';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import { Outlet, useHref, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useCaption, useWindowSize } from '../../lib/hooks';
import { CAPTIONS, HOME_NAV_LABELS, ROUTES, WINDOW_TYPE } from '../../lib/constants';
import { useEffect, useRef, useState } from 'react';
import { Caption } from '../../components/Caption';
import { Block } from '../../components/Block';
const cx = classNames.bind(styles);

export const HomeLayout = () => {
    const { width, type } = useWindowSize();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 600 || isMobile;
    const caption = useCaption();

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
                <div onClick={() => navigate(ROUTES.CALENDAR)} className={cx(styles.navItem, {
                    [styles.selected]: pathname === ROUTES.CALENDAR
                })}>
                    <img src={CalendarIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.HOME}</span>
                </div>  
                <div onClick={() => navigate(ROUTES.LOG_VISIONS)} className={cx(styles.navItem, {
                    [styles.selected]: pathname === ROUTES.LOG_VISIONS
                })}>
                    <img src={ClockIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.LOG_VISIONS_ATTENDANCE}</span>
                </div>  
                <div onClick={() => navigate(ROUTES.VISIONS_ASSIGNMENT)} className={cx(styles.navItem, {
                    [styles.selected]: pathname === ROUTES.VISIONS_ASSIGNMENT
                })}>
                    <img src={UsersIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.VISIONS_ASSIGNMENT}</span>
                </div> 
                <div onClick={() => navigate(ROUTES.FIRST_YEAR_ATTENDANCE)} className={cx(styles.navItem, {
                    [styles.selected]: pathname === ROUTES.FIRST_YEAR_ATTENDANCE
                })}>
                    <img src={DashboardIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.FIRST_YEAR_ATTENDANCE}</span>
                </div>
                <div onClick={() => navigate(ROUTES.VUCEPTOR_ATTENDANCE)} className={cx(styles.navItem, {
                    [styles.selected]: pathname === ROUTES.VUCEPTOR_ATTENDANCE
                })}>
                    <img src={BoyIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.VUCEPTOR_ATTENDANCE}</span>
                </div>
                <div onClick={() => navigate(ROUTES.USER_MANAGEMENT)} className={cx(styles.navItem, {
                    [styles.selected]: pathname === ROUTES.USER_MANAGEMENT
                })}>
                    <img src={FileIcon} className={cx(styles.navItemIcon)}/>
                    <span className={cx(styles.navItemLabel)}>{HOME_NAV_LABELS.USER_MANAGEMENT}</span>
                </div>  
            </div>
            <div
                className={cx(styles.main, {
                    [styles.mobile]: isMobile
                })}
            >
                <div className={cx(styles.container, {
                    [styles.mobile]: isMobile
                })}>
                    <Caption
                        text={caption}
                        className={cx(styles.caption)}
                    />
                    <Block className={cx(styles.block)} id='mainBlock'>
                        <Outlet/>
                    </Block>
                </div>
            </div>
        </div>
    </div>
}