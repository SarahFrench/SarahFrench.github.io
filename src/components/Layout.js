import React from 'react';
import favicon from '../images/favicon.png'
import Helmet from 'react-helmet'
import PageContainer from "../components/PageContainer"
import Menu from "../components/Menu"
import Lights from "../components/Lights"

function Layout(props){
    return (
      <div>
        <Helmet>
          <link rel="icon" href={favicon} />
          <title>Sarah French: Developer Portfolio</title>
        </Helmet>
        <Lights />
        <PageContainer>
          <Menu currentPage={props.currentPage} />
          {props.children}
        </PageContainer>
      </div>
    )
}


export default Layout;