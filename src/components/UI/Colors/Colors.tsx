import { memo, useEffect, useMemo, useState } from 'react';

import { colors as colorsData } from '../../../data/colors';

import styles from './Colors.module.scss';

interface ColorsProps {
  colorHandler: (color: string) => void;
}

export const Colors = memo(({ colorHandler }: ColorsProps) => {
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
        >
          <div className={styles.colorBtn} style={{ backgroundColor: `${el.color}` }}></div>
        </button>
      )),
    [active, colorHandler, colors],
  );

  return <div className={styles.wrapper}>{colorsLayout}</div>;
});
