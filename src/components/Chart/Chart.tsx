import styles from './Chart.module.scss';
import DonutChart from 'react-donut-chart';

export const Chart = (props: props) => {
  return (
    <div className={styles.chartWrapper}>
      <DonutChart
        data={props.dataChart}
        colors={['#4154b0', '#1154b0', '#8154b0']}
        legend={false}
      />
      <div className={styles.chartInfo}>
        <div>Расходы</div>
        <div className={styles.totalExpenses}>500</div>
        <div className={styles.totalIncome}>700</div>
      </div>
    </div>
  );
};

export type IChartItem = {
  value: number;
  label: string;
  isEmpty?: boolean;
};

export type IChart = IChartItem[];

interface props {
  dataChart: IChartItem[];
}
