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
import { Form } from 'react-bootstrap';

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

const LastActive = (props: any) => {
  const [title, setTitle] = useState('Loading Chart');
  const [enteredDays, setEnteredDays] = useState(7);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataset[]>([
    { label: 'Active Users', data: [0] },
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const daysChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredDays(+event.target.value);
  };

  useEffect(() => {
    const newLabels: string[] = [];
    for (let i = 0; i < enteredDays; i++) {
      const label = moment().subtract(i, 'days').format('ddd, D MMM');
      newLabels.unshift(label);
    }
    setLabels(newLabels);
    const newData: number[] = [];
    for (let i = 0; i < newLabels.length; i++) {
      newData[i] = 0;
      for (let j = 0; j < props.profiles.length; j++) {
        const profile = props.profiles[j];
        const lastVisit = moment(profile.date.visited).format('ddd, D MMM');
        if (newLabels[i] === lastVisit) newData[i]++;
      }
    }
    setTitle(
      `${newData.reduce(
        (partialSum: number, a: number) => partialSum + a,
        0
      )} active users for the past ${labels.length} days`
    );
    setDatasets([{ label: 'Active Users', data: newData }]);
  }, [props.profiles, enteredDays]);

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
        data={{ labels, datasets }}
      />
    </div>
  );
};

export default LastActive;
