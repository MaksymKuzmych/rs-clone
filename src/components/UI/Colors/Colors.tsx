import { memo, useContext, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { colors as colorsData } from '../../../data/colors';
import { Theme, ThemeColor } from '../../../enums';

import styles from './Colors.module.scss';

interface ColorsProps {
  colorHandler: (color: string) => void;
}

export const Colors = memo(({ colorHandler }: ColorsProps) => {
  const { userData } = useContext(AuthContext);

  const [colors, setColors] = useState(colorsData);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setColors(colorsData);
  }, []);

  const colorsLayout = useMemo(
    () =>
      colors.map((el) => (
        <button
          onClick={() => {
            colorHandler(el.color);
            setActive(el.id);
          }}
          key={el.id}
          className={active === el.id ? styles.active : styles.btn}
          style={{
            borderColor:
              active === el.id && userData.settings.theme === Theme.Light
                ? ThemeColor.Dark
                : active === el.id && userData.settings.theme === 'Dark'
                ? ThemeColor.Light
                : 'transparent',
          }}
        >
          <div className={styles.colorBtn} style={{ backgroundColor: `${el.color}` }}></div>
        </button>
      )),
    [active, colorHandler, colors, userData.settings.theme],
  );

  return <div className={styles.wrapper}>{colorsLayout}</div>;
});
