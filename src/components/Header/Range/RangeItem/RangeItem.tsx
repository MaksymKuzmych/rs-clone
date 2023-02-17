import { useTranslation } from 'react-i18next';
import { iconsCalendar } from '../../../../data/icons';
import { Period } from '../../../../enums';
import { IPeriodItem } from '../../../../interfaces';
import styles from './RangeItem.module.scss';

interface RangeItemProps {
  handleClose(): void;
  period: IPeriodItem;
  selectedPeriod: Period;
}

export default function RangeItem({ handleClose, period, selectedPeriod }: RangeItemProps) {
  const { t } = useTranslation();

  const activePeriod = selectedPeriod === period.type ? true : false;

  return (
    <div className={activePeriod ? `${styles.rangeItem} ${styles.active}` : styles.rangeItem}>
      <span className={`material-icons ${styles.iconButton}`}>
        {iconsCalendar.find((icon) => icon.id === period.iconID)?.name}
      </span>
      <div>{period.name}</div>
    </div>
  );
}
