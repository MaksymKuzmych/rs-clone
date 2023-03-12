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
import { Button } from '@mui/material';

import { updateUserSettings } from '../../../firebase/update-user-settings';
import { AuthContext } from '../../../Auth/Auth';
import { Currency, Lang, Theme, ThemeColor } from '../../../enums';
import { BasicModal } from '../../UI/Modal/Modal';

import styles from './NavItem.module.scss';

interface NavItemProps {
  icon: string;
  name: string;
  enumData: string[];
}

export const NavItem = memo(({ icon, name, enumData }: NavItemProps) => {
  const { userData, changeUserSettings } = useContext(AuthContext);

  const [param, setParam] = useState('EN');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const handleCloseModal = useCallback(() => setOpenModal(false), []);

  const { t, i18n } = useTranslation();

  const open = Boolean(anchorEl);

  useEffect(() => {
    switch (name) {
      case 'Language':
        setParam(userData.settings.lang);
        break;
      case 'Theme':
        setParam(userData.settings.theme);
        break;
      case 'Currency':
        setParam(userData.settings.currency);
        break;
    }
  }, [name, userData.settings.currency, userData.settings.lang, userData.settings.theme]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setAnchorEl(event.currentTarget);
      if (name === 'Currency') {
        handleOpenModal();
      }
    },
    [handleOpenModal, name],
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;

      switch (target.name) {
        case 'Language':
          i18n.changeLanguage(event.target.value.toLowerCase());
          await updateUserSettings(userData.settings.userId, { lang: event.target.value as Lang });
          break;
        case 'Theme':
          await updateUserSettings(userData.settings.userId, {
            theme: event.target.value as Theme,
          });
          break;
        case 'Currency':
          await updateUserSettings(userData.settings.userId, {
            currency: event.target.value as Currency,
          });
          break;
      }

      await changeUserSettings();
      setParam(event.target.value);
    },
    [changeUserSettings, i18n, userData.settings.userId],
  );

  return (
    <>
      <div className={styles.navItem}>
        <ListItem
          onClick={(event) => {
            handleClick(event);
          }}
        >
          <ListItemIcon>
            <span
              className='material-icons'
              style={{
                color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              }}
            >
              {icon}
            </span>
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
              sx={{
                padding: '15px',
              }}
            >
              <FormLabel component='legend'>{t(`${name}`)}</FormLabel>
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
      <BasicModal openModal={openModal} handleClose={handleCloseModal}>
        <div className={styles.modalWrapper}>
          <p
            className={styles.modalContent}
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
            }}
          >
            {t(
              'Changing the currency will not recalculate existing transactions at the rate, but only change the display of the currency icon.',
            )}
          </p>
          <Button color='primary' onClick={handleCloseModal} className={styles.modalBtn}>
            {t('Accept')}
          </Button>
        </div>
      </BasicModal>
    </>
  );
});
