import React from 'react';
import './Fonts.css';
import './PageContainer.css';

function PageContainer (props){
    return(<div className="PageContainer">
        {props.children}
    </div>
    );
}

export default PageContainer;