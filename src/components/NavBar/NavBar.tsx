import styles from './NavBar.module.scss';
import { useTranslation } from 'react-i18next';
// import { makeStyles } from '@material-ui/core/styles';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Collapse from '@material-ui/core/Collapse';

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navHeader}>
        <div className={styles.userInfo}>
          <div className={styles.userAva}>
            <span className='material-icons'>face</span>
          </div>
          <div className={styles.userName}>User</div>
        </div>
        <button className={styles.logOut}>{t('Log Out')}</button>
      </div>
    </nav>
  );
};
