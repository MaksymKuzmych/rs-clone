import { useTranslation } from 'react-i18next';

import { IAccount } from '../../../interfaces';
import { BasicButton } from '../../UI/Button/BasicButton';

import styles from './AccountSettings.module.scss';

interface AccountSettingsProps {
  account: IAccount;
  icon: string;
  color: string;
  currency: string;
}

export const AccountSettings = ({ account, icon, color, currency }: AccountSettingsProps) => {
  const { t } = useTranslation();
  const { name, description, balance } = account;

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
          <p className={styles.balanceText}>{t('Account balance')}</p>
          <p className={styles.balance}>
            {balance} {currency}
          </p>
        </div>
      </header>
      <div className={styles.btnsWrapper}>
        <BasicButton icon='edit' color='#fec107' title={t('Edit')} />
        <BasicButton icon='sync' color='#7f7f7f' title={t('Balance')} />
        <BasicButton icon='receipt' color='#029688' title={t('Transactions')} />
        <BasicButton icon='arrow_downward' color='#4cb050' title={t('Recharge')} />
        <BasicButton icon='arrow_upward' color='#f34334' title={t('Withdraw')} />
        <BasicButton icon='arrow_forward' color='#7f7f7f' title={t('Transfer')} />
      </div>
    </>
  );
};
