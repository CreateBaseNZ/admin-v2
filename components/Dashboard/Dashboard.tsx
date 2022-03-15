import React, { useState, useEffect } from 'react';

import './Dashboard.module.scss';

import LastActive from './LastActive';
import UsersStats from './UserStats/UsersStats';

import axios from 'axios';

type IData = {
  status: string;
  content: Array<any>;
};

const Dashboard = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [trackings, setTrackings] = useState<any[]>([]);

  useEffect(() => {
    axios
      .post<IData>('/api/fetch-profiles')
      .then((data) => {
        console.log(data.data.content);
        setProfiles(data.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .post<IData>('/api/fetch-trackings')
      .then((data) => {
        console.log(data);
        setTrackings(data.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <LastActive profiles={profiles} />
      <UsersStats profiles={profiles} trackings={trackings} />
    </>
  );
};

export default Dashboard;
