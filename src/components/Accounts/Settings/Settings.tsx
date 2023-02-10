import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../../enums';
import { IAccount } from '../../../interfaces';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';

import styles from './Settings.module.scss';

interface SettingsProps {
  account: IAccount;
  currency: Currency;
  typeDrawerHandler: (type: string) => void;
}

export const Settings = memo(({ account, currency, typeDrawerHandler }: SettingsProps) => {
  const { t } = useTranslation();
  const { name, icon, color, description, balance } = account;

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
          icon='sync'
          color='#7f7f7f'
          title={t('Balance')}
          onClick={() => {
            typeDrawerHandler('balance');
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
          icon='arrow_downward'
          color='#4cb050'
          title={t('Recharge')}
          onClick={() => {
            typeDrawerHandler('recharge');
          }}
        />
        <SettingsBtn
          icon='arrow_upward'
          color='#f34334'
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
    </>
  );
});
