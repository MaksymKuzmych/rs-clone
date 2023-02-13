import { memo } from 'react';

import styles from './EditCategory.module.scss';

interface EditCategoryProps {
  iconAccount: string;
  iconCategory: string;
}

export const EditCategory = memo(({ iconAccount, iconCategory }: EditCategoryProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <div className={styles.account}>
          <span className='material-icons'>{iconAccount}</span>
        </div>
        <div className={styles.category}>
          <span className='material-icons'>{iconCategory}</span>
        </div>
      </div>
      <input></input>
    </div>
  );
});
