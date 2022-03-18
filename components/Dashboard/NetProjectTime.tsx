import React from 'react';

import moment from 'moment';

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

const NetProjectTime = (props: any) => {
  return (
    <div className="my-4 fw-bold">
      <p className="text-primary text-center">
        Time Our Users Spent on Our Project
      </p>
      <h2 className="text-dark text-center">
        Total:{' '}
        {secondsToHms(
          props.trackings
            .map((tracking: any) =>
              isNaN(+tracking.duration) ? 0 : +tracking.duration
            )
            .reduce((partialSum: number, a: number) => partialSum + a, 0)
        )}
      </h2>
      <h2 className="text-dark text-center">
        Past 7 Days:{' '}
        {secondsToHms(
          props.trackings
            .filter((tracking: any) => {
              return (
                +tracking.timestamp >=
                Date.parse(
                  new Date(
                    moment().subtract(6, 'days').format('DD MMMM YYYY')
                  ).toString()
                )
              );
            })
            .map((tracking: any) =>
              isNaN(+tracking.duration) ? 0 : +tracking.duration
            )
            .reduce((partialSum: number, a: number) => partialSum + a, 0)
        )}
      </h2>
      <h2 className="text-dark text-center">
        Today:{' '}
        {secondsToHms(
          props.trackings
            .filter((tracking: any) => {
              return (
                +tracking.timestamp >=
                Date.parse(new Date(moment().format('DD MMMM YYYY')).toString())
              );
            })
            .map((tracking: any) =>
              isNaN(+tracking.duration) ? 0 : +tracking.duration
            )
            .reduce((partialSum: number, a: number) => partialSum + a, 0)
        )}
      </h2>
    </div>
  );
};

export default NetProjectTime;
