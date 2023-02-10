import { useEffect, useState } from 'react';

import { iconsCard } from '../../../data/icons';

import styles from './Icons.module.scss';

interface IconsProps {
  iconHandler: (icon: string) => void;
}

export const Icons = ({ iconHandler }: IconsProps) => {
  const [icons, setIcons] = useState(iconsCard);

  useEffect(() => {
    setIcons(iconsCard);
  }, []);

  return (
    <div className={styles.wrapper}>
      {icons.map((el) => (
        <button
          onClick={() => {
            iconHandler(el.name);
          }}
          key={el.id}
          className={styles.btn}
        >
          <span className='material-icons' style={{ color: `#fff` }}>
            {el.name}
          </span>
        </button>
      ))}
    </div>
  );
};
