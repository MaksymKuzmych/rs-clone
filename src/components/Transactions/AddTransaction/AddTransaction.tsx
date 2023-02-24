import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { defaultNames } from '../../../data/defaultNames';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { incrementBalance } from '../../../firebase/increment-balance';
import { pushUserData } from '../../../firebase/push-user-data';
import { IAccount, ICategory } from '../../../interfaces';
import { TransferAccount } from '../../Accounts/Transfer/TransferAccount/TransferAccount';
import { Calculator } from '../../UI/Calculator/Calculator';
import { BasicModal } from '../../UI/Modal/Modal';
import { BasicTabs } from '../../UI/Tabs/Tabs';

import styles from './AddTransaction.module.scss';

export const AddTransaction = () => {
  const { userData, setCurrency, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);
  const { t } = useTranslation();

  const [targetAccount, setTargetAccount] = useState<IAccount | null>(null);
  const [day, setDay] = useState<Dayjs | null>(dayjs(Date.now()));
  const [openModal, setOpenModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const changeAmountHandler = (value: string) => setAmount(value);
  const changeNotesHandler = (value: string) => setNotes(value);
  const changeDayHandler = (value: Dayjs | null) => setDay(value);
  const currentAccount = userData.data.accounts[0];

  const handleClose = useCallback(() => setOpenModal(false), []);
  const handleOpen = useCallback((targetAccount: IAccount) => {
    setTargetAccount(targetAccount);
    setOpenModal(true);
  }, []);

  const transferMoney = async () => {
    if (amount === '') {
      return;
    }

    if (amount.length > 9) {
      setIsError(true);
      return;
    }

    setIsError(false);

    if (targetAccount) {
      await pushUserData(userData.settings.userId, {
        transactions: [
          {
            id: '',
            date: new Date(dayjs(day).toDate()).getTime(),
            type: TransactionType.Transfer,
            account: currentAccount.id,
            accountTo: targetAccount.id,
            category: null,
            amount: -amount,
            description: notes,
          },
        ],
      });

      await incrementBalance(userData.settings.userId, currentAccount.id, -amount);
      await incrementBalance(userData.settings.userId, targetAccount.id, +amount);

      await changeUserData();
      drawerHandler('addTransaction', 'bottom', false);
    }
  };

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

      return array.length ? (
        array.map((category) => (
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
        ))
      ) : (
        <div className={styles.emptyAccountsTitle}>{t('No categories available')}</div>
      );
    },
    [setCurrency, t, userData.data.transactions],
  );

  const Accounts = useMemo(
    () =>
      userData.data.accounts.length > 1 ? (
        userData.data.accounts
          .filter((_, index) => index !== 0)
          .map((account) => (
            <div key={account.id} className={styles.account} onClick={() => handleOpen(account)}>
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
          ))
      ) : (
        <div className={styles.emptyAccountsTitle}>{t('No accounts available')}</div>
      ),
    [handleOpen, setCurrency, t, userData.data.accounts],
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
            <div
              className={incomes.length ? styles.categoriesWrapper : styles.emptyCategoriesWrapper}
              style={{ height: maxHeight + 'px' }}
            >
              {Categories(incomes)}
            </div>
          }
          secondChild={
            <div
              className={expenses.length ? styles.categoriesWrapper : styles.emptyCategoriesWrapper}
              style={{ height: maxHeight + 'px' }}
            >
              {Categories(expenses)}
            </div>
          }
          thirdChild={
            <div
              className={incomes.length ? styles.accountsWrapper : styles.emptyCategoriesWrapper}
              style={{ height: maxHeight + 'px' }}
            >
              {Accounts}
            </div>
          }
          firstTitle={t(TransactionType.Income + ' ').toUpperCase()}
          secondTitle={t(TransactionType.Expense).toUpperCase()}
          thirdTitle={t(TransactionType.Transfer + ' ').toUpperCase()}
        />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <TransferAccount account={currentAccount} text={t('From account')} />
            <TransferAccount account={targetAccount} text={t('To account')} />
          </div>
          {isError && <p className={styles.error}>{t('Amount must be at most 9 characters')}</p>}
          <Calculator
            type={'Transfer'}
            amount={amount}
            notes={notes}
            day={day}
            changeAmountHandler={changeAmountHandler}
            changeNotesHandler={changeNotesHandler}
            changeDayHandler={changeDayHandler}
            transferMoney={transferMoney}
          />
        </div>
      </BasicModal>
    </>
  );
};
