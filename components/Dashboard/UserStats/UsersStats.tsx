import React from 'react';

import UserStats from './UserStats';

import moment from 'moment';

const UsersStats = (props: any) => {
  const sortedProfiles: any = props.profiles
    .map((profile: any) => {
      profile.date.visitedParsed = Date.parse(profile.date.visited);
      return profile;
    })
    .sort((profileA: any, profileB: any) => {
      return +profileB.date.visitedParsed - +profileA.date.visitedParsed;
    });

  return (
    <div>
      {sortedProfiles.map((profile: any, index: number, profiles: any[]) => {
        if (index === 0) {
          return (
            <>
              <h4 className="m-4 text-danger">
                {moment(profile.date.visited).format('DD MMMM YYYY')}
              </h4>
              <UserStats
                key={profile._id}
                profile={profile}
                trackings={props.trackings.filter((tracking: any) => {
                  return tracking.profile === profile._id;
                })}
              />
            </>
          );
        } else {
          if (
            moment(profile.date.visited).format('DD MMMM YYYY') !==
            moment(profiles[index - 1].date.visited).format('DD MMMM YYYY')
          ) {
            return (
              <>
                <h4 className="m-4 text-danger">
                  {moment(profile.date.visited).format('DD MMMM YYYY')}
                </h4>
                <UserStats
                  key={profile._id}
                  profile={profile}
                  trackings={props.trackings.filter((tracking: any) => {
                    return tracking.profile === profile._id;
                  })}
                />
              </>
            );
          } else {
            return (
              <UserStats
                key={profile._id}
                profile={profile}
                trackings={props.trackings.filter((tracking: any) => {
                  return tracking.profile === profile._id;
                })}
              />
            );
          }
        }
      })}
    </div>
  );
};

export default UsersStats;
