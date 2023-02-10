import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink } from 'react-router-dom';

import styles from './NavLinkItem.module.scss';

interface NavLinkItemProps {
  path: string;
  name: string;
}

export const NavLinkItem = ({ path, name }: NavLinkItemProps) => {
  return (
    <ListItem className={styles.linkButton}>
      <ListItemIcon>
        <span className='material-icons'>face</span>
      </ListItemIcon>
      <NavLink to={path} className={styles.link}>
        {name}
      </NavLink>
    </ListItem>
  );
};
