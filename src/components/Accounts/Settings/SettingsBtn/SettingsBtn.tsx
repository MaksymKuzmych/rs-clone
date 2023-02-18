import { memo, useState, useContext, useCallback } from 'react';

import { AuthContext } from '../../../../Auth/Auth';
import { ThemeColor } from '../../../../enums';

import styles from './SettingsBtn.module.scss';

interface SettingsBtnProps {
  icon: string;
  color: string;
  title: string;
  onClick: () => void;
}

export const SettingsBtn = memo(({ icon, color, title, onClick }: SettingsBtnProps) => {
  const { userData } = useContext(AuthContext);

  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => setHover(true), []);

  const handleMouseLeave = useCallback(() => setHover(false), []);

  return (
    <button
      className={styles.btn}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type='button'
      style={{
        color:
          hover && userData.settings.theme === 'Light'
            ? ThemeColor.Dark
            : hover && userData.settings.theme === 'Dark'
            ? ThemeColor.Light
            : '#7f7f7f',
      }}
    >
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}30` }}>
        <span className='material-icons' style={{ color: `${color}` }}>
          {icon}
        </span>
      </div>
      {title && <p className={styles.title}>{title}</p>}
    </button>
  );
});
