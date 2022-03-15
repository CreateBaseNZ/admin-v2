import React from 'react';

import moment from 'moment';

const BasicDetails = (props: any) => {
  return (
    <div>
      <p>{`${props.profile.name.first} ${props.profile.name.last}`}</p>
      <p>
        {moment(props.profile.date.visited).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        )}
      </p>
    </div>
  );
};

export default BasicDetails;
