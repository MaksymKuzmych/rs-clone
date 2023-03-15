import { memo } from 'react';

import { periodTypes } from '../../../../data/periodTypes';
import { Period, Theme, ThemeColor } from '../../../../enums';
import { IPeriodItem } from '../../../../interfaces';
import { RangeItem } from '../RangeItem/RangeItem';

import styles from './RangeModal.module.scss';

interface RangeModalProps {
  onClick: (range: IPeriodItem) => void;
  openCalendar: () => void;
  openCalendarRange: () => void;
  selectedPeriod: Period;
  theme: Theme;
}

export const RangeModal = memo(
  ({ onClick, openCalendar, openCalendarRange, selectedPeriod, theme }: RangeModalProps) => {
    return (
      <div
        className={styles.modalWrapper}
        style={{
          color: theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
        }}
      >
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
  },
);
