import React from 'react';

import { Card } from 'react-bootstrap';

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
    <>
      <Card.Text>{`${props.profile.name.first} ${props.profile.name.last} (${
        props.profile.account.local
          ? props.profile.account.local.email
          : props.profile.account.google.email
      })`}</Card.Text>
      <Card.Text>
        {`${moment(props.profile.date.visited).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        )} (visited) | ${moment(props.profile.date.created).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        )} (created)`}
      </Card.Text>
      <Card.Text>{groupsHTML}</Card.Text>
    </>
  );
};

export default BasicDetails;
