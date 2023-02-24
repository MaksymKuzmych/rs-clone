import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { defaultNames } from '../../../data/defaultNames';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { ITransaction } from '../../../interfaces';

import styles from './Transaction.module.scss';

interface AccountProps {
  transaction: ITransaction;
}

export const Transaction = memo(({ transaction }: AccountProps) => {
  const { userData } = useContext(AuthContext);
  const { setCurrency } = useContext(AuthContext);
  const { t } = useTranslation();

  const { type, account, accountTo, category, amount, description } = transaction;
  const { accounts, categories } = userData.data;

  const accountItem = accounts.find((accountItem) => accountItem.id === account);
  const accountName = accountItem?.name || '';
  const accountIcon = accountItem?.icon || '';
  const accountToItem = accounts.find((accountItem) => accountItem.id === accountTo);
  const categoryItem = categories.find((categoryItem) => categoryItem.id === category);
  const categoryName = categoryItem?.name || accountToItem?.name || '';
  const categoryColor = categoryItem?.color || accountToItem?.color || '';
  const categoryIcon = categoryItem?.icon || accountToItem?.icon || '';

  return (
    <div
      className={styles.transaction}
      style={{
        backgroundColor: userData.settings.theme === Theme.Light ? ThemeColor.Light : '#343a40',
      }}
    >
      <div className={styles.infoWrapper}>
        <div
          className={
            type === TransactionType.Transfer ? styles.accountIconWrapper : styles.iconWrapper
          }
          style={{ backgroundColor: categoryColor }}
        >
          <span className='material-icons' style={{ color: 'white' }}>
            {categoryIcon}
          </span>
        </div>
        <div>
          <p className={styles.categoryName}>
            {defaultNames.includes(categoryName) ? t(categoryName) : categoryName}
          </p>
          <div className={styles.info}>
            <span className={'material-icons ' + styles.accountIcon}>{accountIcon}</span>
            <span className={styles.accountName}>
              {defaultNames.includes(accountName) ? t(accountName) : accountName}
            </span>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <p
        className={
          type === TransactionType.Transfer
            ? styles.amountNone
            : amount > 0
            ? styles.amountPositive
            : styles.amountNegative
        }
      >
        {type === TransactionType.Transfer
          ? setCurrency(amount, 'never')
          : setCurrency(amount, 'always')}
      </p>
    </div>
  );
});
