import React from 'react';
import Title from "../components/Title";
import SocialMedia from "../components/SocialMedia"
import "fomantic-ui-css/semantic.css"
import './Fonts.css';
import './PageContainer.css';

function PageContainer (props){
    return (
      <div className="PageContainer">
        <Title />
        <SocialMedia/>
        {props.children}
      </div>
    )
}

export default PageContainer;