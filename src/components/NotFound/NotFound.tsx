import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../Auth/Auth';
import { ThemeColor } from '../../enums';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  const { userData } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <h1
      className={styles.notFound}
      style={{
        color: userData.settings.theme === 'Light' ? ThemeColor.Dark : ThemeColor.Light,
        backgroundColor: userData.settings.theme === 'Light' ? ThemeColor.Light : ThemeColor.Dark,
      }}
    >
      {t('Page Not Found')}
    </h1>
  );
};
