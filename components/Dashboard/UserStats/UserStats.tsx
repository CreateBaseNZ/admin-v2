import React from 'react';

import BasicDetails from './BasicDetails';

const UserStats = (props: any) => {
  return (
    <>
      <BasicDetails profile={props.profile} />
    </>
  );
};

export default UserStats;
