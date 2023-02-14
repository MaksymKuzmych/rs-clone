import { useEffect, useState } from 'react';

import { iconsCard, iconsCategory } from '../../../data/icons';

import styles from './Icons.module.scss';

interface IconsProps {
  page: string;
  color: string;
  iconHandler: (icon: string) => void;
}

export const Icons = ({ page, color, iconHandler }: IconsProps) => {
  const [icons, setIcons] = useState(iconsCard);

  useEffect(() => {
    setIcons(page === 'accounts' ? iconsCard : iconsCategory);
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
          <span className='material-icons' style={{ color: `${color}` }}>
            {el.name}
          </span>
        </button>
      ))}
    </div>
  );
};
