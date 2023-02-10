import { memo, useEffect, useState } from 'react';

import { colors as colorsData } from '../../../data/colors';

import styles from './Colors.module.scss';

interface ColorsProps {
  colorHandler: (color: string) => void;
}

export const Colors = memo(({ colorHandler }: ColorsProps) => {
  const [colors, setColors] = useState(colorsData);

  useEffect(() => {
    setColors(colorsData);
  }, []);

  return (
    <div className={styles.wrapper}>
      {colors.map((el) => (
        <button
          onClick={() => {
            colorHandler(el.color);
          }}
          key={el.id}
          className={styles.btn}
        >
          <div className={styles.colorBtn} style={{ backgroundColor: `${el.color}` }}></div>
        </button>
      ))}
    </div>
  );
});
