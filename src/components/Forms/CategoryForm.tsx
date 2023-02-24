import { createTheme, TextField, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import { AuthContext } from '../../Auth/Auth';
import { pushUserData } from '../../firebase/push-user-data';
import { updateUserData } from '../../firebase/update-user-data';
import { BasicModal } from '../UI/Modal/Modal';
import { BasicTabs } from '../UI/Tabs/Tabs';
import { SettingsBtn } from '../Accounts/Settings/SettingsBtn/SettingsBtn';
import { Colors } from '../UI/Colors/Colors';
import { Icons } from '../UI/Icons/Icons';
import { DeleteCategory } from '../CategoryComponents/DeleteCategory/DeleteCategory';
import { Theme, ThemeColor, TransactionType } from '../../enums';
import { ICategory } from '../../interfaces';
import { defaultNames, defaultNamesRu } from '../../data/defaultNames';
import { DrawerContext } from '../../context/Drawer';

import styles from './Forms.module.scss';

interface CategoryFormProps {
  type: TransactionType;
  category: ICategory | null;
}

const themeForTitle = () =>
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

export const CategoryForm = memo(({ type, category }: CategoryFormProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [icon, setIcon] = useState(category && category.icon ? category.icon : 'shopping_cart');
  const [color, setColor] = useState(category && category.color ? category.color : '#f95c57');
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { t } = useTranslation();

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const iconHandler = useCallback((icon: string) => setIcon(icon), []);
  const colorHandler = useCallback((color: string) => setColor(color), []);

  const handleOpenModalDelete = useCallback(() => setOpenModalDelete(true), []);
  const handleCloseModalDelete = useCallback(() => setOpenModalDelete(false), []);

  const formik = useFormik({
    initialValues: {
      name: `${
        category ? (defaultNames.includes(category.name) ? t(category.name) : category.name) : ''
      }`,
    },
    validationSchema: object().shape({
      name: string()
        .min(2, `${t('Name must be at least 2 characters')}`)
        .max(10, `${t('Name must be at most 8 characters')}`)
        .required(`${t('Required')}`),
    }),
    onSubmit: async (values) => {
      const nameEnInd = defaultNamesRu.indexOf(values.name);
      const categoryInfo = {
        id: category ? category.id : '',
        name: nameEnInd !== -1 ? defaultNames[nameEnInd] : values.name,
        date: category ? category.date : Date.now(),
        type: type,
        color: color,
        icon: icon,
        description: '',
      };
      if (category) {
        await updateUserData(userData.settings.userId, {
          categories: {
            [category.id]: categoryInfo,
          },
        });
      } else {
        await pushUserData(userData.settings.userId, {
          categories: [categoryInfo],
        });
      }

      await changeUserData();
      drawerHandler('changeCategory', 'bottom', false);
      await changeUserData();
      drawerHandler('changeCategory', 'bottom', false);
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <div className={styles.upperWrapper} style={{ backgroundColor: `${color}` }}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {category
                ? defaultNames.includes(category.name)
                  ? t(category.name)
                  : category.name
                : t('New category')}
            </h2>
            <button type='submit'>
              <span className='material-icons' style={{ color: 'white' }}>
                check
              </span>
            </button>
          </div>
          <ThemeProvider theme={themeForTitle}>
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
          <div className={styles.btnsWrapper}>
            {category ? (
              <div className={styles.categoriesBtnsWrapper}>
                <SettingsBtn
                  icon='delete'
                  color='#f34334'
                  title={t('Delete')}
                  onClick={() => {
                    handleOpenModalDelete();
                  }}
                />
              </div>
            ) : (
              <SettingsBtn
                icon='cancel'
                color='#f34334'
                title={t('Cancel')}
                onClick={() => {
                  drawerHandler('cancel', 'bottom', false);
                }}
              />
            )}
          </div>
        </div>
      </form>
      <BasicModal openModal={openModal} handleClose={handleClose}>
        <BasicTabs
          firstChild={<Icons page={'categories'} iconHandler={iconHandler} />}
          secondChild={<Colors colorHandler={colorHandler} />}
          firstTitle='Icons'
          secondTitle='Colors'
        />
      </BasicModal>
      <BasicModal openModal={openModalDelete} handleClose={handleCloseModalDelete}>
        <DeleteCategory categoryId={category?.id} handleCloseModalDelete={handleCloseModalDelete} />
      </BasicModal>
    </div>
  );
});
