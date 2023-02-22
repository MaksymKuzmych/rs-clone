import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { colors } from '../../../data/colors';
import { defaultNames } from '../../../data/defaultNames';
import { iconsCategory } from '../../../data/icons';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { ITransaction } from '../../../interfaces';

import styles from './Transaction.module.scss';

interface AccountProps {
  transaction: ITransaction;
  onClick: () => void;
}

export const Transaction = memo(({ transaction, onClick }: AccountProps) => {
  const { userData } = useContext(AuthContext);
  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  const { type, account, accountTo, category, amount, description } = transaction;
  const { accounts, categories } = userData.data;
  const categoryItem = categories.find((categoryItem) => categoryItem.id === category);
  const accountToItem = accounts.find((accountItem) => accountItem.id === accountTo);
  const accountItem = accounts.find((accountItem) => accountItem.id === account);
  const categoryName = categoryItem?.name || accountToItem?.name || '';
  const categoryIcon =
    iconsCategory.find((icon) => icon.id === categoryItem?.iconID)?.name || accountToItem?.icon;
  const categoryColor =
    colors.find((color) => color.id === categoryItem?.colorID)?.color || accountToItem?.color;

  const accountName = accountItem?.name || '';
  const accountIcon = accountItem?.icon || '';

  return (
    <div
      className={styles.transaction}
      style={{
        backgroundColor: userData.settings.theme === Theme.Light ? ThemeColor.Light : '#343a40',
      }}
      onClick={onClick}
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
          type === TransactionType.Income
            ? styles.amountPositive
            : type === TransactionType.Expenses
            ? styles.amountNegative
            : styles.amountNone
        }
      >
        {type === TransactionType.Transfer
          ? setCurrency(amount, 'never')
          : setCurrency(amount, 'always')}
      </p>
    </div>
  );
});
