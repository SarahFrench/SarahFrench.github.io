import React from 'react';
import './Section.css';


function Section(props){
    return (
      <div className="Section">
        <h3 className="Section__header">Hellooo</h3>
        <div>
          <h5>Who I am</h5>
          <p>
            I'm Sarah, a back-end developer (who would like to be more full-stack). Before changing careers ~2 years ago I worked in biological research, where I studied developmental biology and was (am!) interested in genome engineering.
          </p>
          <h5>What I've done</h5>
          <p>
            For my career change I completed a Software Developer
            apprenticeship while working as a developer. To supplement my back-end focus at work I like to do visual personal
            projects and am recently learning React (and dabbled with Vue).
          </p>
          <p>
            In my current developer role I have worked on various projects,
            including: creating microservices, managing data pipelines, putting
            data scientists' projects into production using AWS, and maintaining
            legacy code.
          </p>
        </div>
      </div>
    )
}

export default Section;