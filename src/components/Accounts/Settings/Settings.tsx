import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IAccount } from '../../../interfaces';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';
import { BasicModal } from '../../UI/Modal/Modal';
import { DeleteAccount } from '../DeleteAccount/DeleteAccount';
import { deleteUserData } from '../../../firebase/delete-user-data';
import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';

import styles from './Settings.module.scss';

interface SettingsProps {
  account: IAccount;
}

export const Settings = memo(({ account }: SettingsProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const { name, icon, color, description, balance } = account;

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const deleteUser = useCallback(async () => {
    deleteUserData(userData.userId, { accounts: account.id });
    await changeUserData();
  }, [account.id, changeUserData, userData.userId]);

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
            {balance} {userData.settings.currency}
          </p>
        </div>
      </header>
      <div className={styles.btnsWrapper}>
        <SettingsBtn
          icon='edit'
          color='#fec107'
          title={t('Edit')}
          onClick={() => {
            drawerHandler('edit', 'bottom', true);
          }}
        />
        <SettingsBtn
          icon='receipt'
          color='#029688'
          title={t('Transactions')}
          onClick={() => {
            drawerHandler('transactions', 'bottom', true);
          }}
        />
        <SettingsBtn icon='delete' color='#f34334' title={t('Delete')} onClick={handleOpen} />
        <SettingsBtn
          icon='arrow_downward'
          color='#4cb050'
          title={t('Recharge')}
          onClick={() => {
            drawerHandler('recharge', 'bottom', true);
          }}
        />
        <SettingsBtn
          icon='arrow_upward'
          color='#eda948'
          title={t('Withdraw')}
          onClick={() => {
            drawerHandler('withdraw', 'bottom', true);
          }}
        />
        <SettingsBtn
          icon='arrow_forward'
          color='#7f7f7f'
          title={t('Transfer')}
          onClick={() => {
            drawerHandler('transfer', 'bottom', true);
          }}
        />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <DeleteAccount
          deleteUser={deleteUser}
          handleClose={handleClose}
          drawerHandler={drawerHandler}
        />
      </BasicModal>
    </>
  );
});
