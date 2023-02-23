import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultNames } from '../../../data/defaultNames';
import { IAccount, ICategory } from '../../../interfaces';
import { BasicModal } from '../../UI/Modal/Modal';
import { FromAccount } from './FromAccount/FromAccount';
import { ToCategory } from './ToCategory/ToCategory';
import styles from './Transfer.module.scss';

interface TransferProps {
  text: string;
  account?: IAccount | null;
  category?: ICategory | null;
}

export const Transfer = memo(({ text, account, category }: TransferProps) => {
  const { t } = useTranslation();

  const [activeAccount, setActiveAccount] = useState(account);
  const [activeCategory, setActiveCategory] = useState(category);
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

  const changeAccount = (account: IAccount) => {
    toggleModal();
    setActiveAccount(account);
  };

  const changeCategory = (category: ICategory | null) => {
    toggleModal();
    setActiveCategory(category);
  };

  const name = activeAccount ? activeAccount.name : activeCategory ? activeCategory.name : null;

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: activeAccount ? activeAccount?.color : activeCategory?.color }}
      onClick={toggleModal}
    >
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        <p className={styles.name}>{name && defaultNames.includes(name) ? t(name) : name}</p>
      </div>
      <div
        className={
          activeAccount ? styles.iconWrapper : `${styles.iconWrapper} ${styles.iconWrapperCategory}`
        }
      >
        <span
          className='material-icons'
          style={{ color: activeAccount ? activeAccount?.color : activeCategory?.color }}
        >
          {activeAccount ? activeAccount?.icon : activeCategory?.icon}
        </span>
      </div>
      <BasicModal openModal={openModal} handleClose={toggleModal}>
        {activeAccount ? (
          <FromAccount changeAccount={changeAccount} activeAccount={activeAccount?.id} />
        ) : activeCategory ? (
          <ToCategory changeCategory={changeCategory} activeCategory={activeCategory?.id} />
        ) : null}
      </BasicModal>
    </div>
  );
});
