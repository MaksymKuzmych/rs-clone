import { periodTypes } from '../../../../data/periodTypes';
import { Period } from '../../../../enums';
import { IPeriodItem } from '../../../../interfaces';
import RangeItem from '../RangeItem/RangeItem';

import styles from './RangeModal.module.scss';

interface RangeModalProps {
  onClick(range: IPeriodItem): void;
  openCalendar(): void;
  openCalendarRange(): void;
  selectedPeriod: Period;
}

export default function RangeModal({
  onClick,
  openCalendar,
  openCalendarRange,
  selectedPeriod,
}: RangeModalProps) {
  return (
    <div className={styles.modalWrapper}>
      {periodTypes.map((item) => (
        <RangeItem
          onClick={onClick}
          openCalendar={openCalendar}
          openCalendarRange={openCalendarRange}
          period={item}
          key={item.name}
          selectedPeriod={selectedPeriod}
        />
      ))}
    </div>
  );
}
