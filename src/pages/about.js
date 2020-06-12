import React from 'react';

import PageContainer from "../components/PageContainer"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Lights from "../components/Lights"


export default function About() {
    return (
      <div style={{ color: `purple` }}>
        <Lights />
        <PageContainer>
          <Header headerText="About" />
          <Menu currentPage= "About" />
          <p>All about me.</p>
        </PageContainer>
      </div>
    )
}
