import styles from './index.module.css';
import classNames from 'classnames/bind';
import { Caption } from '../../components/Caption';
import { BUTTONS, CAPTIONS, USER_MANAGEMENT_COLUMNS, WINDOW_TYPE } from '../../lib/constants';
import { useWindowSize } from '../../lib/hooks';
import { Block } from '../../components/Block';
import { TableSearch } from '../../components/TableSearch';
import { TableButton } from '../../components/TableButton';
import { Table } from '../../components/Table';
const cx = classNames.bind(styles);

export const UserManagement = () => {
    const { width, type } = useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    const isSmall = width < 700 || isMobile;


    return <div className={cx(styles.container, {
        [styles.mobile]: isMobile
    })}>
        <Caption
            text={CAPTIONS.USER_MANAGEMENT}
            className={cx(styles.caption)}
        />
        <Block className={cx(styles.block)}>
            <div className={cx(styles.boardControl)}>
                <TableSearch />
                <div className={cx(styles.tableButtons, {
                    [styles.small]: isSmall
                })}>
                    <TableButton className={cx(styles.tableButton)} label={BUTTONS.NEW_USER}/>
                    <TableButton className={cx(styles.tableButton)} label={BUTTONS.IMPORT}/>
                </div>
            </div>
            <Table
                rowNumber={200}
                columns={USER_MANAGEMENT_COLUMNS}
            />
        </Block>
    </div>;
}