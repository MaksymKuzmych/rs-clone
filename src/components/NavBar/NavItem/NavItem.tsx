import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import styles from './NavItem.module.scss';

interface NavItemProps {
  icon: string;
  name: string;
  enumData: string[];
}

export const NavItem = ({ icon, name, enumData }: NavItemProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const [param, setParam] = useState(enumData[0]);

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParam(event.target.value);
  };
  return (
    <div className={styles.navItem}>
      <ListItem
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <ListItemIcon>
          <span className='material-icons'>{icon}</span>
        </ListItemIcon>
        <div>
          <ListItemText primary={t(`${name}`)} />
          <div className={styles.value}>{t(`${param}`)}</div>
        </div>
      </ListItem>
      <Menu
        id='simple-menu'
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          top: 100,
          left: 30,
        }}
      >
        <div className={styles.paper}>
          <FormControl
            component='fieldset'
            className={styles.menuWrapper}
            sx={{
              padding: '15px',
            }}
          >
            <FormLabel
              component='legend'
              className={styles.menuTitle}
              sx={{
                color: 'black',
              }}
            >
              {t(`${name}`)}
            </FormLabel>
            <RadioGroup
              aria-label={name}
              name={name}
              value={param}
              onChange={(event) => {
                handleChange(event);
              }}
            >
              {enumData.map((item) => (
                <FormControlLabel
                  value={item}
                  control={<Radio color={'primary'} />}
                  label={t(`${item}`)}
                  key={item}
                  sx={{
                    padding: '10px',
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </Menu>
    </div>
  );
};
