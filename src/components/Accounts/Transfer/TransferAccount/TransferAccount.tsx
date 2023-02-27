import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultNames } from '../../../../data/defaultNames';

import { IAccount, ICategory } from '../../../../interfaces';

import styles from './TransferAccount.module.scss';

interface TransferAccountProps {
  account?: IAccount | null;
  category?: ICategory | null;
  text: string;
  onClick?: () => void;
}

export const TransferAccount = memo(
  ({ account, category, text, onClick }: TransferAccountProps) => {
    const { t } = useTranslation();

    return account ? (
      <div className={styles.wrapper} style={{ backgroundColor: account?.color }} onClick={onClick}>
        <div>
          <p className={styles.text}>{text}</p>
          <p className={styles.name}>
            {defaultNames.includes(account.name) ? t(account.name) : account.name}
          </p>
        </div>
        <div className={styles.iconWrapper}>
          <span className='material-icons' style={{ color: account?.color }}>
            {account?.icon}
          </span>
        </div>
      </div>
    ) : (
      <div
        className={styles.wrapper}
        style={{ backgroundColor: category?.color }}
        onClick={onClick}
      >
        <div>
          <p className={styles.text}>{text}</p>
          <p className={styles.name}>
            {defaultNames.includes(category?.name || '') ? t(category?.name || '') : category?.name}
          </p>
        </div>
        <div className={styles.iconWrapper} style={{ borderRadius: '50%' }}>
          <span className='material-icons' style={{ color: category?.color }}>
            {category?.icon}
          </span>
        </div>
      </div>
    );
  },
);
