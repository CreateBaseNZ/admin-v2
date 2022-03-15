import React from 'react';

import { Card, ListGroup } from 'react-bootstrap';

import BasicDetails from './BasicDetails';
import ProjectsEngagement from './ProjectsEngagement';

const UserStats = (props: any) => {
  return (
    <Card className="m-4">
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
