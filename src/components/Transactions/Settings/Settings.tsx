import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITransactionAll } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor, TransactionType } from '../../../enums';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';
import { DeleteTransaction } from '../DeleteTransaction/DeleteTransaction';
import { dayOfWeek } from '../../../utils/day-of-week';

import styles from './Settings.module.scss';

interface SettingsProps {
  currentTransaction: ITransactionAll;
}

export const Settings = memo(({ currentTransaction }: SettingsProps) => {
  const { userData, setCurrency } = useContext(AuthContext);
  const { lang } = userData.settings;

  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const Account = (
    <div className={styles.account} style={{ backgroundColor: currentTransaction.accountColor }}>
      <p className={styles.description}>
        {currentTransaction.type === TransactionType.Income ? t('To account') : t('From account')}
      </p>
      <p>{currentTransaction.accountName}</p>
      <div className={styles.accountIcon}>
        <span className='material-icons' style={{ color: currentTransaction.accountColor }}>
          {currentTransaction.accountIcon}
        </span>
      </div>
    </div>
  );

  const Category = (
    <div className={styles.category} style={{ backgroundColor: currentTransaction.categoryColor }}>
      <p className={styles.description}>
        {currentTransaction.type === TransactionType.Income
          ? t('From category')
          : currentTransaction.type === TransactionType.Transfer
          ? t('To account')
          : t('To category')}
      </p>
      <p>{currentTransaction.categoryName}</p>
      <div className={styles.categoryIcon}>
        <span className='material-icons' style={{ color: currentTransaction.categoryColor }}>
          {currentTransaction.categoryIcon}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          {currentTransaction.type === TransactionType.Income ? Category : Account}
          {currentTransaction.type === TransactionType.Income ? Account : Category}
        </div>
      </div>
      <div
        className={styles.amountWrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <p className={styles.type}>{t(`${currentTransaction.type} `)}</p>
        <p className={styles.amount}>{setCurrency(currentTransaction.amount, 'never')}</p>
      </div>
      <div
        className={styles.notesWrapper}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <input
          type='textfield'
          placeholder={t('Notes...') || ''}
          defaultValue={currentTransaction.description || ''}
          className={styles.notes}
          style={{
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            backgroundColor:
              userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
          }}
        />
      </div>
      <p
        className={styles.date}
        style={{
          color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        {dayOfWeek(currentTransaction.date, lang, t) + ', '}
        {new Date(currentTransaction.date)
          .toLocaleDateString(lang, { month: 'long', day: 'numeric', year: 'numeric' })
          .toUpperCase()}
      </p>
      <div
        className={styles.btnsWrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <SettingsBtn
          icon='content_copy'
          color='#5c6ac2'
          title={t('Duplicate')}
          onClick={() => {}}
        />
        <SettingsBtn icon='event' color='#a8adb3' title={t('Date')} onClick={() => {}} />
        <SettingsBtn icon='delete' color='#f34334' title={t('Delete')} onClick={handleOpen} />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <DeleteTransaction currentTransaction={currentTransaction} handleClose={handleClose} />
      </BasicModal>
    </>
  );
});
