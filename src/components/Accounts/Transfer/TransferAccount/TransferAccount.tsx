import { memo } from 'react';

import { IAccount } from '../../../../interfaces';

import styles from './TransferAccount.module.scss';

interface TransferAccountProps {
  account: IAccount | null;
  text: string;
}

export const TransferAccount = memo(({ account, text }: TransferAccountProps) => {
  return (
    <div className={styles.wrapper} style={{ backgroundColor: account?.color }}>
      <div>
        <p className={styles.text}>{text}</p>
        <p className={styles.name}>{account?.name}</p>
      </div>
      <div className={styles.iconWrapper}>
        <span className='material-icons' style={{ color: account?.color }}>
          {account?.icon}
        </span>
      </div>
    </div>
  );
});
