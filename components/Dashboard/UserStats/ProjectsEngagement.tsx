import React from 'react';

import { ListGroup } from 'react-bootstrap';

import ProjectEngagement from './ProjectEngagement';

const ProjectsEngagement = (props: any) => {
  const projects = [
    ...new Set(
      props.trackings.map((tracking: { project: any }) => tracking.project)
    ),
  ];

  return (
    <>
      {projects.map((project: any) => {
        return (
          <ListGroup.Item key={`${props.profileId}-${project}`}>
            <ProjectEngagement
              project={project}
              trackings={props.trackings.filter((tracking: any) => {
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
