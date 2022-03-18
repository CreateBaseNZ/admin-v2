import React, { useContext } from 'react';

import './Dashboard.module.scss';

import LastActive from './LastActive';
import UsersStats from './UserStats/UsersStats';

import NetProjectTime from './NetProjectTime';
import DailyProjectTime from './UserStats/DailyProjectTime';
import WeeklyProjectTime from './WeeklyProjectTime';
import ProfilesContext from '../../store/profiles-context';
import TrackingsContext from '../../store/trackings-context';

const Dashboard = () => {
  const { profiles } = useContext(ProfilesContext);
  const { trackings } = useContext(TrackingsContext);

  return (
    <>
      <NetProjectTime trackings={trackings} />
      <LastActive profiles={profiles} />
      <DailyProjectTime trackings={trackings} />
      <WeeklyProjectTime trackings={trackings} />
      <UsersStats profiles={profiles} trackings={trackings} />
    </>
  );
};

export default Dashboard;
