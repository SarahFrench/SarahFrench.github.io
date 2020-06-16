import React from 'react';
import { Icon } from "semantic-ui-react";

import './Section.css';


function SectionLanguages(props){
    return (
      <div className="Section">
        <h3 className="Section__header">Languages, Frameworks, Tools</h3>
        <div className="Section__icons">
          <Icon name="html5"/>
          <Icon name="css3 alternate"/>
          <Icon name="js square"/>
          <Icon name="node"/>
          <Icon name="docker"/>
          <Icon name="aws"/>
        </div>
        <h5>Things I know well:</h5>
        <p>Javascript (ES6), NodeJS, npm, HTML, CSS</p>
        <h5>Things I tinker and get by with*:</h5>
        <p>Docker, PHP, git, React, Ruby on Rails, AWS Services, CircleCI, SQL</p>
        <h5>Things I have exposure to, but more unknowns than knowns:</h5>
        <p>PHP + Laravel, R</p>
        <small>*where I know enough to Google problems well!</small>
      </div>
    )
}

export default SectionLanguages