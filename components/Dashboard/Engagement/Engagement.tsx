import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import TrackingsContext from '../../../store/trackings-context';
import BarGraph from '../../Analytics/BarGraph';

const Engagement = () => {
  const [minMinutes, setMinMinutes] = useState<number>(5);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [consolidatedTrackingsArray, setConsolidatedTrackingsArray] = useState<
    any[]
  >([]);
  const [title, setTitle] = useState(
    'Number of Daily Engaged Users (spent at least 5 mins.)'
  );

  const { trackings } = useContext(TrackingsContext);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinMinutes(Math.floor(+event.target.value));
  };

  useEffect(() => {
    let timestampRange = [
      Date.parse(moment().format('DD MMMM YYYY')),
      Date.now() + 1,
    ];
    const newLabels: string[] = [];
    const newConsolidatedTrackingsArray: any[] = [];
    while (true) {
      newLabels.unshift(moment(timestampRange[0]).format("ddd, DD MMM 'YY"));
      // Filter data to include within timestamp range
      const filteredTrackings = trackings.filter(
        (tracking: any) =>
          timestampRange[0] <= tracking.timestamp &&
          tracking.timestamp < timestampRange[1]
      );
      // Get unique profile IDs
      const profileIds = [
        ...new Set(filteredTrackings.map((tracking: any) => tracking.profile)),
      ];
      // Get the number of engaged users
      const newConsolidatedTrackings: number[] = [];
      for (let i = 0; i < profileIds.length; i++) {
        const profileId = profileIds[i];
        const profileTrackings = filteredTrackings.filter(
          (tracking: any) => tracking.profile === profileId
        );
        newConsolidatedTrackings.push(
          profileTrackings
            .map((tracking: any) =>
              isNaN(+tracking.duration) ? 0 : +tracking.duration
            )
            .reduce((partialSum: number, a: number) => partialSum + a, 0)
        );
      }
      newConsolidatedTrackingsArray.push(newConsolidatedTrackings);
      // Prepare for the next iteration
      if (
        !trackings.filter(
          (tracking: any) => tracking.timestamp < timestampRange[0]
        ).length
      )
        break;
      timestampRange = [timestampRange[0] - 86400000, timestampRange[0]];
    }
    setLabels(newLabels);
    setConsolidatedTrackingsArray(newConsolidatedTrackingsArray);
  }, [trackings]);

  useEffect(() => {
    const newData: any[] = [];
    for (let i = 0; i < consolidatedTrackingsArray.length; i++) {
      const consolidatedTrackings: number[] = consolidatedTrackingsArray[i];
      const numberOfEngagedUsers = consolidatedTrackings.filter(
        (consolidatedTracking: number) =>
          consolidatedTracking >= minMinutes * 60
      ).length;
      newData.unshift(numberOfEngagedUsers);
    }
    setTitle(
      `Number of Daily Engaged Users (spent at least ${minMinutes} mins.)`
    );
    setData(newData);
  }, [minMinutes, consolidatedTrackingsArray]);

  return (
    <div>
      <Form.Control
        type="number"
        min={1}
        max={60}
        step={1}
        defaultValue={minMinutes}
        onChange={onChangeHandler}
        style={{ width: '70px' }}
        className="m-4"
      />
      <BarGraph
        labels={labels}
        data={data}
        label={'Number of Engaged Users'}
        default={7}
        title={title}
      />
    </div>
  );
};

export default Engagement;
