import { TextField } from '@mui/material';
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

import { colors } from '../../data/colors';
import { TransactionType } from '../../enums';
import { ICategory } from '../../interfaces';
import { iconsCategory } from '../../data/icons';
import { defaultNames } from '../../data/defaultNames';
import { DrawerContext } from '../../context/Drawer';

import styles from './Forms.module.scss';

interface CategoryFormProps {
  type: TransactionType;
  category: ICategory | null;
}

export const CategoryForm = memo(({ type, category }: CategoryFormProps) => {
  const iconName = iconsCategory.find((item) => item.id === category?.iconID)?.name;
  const colorName = colors.find((item) => item.id === category?.colorID)?.color;

  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const [icon, setIcon] = useState(category && iconName ? iconName : 'shopping_cart');
  const [color, setColor] = useState(category && colorName ? colorName : '#f95c57');
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

        changeUserData();
        drawerHandler('changeCategory', 'bottom', false);
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
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
        <div className={styles.innerWrapper}>
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
                  drawerHandler('cancel', 'bottom', false);
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
