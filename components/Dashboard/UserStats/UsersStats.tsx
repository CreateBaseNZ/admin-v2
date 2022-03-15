import React from 'react';

import UserStats from './UserStats';

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
      {sortedProfiles.map((profile: any) => {
        return (
          <UserStats
            key={profile._id}
            profile={profile}
            trackings={props.trackings.filter((tracking: any) => {
              return tracking.profile === profile._id;
            })}
          />
        );
      })}
    </div>
  );
};

export default UsersStats;
