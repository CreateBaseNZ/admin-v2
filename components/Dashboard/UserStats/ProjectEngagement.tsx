import React from 'react';

function secondsToHms(d: any) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + 'h ' : '';
  const mDisplay = m > 0 ? m + 'm ' : '';
  const sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
}

const ProjectEngagement = (props: any) => {
  const totalDuration = secondsToHms(
    props.trackings
      .map((tracking: any) =>
        isNaN(+tracking.duration) ? 0 : +tracking.duration
      )
      .reduce((partialSum: number, a: number) => partialSum + a, 0)
  );

  const totalDefineDuration = secondsToHms(
    props.trackings
      .filter((tracking: any) => tracking.event === 'project_define')
      .map((tracking: any) =>
        isNaN(+tracking.duration) ? 0 : +tracking.duration
      )
      .reduce((partialSum: number, a: number) => partialSum + a, 0)
  );

  const totalImagineDuration = secondsToHms(
    props.trackings
      .filter((tracking: any) => tracking.event === 'project_imagine')
      .map((tracking: any) =>
        isNaN(+tracking.duration) ? 0 : +tracking.duration
      )
      .reduce((partialSum: number, a: number) => partialSum + a, 0)
  );

  const totalCreateDuration = secondsToHms(
    props.trackings
      .filter(
        (tracking: any) =>
          tracking.event.includes('project_create') ||
          tracking.event === 'code_create_time'
      )
      .map((tracking: any) =>
        isNaN(+tracking.duration) ? 0 : +tracking.duration
      )
      .reduce((partialSum: number, a: number) => partialSum + a, 0)
  );

  const totalImproveDuration = secondsToHms(
    props.trackings
      .filter(
        (tracking: any) =>
          tracking.event === 'project_improve' ||
          tracking.event === 'code_improve_time'
      )
      .map((tracking: any) =>
        isNaN(+tracking.duration) ? 0 : +tracking.duration
      )
      .reduce((partialSum: number, a: number) => partialSum + a, 0)
  );

  const totalReviewDuration = secondsToHms(
    props.trackings
      .filter((tracking: any) => tracking.event === 'project_review')
      .map((tracking: any) =>
        isNaN(+tracking.duration) ? 0 : +tracking.duration
      )
      .reduce((partialSum: number, a: number) => partialSum + a, 0)
  );

  return (
    <>{`${props.project}: ${totalDuration ? totalDuration : '-'} | define: ${
      totalDefineDuration ? totalDefineDuration : '-'
    } | imagine: ${
      totalImagineDuration ? totalImagineDuration : '-'
    } | create: ${totalCreateDuration ? totalCreateDuration : '-'} | improve: ${
      totalImproveDuration ? totalImproveDuration : '-'
    } | review: ${totalReviewDuration ? totalReviewDuration : '-'}`}</>
  );
};

export default ProjectEngagement;
