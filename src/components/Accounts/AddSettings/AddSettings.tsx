import { createTheme, TextField, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import { Currency } from '../../../enums';
import { Anchor } from '../../../types';
import { store } from '../../../utils/store';
import { Colors } from '../../UI/Colors/Colors';
import { Icons } from '../../UI/Icons/Icons';
import { BasicModal } from '../../UI/Modal/Modal';
import { BasicTabs } from '../../UI/Tabs/Tabs';

import styles from './AddSettings.module.scss';

const theme = createTheme({
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
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#a8adb3',
          fontSize: '18px',
        },
      },
    },
  },
});

interface AddSettingsProps {
  currency: Currency;
  drawerHandler: (type: string, anchor: Anchor) => void;
}

export const AddSettings = memo(({ currency, drawerHandler }: AddSettingsProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [icon, setIcon] = useState('credit_card');
  const [color, setColor] = useState('#4154b0');

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      balance: '',
      description: '',
    },
    validationSchema: object().shape({
      name: string().required(`${t('Required')}`),
      balance: string().required(`${t('Required')}`),
    }),
    onSubmit: (values) => {
      store.data.accounts.push({
        id: String(Date.now()),
        name: values.name,
        balance: +values.balance,
        description: values.description,
        color: color,
        icon: icon,
      });

      drawerHandler('addAccount', 'bottom');
    },
  });

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const iconHandler = (icon: string) => setIcon(icon);
  const colorHandler = (color: string) => setColor(color);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.add}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.upper} style={{ backgroundColor: `${color}` }}>
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>{t('New account')}</h2>
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
          <div className={styles.inner}>
            <button className={styles.btn} onClick={() => handleOpen()} type='button'>
              <div className={styles.iconWrapper} style={{ backgroundColor: 'black' }}>
                <span className='material-icons' style={{ color: `${color}` }}>
                  {icon}
                </span>
              </div>
            </button>
            <h2 className={styles.headerTitle}>{t('Account')}</h2>
            <TextField
              variant='standard'
              color='primary'
              fullWidth={true}
              name='description'
              label={t('Description')}
              type='text'
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <h2 className={styles.headerTitle}>{t('Balance')}</h2>
            <div className={styles.balanceWrapper}>
              <TextField
                id='standard-basic'
                variant='standard'
                color='primary'
                name='balance'
                label={t('Account balance')}
                type='number'
                sx={{ width: '200px' }}
                onChange={formik.handleChange}
                value={formik.values.balance}
                helperText={formik.errors.balance}
                error={!!formik.errors.balance}
              />
              <span>{currency}</span>
            </div>
          </div>
        </form>
        <BasicModal openModal={openModal} handleClose={handleClose}>
          <BasicTabs
            firstChild={<Icons iconHandler={iconHandler} />}
            secondChild={<Colors colorHandler={colorHandler} />}
          />
        </BasicModal>
      </div>
    </ThemeProvider>
  );
});
