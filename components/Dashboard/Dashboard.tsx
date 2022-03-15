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

  useEffect(() => {
    axios
      .post<IData>('/api/fetch-profiles')
      .then((data) => {
        setProfiles(data.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <LastActive profiles={profiles} />
      <UsersStats profiles={profiles} />
    </>
  );
};

export default Dashboard;
