import React from 'react';

import BasicDetails from './BasicDetails';
import ProjectsEngagement from './ProjectsEngagement';

const UserStats = (props: any) => {
  return (
    <div>
      <BasicDetails profile={props.profile} />
      <ProjectsEngagement
        profileId={props.profile._id}
        trackings={props.trackings}
      />
    </div>
  );
};

export default UserStats;
