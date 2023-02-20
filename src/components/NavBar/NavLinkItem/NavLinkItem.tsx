import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { memo, useCallback, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../enums';

import styles from './NavLinkItem.module.scss';

interface NavLinkItemProps {
  path: string;
  name: string;
  src: string;
}

export const NavLinkItem = memo(({ path, name, src }: NavLinkItemProps) => {
  const { userData } = useContext(AuthContext);

  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => setHover(true), []);
  const handleMouseLeave = useCallback(() => setHover(false), []);

  return (
    <ListItem className={styles.linkButton}>
      <ListItemIcon>
        <img className={styles.icon} src={src} alt='icon' />
      </ListItemIcon>
      <NavLink
        to={path}
        className={styles.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: hover
            ? '#5c6ac2'
            : userData.settings.theme === Theme.Light
            ? ThemeColor.Dark
            : ThemeColor.Light,
        }}
      >
        {name}
      </NavLink>
    </ListItem>
  );
});
