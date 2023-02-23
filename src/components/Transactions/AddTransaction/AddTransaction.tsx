import { useContext, useMemo } from 'react';
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

  const Categories = useMemo(() => {
    const categorySum = (category: ICategory) =>
      userData.data.transactions.reduce(
        (acc, val) => acc + (category.id === val.category ? val.amount : 0),
        0,
      );

    return userData.data.categories
      .filter((category) => category.type === TransactionType.Expense)
      .map((category) => (
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
  }, [setCurrency, t, userData.data.categories, userData.data.transactions]);

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
      <BasicTabs
        firstChild={
          <div
            className={styles.categoriesWrapper}
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            }}
          >
            {Categories}
          </div>
        }
        secondChild={
          <div
            className={styles.categoriesWrapper}
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            }}
          >
            {Categories}
          </div>
        }
        thirdChild={
          <div
            className={styles.categoriesWrapper}
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            }}
          >
            {Categories}
          </div>
        }
        firstTitle={t(TransactionType.Income + ' ').toUpperCase()}
        secondTitle={t(TransactionType.Expense + ' ').toUpperCase()}
        thirdTitle={t(TransactionType.Transfer + ' ').toUpperCase()}
      />
    </>
  );
};
