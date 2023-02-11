import { memo } from 'react';

import { CurrencySymbol } from '../../../enums';
import { IAccount } from '../../../interfaces';

import styles from './Account.module.scss';

interface AccountProps {
  account: IAccount;
  currency: CurrencySymbol;
  accountDrawerHandler: (account: IAccount) => void;
}

export const Account = memo(({ account, currency, accountDrawerHandler }: AccountProps) => {
  const { name, icon, color, description, balance } = account;

  return (
    <div className={styles.account} onClick={() => accountDrawerHandler(account)}>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}` }}>
        <span className='material-icons'>{icon}</span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoUpper}>
          <h3>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <p className={styles.amount}>
          {balance} {currency}
        </p>
      </div>
    </div>
  );
});
