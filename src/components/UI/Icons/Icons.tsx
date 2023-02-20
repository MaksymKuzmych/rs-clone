import { memo, useEffect, useMemo, useState, useContext } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { iconsCard, iconsCategory } from '../../../data/icons';
import { Theme, ThemeColor } from '../../../enums';

import styles from './Icons.module.scss';

interface IconsProps {
  page: string;
  iconHandler: (icon: string) => void;
}

export const Icons = memo(({ page, iconHandler }: IconsProps) => {
  const { userData } = useContext(AuthContext);

  const [icons, setIcons] = useState(iconsCard);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setIcons(page === 'accounts' ? iconsCard : iconsCategory);
  }, [page]);

  const iconsLayout = useMemo(
    () =>
      icons.map((el) => (
        <button
          onClick={() => {
            iconHandler(el.name);
            setActive(el.id);
          }}
          key={el.id}
          className={styles.btn}
        >
          <span
            className='material-icons'
            style={{
              color:
                active === el.id && userData.settings.theme === Theme.Light
                  ? ThemeColor.Dark
                  : active === el.id && userData.settings.theme === 'Dark'
                  ? ThemeColor.Light
                  : '#7f7f7f',
            }}
          >
            {el.name}
          </span>
        </button>
      )),
    [active, iconHandler, icons, userData.settings.theme],
  );

  return <div className={styles.wrapper}>{iconsLayout}</div>;
});
