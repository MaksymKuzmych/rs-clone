import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { defaultNames } from '../../../data/defaultNames';
import { AmountColor, Theme, ThemeColor, TransactionType } from '../../../enums';
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

  const selectedAccount = useMemo(
    () =>
      userData.data.accounts.find((account) => account.id === userData.settings.selectedAccount),
    [userData.data.accounts, userData.settings.selectedAccount],
  );

  const [currentAccount, setCurrentAccount] = useState<IAccount>(
    selectedAccount || userData.data.accounts[0],
  );
  const [targetAccount, setTargetAccount] = useState<IAccount | null>(null);
  const [targetCategory, setTargetCategory] = useState<ICategory | null>(null);
  const [type, setType] = useState<TransactionType | null>(null);
  const [modalType, setModalType] = useState<TransactionType | null>(null);
  const [day, setDay] = useState<Dayjs | null>(dayjs(Date.now()));
  const [openModal, setOpenModal] = useState(false);
  const [openSubModal, setOpenSubModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const changeAmountHandler = (value: string) => setAmount(value);
  const changeNotesHandler = (value: string) => setNotes(value);
  const changeDayHandler = (value: Dayjs | null) => setDay(value);

  const handleClose = useCallback(() => setOpenModal(false), []);
  const handleSubClose = useCallback(() => setOpenSubModal(false), []);

  const selectCurrentAccount = useCallback(() => {
    setModalType(null);
    setOpenSubModal(true);
  }, []);
  const selectTargetAccount = useCallback(() => {
    setModalType(TransactionType.Transfer);
    setOpenSubModal(true);
  }, []);
  const selectTargetCategory = useCallback(() => {
    setModalType(targetCategory?.type || null);
    setOpenSubModal(true);
  }, [targetCategory?.type]);

  const toCategory = useCallback((target: ICategory) => {
    setType(target.type);
    setTargetCategory(target);
    setTargetAccount(null);
    setOpenModal(true);
    setOpenSubModal(false);
  }, []);
  const toAccount = useCallback((target: IAccount) => {
    setType(TransactionType.Transfer);
    setTargetAccount(target);
    setTargetCategory(null);
    setOpenModal(true);
    setOpenSubModal(false);
  }, []);
  const toCurrentAccount = useCallback(
    (target: IAccount) => {
      setCurrentAccount(target);
      setOpenSubModal(false);
      if (targetAccount === target) {
        setTargetAccount(userData.data.accounts.filter((account) => account !== target)[0]);
      }
    },
    [targetAccount, userData.data.accounts],
  );

  const makeTransaction = useCallback(async () => {
    if (amount.length > 9) {
      setIsError(true);
      return;
    }

    setIsError(false);

    if (amount === '') {
      return;
    } else {
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
        await incrementBalance(userData.settings.userId, targetAccount.id, +amount);
      } else if (targetCategory) {
        await pushUserData(userData.settings.userId, {
          transactions: [
            {
              id: '',
              date: new Date(dayjs(day).toDate()).getTime(),
              type: targetCategory.type,
              account: currentAccount.id,
              accountTo: null,
              category: targetCategory.id,
              amount: targetCategory.type === TransactionType.Income ? +amount : -amount,
              description: notes,
            },
          ],
        });
      }
      await incrementBalance(
        userData.settings.userId,
        currentAccount.id,
        targetCategory?.type === TransactionType.Income ? +amount : -amount,
      );
      await changeUserData();
      drawerHandler('addTransaction', 'bottom', false);
    }
  }, [
    amount,
    changeUserData,
    currentAccount.id,
    day,
    drawerHandler,
    notes,
    targetAccount,
    targetCategory,
    userData.settings.userId,
  ]);

  const { name, icon, color, description, balance } = useMemo(
    () => currentAccount,
    [currentAccount],
  );
  const incomes = useMemo(
    () => userData.data.categories.filter((category) => category.type === TransactionType.Income),
    [userData.data.categories],
  );
  const expenses = useMemo(
    () => userData.data.categories.filter((category) => category.type === TransactionType.Expense),
    [userData.data.categories],
  );
  const CATEGORY_HEIGHT = 133;
  const maxHeight = useMemo(() => {
    const height =
      Math.max(Math.ceil(incomes.length / 4), Math.ceil(expenses.length / 4)) * CATEGORY_HEIGHT;
    return height > CATEGORY_HEIGHT * 2 ? CATEGORY_HEIGHT * 2 : height;
  }, [expenses.length, incomes.length]);

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
          <div key={category.id} className={styles.categoryWrapper}>
            <div
              className={categorySum(category) === 0 ? styles.categoryInactive : styles.category}
              onClick={() => toCategory(category)}
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
          </div>
        ))
      ) : (
        <div className={styles.emptyAccountsTitle}>{t('No categories available')}</div>
      );
    },
    [setCurrency, t, toCategory, userData.data.transactions],
  );

  const Accounts = useCallback(
    (transfer = true) =>
      userData.data.accounts.length > 1 ? (
        userData.data.accounts
          .filter((account) => account !== (transfer && currentAccount))
          .map((account) => (
            <div
              key={account.id}
              className={styles.account}
              onClick={() => {
                transfer ? toAccount(account) : toCurrentAccount(account);
              }}
            >
              <div className={styles.accountIconWrapper} style={{ backgroundColor: account.color }}>
                <span className='material-icons' style={{ color: 'white' }}>
                  {account.icon}
                </span>
              </div>
              <div>
                <h3 className={styles.accountName}>
                  {defaultNames.includes(account.name) ? t(account.name) : account.name}
                </h3>
                <p
                  className={styles.accountName}
                  style={{
                    color: !account.balance
                      ? AmountColor.Zero
                      : account.balance > 0
                      ? AmountColor.Income
                      : AmountColor.Expenses,
                  }}
                >
                  {setCurrency(account.balance, 'auto')}
                </p>
              </div>
            </div>
          ))
      ) : (
        <div className={styles.emptyAccountsTitle}>{t('No accounts available')}</div>
      ),
    [currentAccount, setCurrency, t, toAccount, toCurrentAccount, userData.data.accounts],
  );

  const fillTab = useCallback(
    (type: TransactionType, transfer = true) => {
      switch (type) {
        case TransactionType.Transfer:
          return (
            <div
              className={
                userData.data.accounts.length > 1
                  ? styles.accountsWrapper
                  : styles.emptyCategoriesWrapper
              }
              style={{ height: maxHeight + 'px' }}
            >
              {Accounts(transfer)}
            </div>
          );
        case TransactionType.Expense:
          return (
            <div
              className={
                expenses.length > 3 ? styles.categoriesWrapper : styles.emptyCategoriesWrapper
              }
              style={{ height: maxHeight + 'px' }}
            >
              {Categories(expenses)}
            </div>
          );
        case TransactionType.Income:
          return (
            <div
              className={
                incomes.length > 3 ? styles.categoriesWrapper : styles.emptyCategoriesWrapper
              }
              style={{ height: maxHeight + 'px' }}
            >
              {Categories(incomes)}
            </div>
          );
      }
    },
    [Accounts, Categories, expenses, incomes, maxHeight, userData.data.accounts.length],
  );

  const fillModal = useCallback(
    (modalType: TransactionType | null) => {
      switch (modalType) {
        case TransactionType.Expense:
          return fillTab(TransactionType.Expense);
        case TransactionType.Income:
          return fillTab(TransactionType.Income);
        case TransactionType.Transfer:
          return fillTab(TransactionType.Transfer);
        default:
          return fillTab(TransactionType.Transfer, false);
      }
    },
    [fillTab],
  );

  const themeStyle = {
    color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
    backgroundColor: userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
  };

  const title = useCallback(
    (type: TransactionType | null) => {
      switch (type) {
        case TransactionType.Income:
          return t(TransactionType.Income + ' ').toUpperCase();
        case TransactionType.Expense:
          return t(TransactionType.Expense + ' ').toUpperCase();
        case TransactionType.Transfer:
          return t(TransactionType.Transfer + ' ').toUpperCase();
        default:
          return t('Accounts').toUpperCase();
      }
    },
    [t],
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
      <div className={styles.tabsWrapper} style={themeStyle}>
        <BasicTabs
          firstChild={fillTab(TransactionType.Income)}
          secondChild={fillTab(TransactionType.Expense)}
          thirdChild={fillTab(TransactionType.Transfer)}
          firstTitle={t(TransactionType.Income + ' ').toUpperCase()}
          secondTitle={t(TransactionType.Expense + ' ').toUpperCase()}
          thirdTitle={t(TransactionType.Transfer + ' ').toUpperCase()}
        />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            {targetCategory?.type === TransactionType.Income ? (
              <TransferAccount
                category={targetCategory}
                text={t('From category')}
                onClick={selectTargetCategory}
              />
            ) : (
              <TransferAccount
                account={currentAccount}
                text={t('From account')}
                onClick={selectCurrentAccount}
              />
            )}
            {targetCategory?.type === TransactionType.Income ? (
              <TransferAccount
                account={currentAccount}
                text={t('To account')}
                onClick={selectCurrentAccount}
              />
            ) : targetAccount ? (
              <TransferAccount
                account={targetAccount}
                text={t('To account')}
                onClick={selectTargetAccount}
              />
            ) : (
              <TransferAccount
                category={targetCategory}
                text={t('To category')}
                onClick={selectTargetCategory}
              />
            )}
          </div>
          {isError && <p className={styles.error}>{t('Amount must be at most 9 characters')}</p>}
          <Calculator
            type={type + ' '}
            amount={amount}
            notes={notes}
            day={day}
            changeAmountHandler={changeAmountHandler}
            changeNotesHandler={changeNotesHandler}
            changeDayHandler={changeDayHandler}
            transferMoney={makeTransaction}
          />
        </div>
      </BasicModal>
      <BasicModal openModal={openSubModal} handleClose={handleSubClose}>
        <div className={styles.tabsWrapper} style={themeStyle}>
          <p className={styles.title}>{title(modalType)}</p>
          {fillModal(modalType)}
        </div>
      </BasicModal>
    </>
  );
};
