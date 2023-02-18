import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import { AuthContext } from '../../Auth/Auth';
import { DrawerContext } from '../../context/Drawer';
import { CurrencySymbol, Theme, ThemeColor } from '../../enums';
import { pushUserData } from '../../firebase/push-user-data';
import { updateUserData } from '../../firebase/update-user-data';
import { IAccount } from '../../interfaces';
import { Colors } from '../UI/Colors/Colors';
import { Icons } from '../UI/Icons/Icons';
import { BasicModal } from '../UI/Modal/Modal';
import { BasicTabs } from '../UI/Tabs/Tabs';

import styles from './Forms.module.scss';

interface AccountFormProps {
  currentAccount?: IAccount;
}

export const AccountForm = memo(({ currentAccount }: AccountFormProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [icon, setIcon] = useState(`${currentAccount ? currentAccount.icon : 'credit_card'}`);
  const [color, setColor] = useState(`${currentAccount ? currentAccount.color : '#4154b0'}`);
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const iconHandler = useCallback((icon: string) => setIcon(icon), []);
  const colorHandler = useCallback((color: string) => setColor(color), []);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const formik = useFormik({
    initialValues: {
      name: `${currentAccount ? currentAccount.name : ''}`,
      balance: `${currentAccount ? currentAccount.balance : ''}`,
      description: `${currentAccount ? currentAccount.description : ''}`,
    },
    validationSchema: object().shape({
      name: string()
        .min(2, `${t('Name must be at least 2 characters')}`)
        .max(8, `${t('Name must be at most 8 characters')}`)
        .required(`${t('Required')}`),
      balance: string()
        .max(9, `${t('Balance must be at most 9 characters')}`)
        .required(`${t('Required')}`),
      description: string().max(16, `${t('Description must be at most 16 characters')}`),
    }),
    onSubmit: async (values) => {
      const accountInfo = {
        id: currentAccount ? currentAccount.id : '',
        date: currentAccount ? currentAccount.date : Date.now(),
        name: values.name,
        balance: +values.balance,
        description: values.description,
        color: color,
        icon: icon,
      };

      if (currentAccount) {
        await updateUserData(userData.userId, {
          accounts: {
            [currentAccount.id]: accountInfo,
          },
        });
      } else {
        await pushUserData(userData.userId, {
          accounts: [accountInfo],
        });
      }

      changeUserData();
      drawerHandler('addAccount', 'bottom', false);
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className={styles.upperWrapper} style={{ backgroundColor: `${color}` }}>
          <div className={styles.header}>
            <h2 className={styles.title}>{t('New account')}</h2>
            <button type='submit'>
              <span className='material-icons' style={{ color: 'white' }}>
                check
              </span>
            </button>
          </div>
          <TextField
            variant='standard'
            color='primary'
            sx={{ width: '70%' }}
            label={t('Name')}
            name='name'
            type='text'
            onChange={formik.handleChange}
            helperText={formik.errors.name}
            error={!!formik.errors.name}
            value={formik.values.name}
          />
        </div>
        <div
          className={styles.innerWrapper}
          style={{
            backgroundColor:
              userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          }}
        >
          <button className={styles.btn} onClick={() => handleOpen()} type='button'>
            <div className={styles.iconWrapper} style={{ backgroundColor: 'black' }}>
              <span className='material-icons' style={{ color: `${color}` }}>
                {icon}
              </span>
            </div>
          </button>
          <h2 className={styles.title}>{t('Account')}</h2>
          <TextField
            variant='standard'
            color='primary'
            fullWidth={true}
            name='description'
            label={t('Description')}
            type='text'
            onChange={formik.handleChange}
            helperText={formik.errors.description}
            error={!!formik.errors.description}
            value={formik.values.description}
          />
          <h2 className={styles.title}>{t('Balance')}</h2>
          <div className={styles.balanceWrapper}>
            <TextField
              variant='standard'
              color='primary'
              name='balance'
              label={t('Account balance')}
              type='number'
              sx={{ width: '260px' }}
              onChange={formik.handleChange}
              value={formik.values.balance}
              helperText={formik.errors.balance}
              error={!!formik.errors.balance}
            />
            <span className={styles.currency}>{CurrencySymbol[userData.settings.currency]}</span>
          </div>
        </div>
      </form>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <BasicTabs
          firstChild={<Icons page={'accounts'} iconHandler={iconHandler} />}
          secondChild={<Colors colorHandler={colorHandler} />}
          firstTitle='Icons'
          secondTitle='Colors'
        />
      </BasicModal>
    </div>
  );
});
