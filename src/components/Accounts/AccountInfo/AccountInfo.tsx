import { memo } from 'react';

import { IAccount } from '../../../interfaces';
import { Anchor } from '../../../types';

import styles from './AccountInfo.module.scss';

interface AccountInfoProps {
  account: IAccount;
  icon: string;
  color: string;
  currency: string;
  accountDrawerHandler: (type: string, anchor: Anchor, account: IAccount) => void;
}

export const AccountInfo = memo(
  ({ account, icon, color, currency, accountDrawerHandler }: AccountInfoProps) => {
    const { name, description, balance } = account;

    return (
      <div
        className={styles.account}
        onClick={() => accountDrawerHandler('info', 'bottom', account)}
      >
        <div className={styles.iconWrapper} style={{ backgroundColor: `${color}` }}>
          <span className='material-icons'>{icon}</span>
        </div>
        <div className={styles.accountInfo}>
          <div className={styles.accountInfoUpper}>
            <h3 className={styles.accountName}>{name}</h3>
            <p className={styles.accountDescription}>{description}</p>
          </div>
          <p className={styles.accountAmount}>
            {balance} {currency}
          </p>
        </div>
      </div>
    );
  },
);
