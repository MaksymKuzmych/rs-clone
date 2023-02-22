import { useTranslation } from 'react-i18next';

import { Period } from '../../../../enums';
import { IPeriodItem } from '../../../../interfaces';

import styles from './RangeItem.module.scss';

interface RangeItemProps {
  onClick(range: IPeriodItem): void;
  openCalendar(): void;
  openCalendarRange(): void;
  period: IPeriodItem;
  selectedPeriod: Period;
}

export const RangeItem = ({
  onClick,
  openCalendar,
  openCalendarRange,
  period,
  selectedPeriod,
}: RangeItemProps) => {
  const { t } = useTranslation();

  const activePeriod = selectedPeriod === period.type ? true : false;

  return (
    <div
      className={activePeriod ? `${styles.rangeItem} ${styles.active}` : styles.rangeItem}
      onClick={() => {
        switch (period.type) {
          case Period.Day:
            return openCalendar();
          case Period.Range:
            return openCalendarRange();
          default:
            onClick(period);
        }
      }}
    >
      <span className={`material-icons ${styles.iconButton}`}>{period.icon}</span>
      <div>{t(period.name)}</div>
    </div>
  );
};
