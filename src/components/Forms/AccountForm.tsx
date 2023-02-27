import { createTheme, TextField, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import { AuthContext } from '../../Auth/Auth';
import { DrawerContext } from '../../context/Drawer';
import { defaultNames } from '../../data/defaultNames';
import { iconsCard } from '../../data/icons';
import { CurrencySymbol, Theme, ThemeColor } from '../../enums';
import { pushUserData } from '../../firebase/push-user-data';
import { updateUserData } from '../../firebase/update-user-data';
import { IAccount } from '../../interfaces';
import { getRandomColor, getRandomIcon } from '../../utils/get-random-data';
import { Colors } from '../UI/Colors/Colors';
import { Icons } from '../UI/Icons/Icons';
import { BasicModal } from '../UI/Modal/Modal';
import { BasicTabs } from '../UI/Tabs/Tabs';

import styles from './Forms.module.scss';

interface AccountFormProps {
  currentAccount?: IAccount;
}

export const themeForTitle = () =>
  createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
    },
    components: {
      MuiInput: {
        styleOverrides: {
          underline: {
            color: '#fff',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '22px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '5px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#f8f8f8',
            fontSize: '23px',
          },
        },
      },
    },
  });

export const AccountForm = memo(({ currentAccount }: AccountFormProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [icon, setIcon] = useState(
    `${currentAccount ? currentAccount.icon : getRandomIcon(iconsCard).name}`,
  );
  const [color, setColor] = useState(
    `${currentAccount ? currentAccount.color : getRandomColor().color}`,
  );
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const iconHandler = useCallback((icon: string) => setIcon(icon), []);
  const colorHandler = useCallback((color: string) => setColor(color), []);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const formik = useFormik({
    initialValues: {
      name: `${
        !currentAccount
          ? ''
          : defaultNames.includes(currentAccount.name)
          ? t(currentAccount.name)
          : currentAccount.name
      }`,
      balance: `${currentAccount ? currentAccount.balance.toFixed(2) : '0'}`,
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
        name: values.name === 'Карта' ? 'Card' : values.name === 'Наличные' ? 'Cash' : values.name,
        balance: +values.balance,
        description: values.description,
        color: color,
        icon: icon,
      };

      if (currentAccount) {
        await updateUserData(userData.settings.userId, {
          accounts: {
            [currentAccount.id]: accountInfo,
          },
        });
      } else {
        await pushUserData(userData.settings.userId, {
          accounts: [accountInfo],
        });
      }

      await changeUserData();
      drawerHandler('addAccount', 'bottom', false);
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className={styles.upperWrapper} style={{ backgroundColor: `${color}` }}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {!currentAccount
                ? t('New account')
                : defaultNames.includes(currentAccount.name)
                ? t(currentAccount.name)
                : currentAccount.name}
            </h2>
            <button type='submit'>
              <span className='material-icons' style={{ color: 'white' }}>
                check
              </span>
            </button>
          </div>
          <ThemeProvider theme={themeForTitle}>
            <TextField
              autoFocus
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
          </ThemeProvider>
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
              inputProps={{
                step: '0.01',
              }}
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
