import styles from './BasicButton.module.scss';

interface ButtonProps {
  icon: string;
  color: string;
  title: string;
  onClick?: () => void;
}

export const BasicButton = ({ icon, color, title, onClick = () => {} }: ButtonProps) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}30` }}>
        <span className='material-icons' style={{ color: `${color}` }}>
          {icon}
        </span>
      </div>
      {title && <p>{title}</p>}
    </div>
  );
};
