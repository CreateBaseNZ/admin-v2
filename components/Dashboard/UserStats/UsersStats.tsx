import React, { useEffect, useState } from 'react';

import UserStats from './UserStats';

import { Form } from 'react-bootstrap';

import moment from 'moment';

const UsersStats = (props: any) => {
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filteredTracking, setFilteredTracking] = useState([]);
  const [enteredDays, setEnteredDays] = useState(7);

  useEffect(() => {
    setFilteredProfiles(
      props.profiles.filter((profile: any) => {
        return (
          Date.parse(profile.date.visited) >=
          Date.parse(
            new Date(
              moment()
                .subtract(enteredDays - 1, 'days')
                .format('DD MMMM YYYY')
            ).toString()
          )
        );
      })
    );
  }, [props.profiles, enteredDays]);

  useEffect(() => {
    setFilteredTracking(
      props.trackings.filter((tracking: any) => {
        return (
          +tracking.timestamp >=
          Date.parse(
            new Date(
              moment()
                .subtract(enteredDays - 1, 'days')
                .format('DD MMMM YYYY')
            ).toString()
          )
        );
      })
    );
  }, [props.trackings, enteredDays]);

  const sortedProfiles: any = filteredProfiles.sort(
    (profileA: any, profileB: any) => {
      return (
        Date.parse(profileB.date.visited) - Date.parse(profileA.date.visited)
      );
    }
  );

  const daysChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredDays(+event.target.value);
  };

  const html = [
    <Form.Control
      key="users-stats"
      type="number"
      min="1"
      max={7 * 26}
      step="1"
      defaultValue={enteredDays}
      onChange={daysChangeHandler}
      style={{ width: '70px' }}
      className="m-4"
    />,
  ];
  for (let i = 0; i < sortedProfiles.length; i++) {
    const profile = sortedProfiles[i];
    if (
      i === 0 ||
      moment(profile.date.visited).format('DD MMMM YYYY') !==
        moment(sortedProfiles[i - 1].date.visited).format('DD MMMM YYYY')
    ) {
      html.push(
        <h4
          key={moment(profile.date.visited).format('MMMMDDYYYY')}
          className="m-4 text-danger"
        >
          {moment(profile.date.visited).format('DD MMMM YYYY')}
        </h4>
      );
    }
    html.push(
      <UserStats
        key={profile._id}
        profile={profile}
        trackings={filteredTracking.filter((tracking: any) => {
          return tracking.profile === profile._id;
        })}
      />
    );
  }

  return <div>{html}</div>;
};

export default UsersStats;
