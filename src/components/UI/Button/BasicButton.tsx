import { memo } from 'react';

import styles from './BasicButton.module.scss';

interface ButtonProps {
  icon: string;
  color: string;
  title: string;
}

export const BasicButton = memo(({ icon, color, title }: ButtonProps) => {
  return (
    <div className={styles.btn}>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}30` }}>
        <span className='material-icons' style={{ color: `${color}` }}>
          {icon}
        </span>
      </div>
      {title && <p>{title}</p>}
    </div>
  );
});
