import React, { useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = (props: any) => {
  const [noOfData, setNoOfData] = useState(props.default ? props.default : '1');

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.title ? props.title : 'A Bar Graph',
      },
    },
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoOfData(Math.floor(+event.target.value));
  };

  return (
    <>
      <Form.Control
        type="number"
        min={props.min ? props.min : '1'}
        max={props.max ? props.max : null}
        step={props.step ? props.step : '1'}
        defaultValue={noOfData}
        onChange={onChangeHandler}
        style={{ width: '70px' }}
        className="m-4"
      />
      <Bar
        className="px-5 py-3"
        options={options}
        data={{
          labels: props.labels.slice(props.labels.length - noOfData),
          datasets: [
            {
              label: props.label,
              data: props.data.slice(props.data.length - noOfData),
            },
          ],
        }}
      />
    </>
  );
};

export default BarGraph;
