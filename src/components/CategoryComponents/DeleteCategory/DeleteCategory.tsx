import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { DrawerContext } from '../../../context/Drawer';
import { Theme, ThemeColor } from '../../../enums';
import { deleteUserData } from '../../../firebase/delete-user-data';

import styles from './DeleteCategory.module.scss';

interface DeleteCategoryProps {
  handleCloseModalDelete(): void;
  categoryId: string | undefined;
}

export const DeleteCategory = ({ categoryId, handleCloseModalDelete }: DeleteCategoryProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { drawerHandler } = useContext(DrawerContext);

  const { t } = useTranslation();

  const transactions = userData.data.transactions;

  const transactionsWithThisCategory = transactions.filter(
    (transaction) => transaction.category === categoryId,
  );

  const deleteCategory = async () => {
    if (categoryId) {
      await deleteUserData(userData.settings.userId, { categories: categoryId });
    }
    if (transactionsWithThisCategory.length) {
      transactionsWithThisCategory.forEach(async (item) => {
        await deleteUserData(userData.settings.userId, { transactions: item.id });
      });
    }

    await changeUserData();
    drawerHandler('deleteCategory', 'bottom', false);
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor:
          userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
      }}
    >
      <p className={styles.content}>
        {t('All transactions')} ( {transactionsWithThisCategory.length} ){' '}
        {t('associated with the category will be deleted')}.
      </p>
      <p className={styles.content}>{t('The category cannot be restored')}.</p>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={handleCloseModalDelete}>
          {t('Cancel')}
        </button>
        <button className={styles.delete} onClick={deleteCategory}>
          {t('Delete')}
        </button>
      </div>
    </div>
  );
};
