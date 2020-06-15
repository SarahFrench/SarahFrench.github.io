import React from 'react';
import { Icon } from "semantic-ui-react";
import './SocialMedia.css';

function SocialMedia(){
    return (
      <aside className="socialMedia__container">
        <a
          className="socialMedia__item"
          href="https://github.com/SarahFrench"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" />
        </a>
        <a
          className="socialMedia__item"
          href="https://www.linkedin.com/in/sarah-french-897235169/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="linkedin" />
        </a>
      </aside>
    )
}

export default SocialMedia;