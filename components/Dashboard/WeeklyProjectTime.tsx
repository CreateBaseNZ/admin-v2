import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Weekly Net Project Time',
    },
  },
};

const WeeklyProjectTime = (props: any) => {
  const [enteredDays, setEnteredDays] = useState(7);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  const daysChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredDays(+event.target.value);
  };

  useEffect(() => {
    let timestampRange = [
      Date.parse(moment().startOf('isoWeek').format('DD MMMM YYYY')),
      Date.now() + 1,
    ];
    console.log();
    if (!(props.trackings ? (props.trackings.length ? true : false) : false))
      return;
    const newLabels: string[] = [];
    const newData: any[] = [];
    while (true) {
      newLabels.unshift(
        `Week Starting ${moment(timestampRange[0]).format("DD MMM 'YY")}`
      );
      const filteredTrackings = props.trackings.filter(
        (tracking: any) =>
          timestampRange[0] <= tracking.timestamp &&
          tracking.timestamp < timestampRange[1]
      );
      const netTime = filteredTrackings
        .map((tracking: any) =>
          isNaN(+tracking.duration) ? 0 : +tracking.duration
        )
        .reduce((partialSum: number, a: number) => partialSum + a, 0);
      newData.unshift(netTime / 3600);
      // Prepare for the next iteration
      if (
        !props.trackings.filter(
          (tracking: any) => tracking.timestamp < timestampRange[0]
        ).length
      )
        break;
      timestampRange = [timestampRange[0] - 86400000 * 7, timestampRange[0]];
    }
    setLabels(newLabels);
    setData(newData);
  }, [props.trackings]);

  return (
    <div>
      <Form.Control
        type="number"
        min="1"
        max={7 * 26}
        step="1"
        defaultValue={enteredDays}
        onChange={daysChangeHandler}
        style={{ width: '70px' }}
        className="m-4"
      />
      <Bar
        className="px-5 py-3"
        options={options}
        data={{
          labels: labels.slice(labels.length - enteredDays),
          datasets: [
            {
              label: 'Net Project Time',
              data: data.slice(data.length - enteredDays),
            },
          ],
        }}
      />
    </div>
  );
};

export default WeeklyProjectTime;
