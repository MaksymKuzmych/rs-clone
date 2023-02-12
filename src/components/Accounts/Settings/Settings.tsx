import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CurrencySymbol } from '../../../enums';
import { IAccount } from '../../../interfaces';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';
import { BasicModal } from '../../UI/Modal/Modal';
import { DeleteAccount } from '../DeleteAccount/DeleteAccount';

import styles from './Settings.module.scss';

interface SettingsProps {
  account: IAccount;
  currency: CurrencySymbol;
  typeDrawerHandler: (type: string) => void;
}

export const Settings = memo(({ account, currency, typeDrawerHandler }: SettingsProps) => {
  const { t } = useTranslation();
  const { name, icon, color, description, balance } = account;
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <header className={styles.header} style={{ backgroundColor: `${color}` }}>
        <div className={styles.info}>
          <span className='material-icons'>{icon}</span>
          <div className={styles.text}>
            <p className={styles.name}>{name}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
        <div className={styles.balanceWrapper}>
          <p>{t('Account balance')}</p>
          <p className={styles.balance}>
            {balance} {currency}
          </p>
        </div>
      </header>
      <div className={styles.btnsWrapper}>
        <SettingsBtn
          icon='edit'
          color='#fec107'
          title={t('Edit')}
          onClick={() => {
            typeDrawerHandler('edit');
          }}
        />
        <SettingsBtn
          icon='receipt'
          color='#029688'
          title={t('Transactions')}
          onClick={() => {
            typeDrawerHandler('transactions');
          }}
        />
        <SettingsBtn
          icon='delete'
          color='#f34334'
          title={t('Delete')}
          onClick={() => {
            handleOpen();
          }}
        />
        <SettingsBtn
          icon='arrow_downward'
          color='#4cb050'
          title={t('Recharge')}
          onClick={() => {
            typeDrawerHandler('recharge');
          }}
        />
        <SettingsBtn
          icon='arrow_upward'
          color='#eda948'
          title={t('Withdraw')}
          onClick={() => {
            typeDrawerHandler('withdraw');
          }}
        />
        <SettingsBtn
          icon='arrow_forward'
          color='#7f7f7f'
          title={t('Transfer')}
          onClick={() => {
            typeDrawerHandler('transfer');
          }}
        />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <DeleteAccount />
      </BasicModal>
    </>
  );
});
