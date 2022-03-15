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
import moment from 'moment';

type IDataset = {
  label: string;
  data: number[];
};

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
      text: 'Chart.js Bar Chart',
    },
  },
};

const LastActive = (props: any) => {
  const [labels, setLabels] = useState<string[]>([
    moment().subtract(1, 'days').format('ddd, D MMM'),
  ]);
  const [datasets, setDatasets] = useState<IDataset[]>([
    { label: 'Active Users', data: [0] },
  ]);

  const daysChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabels: string[] = [];
    for (let i = 0; i < +event.target.value; i++) {
      const label = moment().subtract(i, 'days').format('ddd, D MMM');
      newLabels.unshift(label);
    }
    setLabels(newLabels);
  };

  useEffect(() => {
    const newData: number[] = [];
    for (let i = 0; i < labels.length; i++) {
      newData[i] = 0;
      for (let j = 0; j < props.profiles.length; j++) {
        const profile = props.profiles[j];
        let skip = false;
        for (let k = 0; k < profile.licenses.length; k++) {
          const license = profile.licenses[k];
          if (license.group.name === 'CreateBase School') skip = true;
        }
        if (skip) continue;
        const lastVisit = moment(profile.date.visited).format('ddd, D MMM');
        console.log(lastVisit);
        if (labels[i] === lastVisit) newData[i]++;
      }
    }
    setDatasets([{ label: 'Active Users', data: newData }]);
  }, [labels, props.profiles]);

  return (
    <div>
      <input
        type="number"
        min="1"
        max="28"
        step="1"
        defaultValue="1"
        onChange={daysChangeHandler}
      />
      <Bar options={options} data={{ labels, datasets }} />
    </div>
  );
};

export default LastActive;
