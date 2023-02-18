import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { defaultNames } from '../../../data/defaultNames';
import { AmountColor } from '../../../enums';
import { IAccount } from '../../../interfaces';

import styles from './Account.module.scss';

interface AccountProps {
  account: IAccount;
  onClick: () => void;
}

export const Account = memo(({ account, onClick }: AccountProps) => {
  const { name, icon, color, description, balance } = account;

  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <div className={styles.account} onClick={onClick}>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}` }}>
        <span className='material-icons' style={{ color: 'white' }}>
          {icon}
        </span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoUpper}>
          <h3 className={styles.name}>{defaultNames.includes(name) ? t(name) : name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <p
          className={styles.amount}
          style={{
            color: !balance
              ? AmountColor.Zero
              : balance > 0
              ? AmountColor.Income
              : AmountColor.Expenses,
          }}
        >
          {setCurrency(balance)}
        </p>
      </div>
    </div>
  );
});
