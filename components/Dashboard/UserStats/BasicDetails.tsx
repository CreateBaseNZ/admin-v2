import React from 'react';

import moment from 'moment';

const BasicDetails = (props: any) => {
  let groupsHTML = '';
  if (!props.profile.licenses.length) groupsHTML += 'No Group';
  for (let i = 0; i < props.profile.licenses.length; i++) {
    const license = props.profile.licenses[i];
    if (groupsHTML) groupsHTML += ' | ';
    groupsHTML += `${license.group.name} (${license.role})`;
  }
  return (
    <div>
      <p>{`${props.profile.name.first} ${props.profile.name.last}`}</p>
      <p>
        {moment(props.profile.date.visited).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        )}
      </p>
      <p>{groupsHTML}</p>
    </div>
  );
};

export default BasicDetails;
