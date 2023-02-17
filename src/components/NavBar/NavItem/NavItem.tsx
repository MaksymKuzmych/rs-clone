import { memo, useCallback, useState, useContext, useEffect } from 'react';
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

import { updateUserSettings } from '../../../firebase/update-user-settings';
import { AuthContext } from '../../../Auth/Auth';
import { Currency, Lang, Mode } from '../../../enums';

import styles from './NavItem.module.scss';

interface NavItemProps {
  icon: string;
  name: string;
  enumData: string[];
}

export const NavItem = memo(({ icon, name, enumData }: NavItemProps) => {
  const { userData, changeUserData } = useContext(AuthContext);

  const [param, setParam] = useState('EN');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    switch (name) {
      case 'Language':
        setParam(userData.settings.lang);
        break;
      case 'Mode':
        setParam(userData.settings.theme);
        break;
      case 'Currency':
        setParam(userData.settings.currency);
        break;
    }
  }, [name, userData.settings.currency, userData.settings.lang, userData.settings.theme]);

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;

      switch (target.name) {
        case 'Language':
          i18n.changeLanguage(event.target.value.toLowerCase());
          await updateUserSettings(userData.userId, { lang: event.target.value as Lang });
          break;
        case 'Mode':
          await updateUserSettings(userData.userId, { theme: event.target.value as Mode });
          break;
        case 'Currency':
          await updateUserSettings(userData.userId, {
            currency: event.target.value as Currency,
          });
          break;
      }

      changeUserData();
      setParam(event.target.value);
    },
    [changeUserData, i18n, userData.userId],
  );

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
        open={open}
        anchorEl={anchorEl}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          left: '50px',
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
});
