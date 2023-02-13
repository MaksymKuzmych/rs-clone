import { memo } from 'react';

import styles from './SettingsBtn.module.scss';

interface SettingsBtnProps {
  icon: string;
  color: string;
  title: string;
  onClick: () => void;
}

export const SettingsBtn = memo(({ icon, color, title, onClick }: SettingsBtnProps) => {
  return (
    <button className={styles.btn} onClick={onClick} type='button'>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}30` }}>
        <span className='material-icons' style={{ color: `${color}` }}>
          {icon}
        </span>
      </div>
      {title && <p className={styles.title}>{title}</p>}
    </button>
  );
});
