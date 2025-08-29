import React from 'react'

const ProjectImg = ({ project, children}) => {
  return (
    <div className=' card timeline-card'>
        <div className="glow"/>
        <div>
            <img src={project.image} alt={project.title} />
        </div>
    </div>
  )
}

export default ProjectImg