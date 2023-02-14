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

  async function deleteCategory() {
    if (categoryId) {
      await deleteUserData(userData.userId, { categories: categoryId });
    }
    await changeUserData();
    handleCloseModalDelete();
    drawerHandler('deleteCategory', 'bottom');
  }
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p className={styles.content}>
        {t('All transactions associated with the category will be deleted')}.
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
