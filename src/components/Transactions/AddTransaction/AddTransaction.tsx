import { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { defaultNames } from '../../../data/defaultNames';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { ICategory } from '../../../interfaces';
import { BasicTabs } from '../../UI/Tabs/Tabs';

import styles from './AddTransaction.module.scss';

export const AddTransaction = () => {
  const { userData, setCurrency } = useContext(AuthContext);
  const { t } = useTranslation();

  const { name, icon, color, description, balance } = userData.data.accounts[0];
  const incomes = userData.data.categories.filter(
    (category) => category.type === TransactionType.Income,
  );
  const expenses = userData.data.categories.filter(
    (category) => category.type === TransactionType.Expense,
  );
  const CATEGORY_HEIGHT = 133;
  const maxHeight = useMemo(
    () => Math.max(Math.ceil(incomes.length / 4), Math.ceil(expenses.length / 4)) * CATEGORY_HEIGHT,
    [expenses.length, incomes.length],
  );

  const Categories = useCallback(
    (array: ICategory[]) => {
      const categorySum = (category: ICategory) =>
        userData.data.transactions.reduce(
          (sum, transaction) =>
            sum + (category.id === transaction.category ? transaction.amount : 0),
          0,
        );

      return array.map((category) => (
        <div
          key={category.id}
          className={categorySum(category) === 0 ? styles.categoryInactive : styles.category}
        >
          <p className={styles.name}>
            {defaultNames.includes(category.name) ? t(category.name) : category.name}
          </p>
          <div className={styles.iconWrapper} style={{ backgroundColor: category.color }}>
            <span className='material-icons' style={{ color: 'white' }}>
              {category.icon}
            </span>
          </div>
          <p className={styles.sum}>{setCurrency(categorySum(category), 'never')}</p>
        </div>
      ));
    },
    [setCurrency, t, userData.data.transactions],
  );

  const Accounts = useMemo(
    () =>
      userData.data.accounts.map((account) => (
        <div key={account.id} className={styles.account}>
          <div className={styles.accountIconWrapper} style={{ backgroundColor: account.color }}>
            <span className='material-icons' style={{ color: 'white' }}>
              {account.icon}
            </span>
          </div>
          <div>
            <p className={styles.name}>
              {defaultNames.includes(account.name) ? t(account.name) : account.name}
            </p>
            <p className={styles.sum}>{setCurrency(account.balance, 'auto')}</p>
          </div>
        </div>
      )),
    [userData.data.accounts],
  );

  return (
    <>
      <header className={styles.header} style={{ backgroundColor: `${color}` }}>
        <div className={styles.info}>
          <span className='material-icons'>{icon}</span>
          <div className={styles.text}>
            <p className={styles.name}>{defaultNames.includes(name) ? t(name) : name}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
        <div className={styles.balanceWrapper}>
          <p>{t('Account balance')}</p>
          <p className={styles.balance}>{setCurrency(balance, 'never')}</p>
        </div>
      </header>
      <div
        className={styles.tabsWrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <BasicTabs
          firstChild={
            <div className={styles.categoriesWrapper} style={{ height: maxHeight + 'px' }}>
              {Categories(incomes)}
            </div>
          }
          secondChild={
            <div className={styles.categoriesWrapper} style={{ height: maxHeight + 'px' }}>
              {Categories(expenses)}
            </div>
          }
          thirdChild={
            <div className={styles.accountsWrapper} style={{ height: maxHeight + 'px' }}>
              {Accounts}
            </div>
          }
          firstTitle={t(TransactionType.Income + ' ').toUpperCase()}
          secondTitle={t(TransactionType.Expense).toUpperCase()}
          thirdTitle={t(TransactionType.Transfer + ' ').toUpperCase()}
        />
      </div>
    </>
  );
};
