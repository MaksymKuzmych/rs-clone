import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../Auth/Auth';
import { deleteUserData } from '../../../firebase/delete-user-data';
import { Anchor } from '../../../types';

import styles from './DeleteCategory.module.scss';

interface DeleteCategoryProps {
  handleCloseModalDelete(): void;
  drawerHandler(type: string, anchor: Anchor): void;
  categoryId: string | undefined;
}

export const DeleteCategory = ({
  categoryId,
  handleCloseModalDelete,
  drawerHandler,
}: DeleteCategoryProps) => {
  const { userData, changeUserData } = useContext(AuthContext);
  const transactions = userData.data.transactions;

  const transactionsWithThisCategory = transactions.filter(
    (transaction) => transaction.category === categoryId,
  );

  async function deleteCategory() {
    if (categoryId) {
      await deleteUserData(userData.userId, { categories: categoryId });
    }
    if (transactionsWithThisCategory.length) {
      transactionsWithThisCategory.forEach(async (item) => {
        await deleteUserData(userData.userId, { transactions: item.id });
      });
    }
    await changeUserData();
    handleCloseModalDelete();
    drawerHandler('deleteCategory', 'bottom');
  }
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p className={styles.content}>
        {t('All transactions')} ({transactionsWithThisCategory.length})
        {t('associated with the category will be deleted')}.
      </p>
      <p className={styles.content}>{t('The category cannot be restored')}.</p>
      <div className={styles.buttons}>
        <button
          className={styles.cancelBtn}
          onClick={() => {
            handleCloseModalDelete();
          }}
        >
          {t('Cancel')}
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            deleteCategory();
          }}
        >
          {t('Delete')}
        </button>
      </div>
    </div>
  );
};
