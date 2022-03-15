import React from 'react';

const ProjectEngagement = (props: any) => {
  const totalDuration = props.trackings
    .map((tracking: any) =>
      isNaN(+tracking.duration) ? 0 : +tracking.duration
    )
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

  return <div>{`${props.project}: ${totalDuration} seconds`}</div>;
};

export default ProjectEngagement;
