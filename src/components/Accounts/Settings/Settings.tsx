import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IAccount } from '../../../interfaces';
import { SettingsBtn } from './SettingsBtn/SettingsBtn';
import { BasicModal } from '../../UI/Modal/Modal';
import { DeleteAccount } from '../DeleteAccount/DeleteAccount';
import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { SettingsHeader } from './SettingsHeader/SettingsHeader';
import { updateUserSettings } from '../../../firebase/update-user-settings';
import { Theme, ThemeColor } from '../../../enums';

import styles from './Settings.module.scss';

interface SettingsProps {
  currentAccount: IAccount;
}

export const Settings = memo(({ currentAccount }: SettingsProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const redirectToTransactions = useCallback(async () => {
    await updateUserSettings(userData.settings.userId, { selectedAccount: currentAccount.id });
    navigate(`/transactions`);
    changeUserData();
    drawerHandler('info', 'bottom', false);
  }, [changeUserData, currentAccount.id, drawerHandler, navigate, userData.settings.userId]);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  return (
    <>
      <SettingsHeader currentAccount={currentAccount} />
      <div
        className={styles.btnsWrapper}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
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
          onClick={redirectToTransactions}
        />
        <SettingsBtn
          icon='arrow_forward'
          color='#7f7f7f'
          title={t('Transfer')}
          onClick={() => {
            drawerHandler('transfer', 'bottom', true);
          }}
        />
        <SettingsBtn icon='delete' color='#f34334' title={t('Delete')} onClick={handleOpen} />
      </div>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <DeleteAccount currentAccount={currentAccount} handleClose={handleClose} />
      </BasicModal>
    </>
  );
});
