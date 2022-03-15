import React from 'react';

import { Card, ListGroup } from 'react-bootstrap';

import BasicDetails from './BasicDetails';
import ProjectsEngagement from './ProjectsEngagement';

const UserStats = (props: any) => {
  let background: string;
  let text: any;
  const role = props.profile.saves.recentGroups
    ? props.profile.licenses[props.profile.saves.recentGroups[0]]?.role
    : '';
  switch (role) {
    case 'admin':
      background = 'primary';
      text = 'white';
      break;
    case 'teacher':
      background = 'success';
      text = 'white';
      break;
    case 'student':
      background = 'light';
      text = 'dark';
      break;
    default:
      background = 'dark';
      text = 'white';
      break;
  }

  return (
    <Card bg={background} text={text} className="m-4">
      <Card.Body>
        <BasicDetails profile={props.profile} />
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ProjectsEngagement
          profileId={props.profile._id}
          trackings={props.trackings}
        />
      </ListGroup>
    </Card>
  );
};

export default UserStats;
