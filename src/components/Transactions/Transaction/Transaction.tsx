import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { colors } from '../../../data/colors';
import { defaultNames } from '../../../data/defaultNames';
import { iconsCategory } from '../../../data/icons';
import { TransactionType } from '../../../enums';
import { ITransaction } from '../../../interfaces';

import styles from './Transaction.module.scss';

interface AccountProps {
  transaction: ITransaction;
}

export const Transaction = memo(({ transaction }: AccountProps) => {
  const { userData } = useContext(AuthContext);
  const { setCurrency } = useContext(AuthContext);

  const { t } = useTranslation();

  const { type, account, category, amount, description } = transaction;
  const { accounts, categories } = userData.data;
  const categoryItem = categories.find((categoryItem) => categoryItem.id === category);
  const categoryName = categoryItem?.name || '';
  const categoryIcon = iconsCategory.find((icon) => icon.id === categoryItem?.iconID)?.name;
  const categoryColor = colors.find((color) => color.id === categoryItem?.colorID)?.color;
  const accountItem = accounts.find((accountItem) => accountItem.id === account);
  const accountName = accountItem?.name || '';
  const accountIcon = accountItem?.icon;
  const sign = type === TransactionType.Income;

  return (
    <div className={styles.transaction}>
      <div className={styles.infoWrapper}>
        <div className={styles.iconWrapper} style={{ backgroundColor: categoryColor }}>
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
      <p className={sign ? styles.amountPositive : styles.amountNegative}>
        {setCurrency(sign ? amount : -amount, 'always')}
      </p>
    </div>
  );
});
