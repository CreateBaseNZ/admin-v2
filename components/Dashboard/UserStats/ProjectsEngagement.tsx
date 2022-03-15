import React from 'react';
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
          <ProjectEngagement
            key={`${props.profileId}-${project}`}
            project={project}
            trackings={props.trackings.filter((tracking: any) => {
              return tracking.project === project;
            })}
          />
        );
      })}
    </>
  );
};

export default ProjectsEngagement;
