import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  const { t } = useTranslation();

  return <h1 className={styles.notFound}>{t('Page Not Found')}</h1>;
};
