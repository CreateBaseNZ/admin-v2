import React from 'react';

import { ListGroup } from 'react-bootstrap';

import ProjectEngagement from './ProjectEngagement';

const ProjectsEngagement = (props: any) => {
  const trackings = props.trackings.filter(
    (tracking: any) => tracking.project !== undefined
  );
  const projects = [
    ...new Set(trackings.map((tracking: { project: any }) => tracking.project)),
  ];

  return (
    <>
      {projects.map((project: any) => {
        return (
          <ListGroup.Item key={`${props.profileId}-${project}`}>
            <ProjectEngagement
              project={project}
              trackings={trackings.filter((tracking: any) => {
                return tracking.project === project;
              })}
            />
          </ListGroup.Item>
        );
      })}
    </>
  );
};

export default ProjectsEngagement;
