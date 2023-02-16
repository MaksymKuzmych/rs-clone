import { memo, useEffect, useMemo, useState } from 'react';

import { iconsCard, iconsCategory } from '../../../data/icons';

import styles from './Icons.module.scss';

interface IconsProps {
  page: string;
  iconHandler: (icon: string) => void;
}

export const Icons = memo(({ page, iconHandler }: IconsProps) => {
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
          className={active === el.id ? styles.active : styles.btn}
        >
          <span
            className='material-icons'
            style={{ color: active === el.id ? 'white' : '#a8adb3' }}
          >
            {el.name}
          </span>
        </button>
      )),
    [active, iconHandler, icons],
  );

  return <div className={styles.wrapper}>{iconsLayout}</div>;
});
