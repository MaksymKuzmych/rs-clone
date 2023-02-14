import { createTheme, TextField, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import { AuthContext } from '../../../Auth/Auth';
import { pushUserData } from '../../../firebase/push-user-data';
import { updateUserData } from '../../../firebase/update-user-data';
import { BasicModal } from '../../UI/Modal/Modal';
import { BasicTabs } from '../../UI/Tabs/Tabs';
import { SettingsBtn } from '../../Accounts/Settings/SettingsBtn/SettingsBtn';
import { Colors } from '../../UI/Colors/Colors';
import { Icons } from '../../UI/Icons/Icons';
import { DeleteCategory } from '../DeleteCategory/DeleteCategory';

import { colors } from '../../../data/colors';
import { TransactionType } from '../../../enums';
import { ICategory } from '../../../interfaces';
import { Anchor } from '../../../types';
import { iconsCategory } from '../../../data/icons';

import styles from '../../Accounts/AccountForm/AccountForm.module.scss';

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
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '10px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#a8adb3',
          fontSize: '22px',
        },
      },
    },
  },
});

interface CategoryFormProps {
  type: TransactionType;
  drawerHandler: (type: string, anchor: Anchor) => void;
  category: ICategory | null;
}

export const CategoryForm = memo(({ type, drawerHandler, category }: CategoryFormProps) => {
  const iconName = iconsCategory.find((item) => item.id === category?.iconID)?.name;
  const colorName = colors.find((item) => item.id === category?.colorID)?.color;
  const { userData, changeUserData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [icon, setIcon] = useState(category && iconName ? iconName : 'shopping_cart');
  const [color, setColor] = useState(category && colorName ? colorName : '#f95c57');

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: `${category ? t(category.name) : ''}`,
    },
    validationSchema: object().shape({
      name: string().required(`${t('Required')}`),
    }),
    onSubmit: async (values) => {
      const newColorId = colors.find((item) => item.color === color)?.id;
      const newIconId = iconsCategory.find((item) => item.name === icon)?.id;
      if (newColorId && newIconId) {
        const categoryInfo = {
          id: category ? category.id : '',
          name: values.name,
          date: category ? category.date : Date.now(),
          type: type,
          colorID: newColorId,
          iconID: newIconId,
          description: '',
        };
        if (category) {
          await updateUserData(userData.userId, {
            categories: {
              [category.id]: categoryInfo,
            },
          });
        } else {
          await pushUserData(userData.userId, {
            categories: [categoryInfo],
          });
        }
        await changeUserData();
        drawerHandler('changeCategory', 'bottom');
      }
    },
  });

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const iconHandler = (icon: string) => setIcon(icon);
  const colorHandler = (color: string) => setColor(color);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.add}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.upper} style={{ backgroundColor: `${color}` }}>
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>{t(category ? category.name : 'New category')}</h2>
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
            <div className={styles.btnsWrapper}>
              {category ? (
                <div className={styles.categoriesBtnsWrapper}>
                  <SettingsBtn
                    icon='add'
                    color='#fec107'
                    title={t('Add transaction')}
                    onClick={() => {
                      alert('edit');
                    }}
                  />
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
                    drawerHandler('cancel', 'bottom');
                  }}
                />
              )}
            </div>
          </div>
        </form>
        <BasicModal openModal={openModal} handleClose={handleClose}>
          <BasicTabs
            firstChild={<Icons page={'categories'} color={'#fff'} iconHandler={iconHandler} />}
            secondChild={<Colors colorHandler={colorHandler} />}
          />
        </BasicModal>
        <BasicModal openModal={openModalDelete} handleClose={handleCloseModalDelete}>
          <DeleteCategory
            categoryId={category?.id}
            handleCloseModalDelete={handleCloseModalDelete}
            drawerHandler={drawerHandler}
          />
        </BasicModal>
      </div>
    </ThemeProvider>
  );
});
