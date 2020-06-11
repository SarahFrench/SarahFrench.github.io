import React from 'react';
import './PageContainer.css';

class PageContainer extends React.Component {
    render(){
        return(<div className="PageContainer">
            {this.props.children}
        </div>
        );
    }
}

export default PageContainer;