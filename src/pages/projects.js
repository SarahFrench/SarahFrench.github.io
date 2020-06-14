import React from "react"

import PageContainer from "../components/PageContainer"
import Title from "../components/Title"
import Menu from "../components/Menu"
import Lights from "../components/Lights"


export default function Projects() {

    return (
      <div>
        <Lights />
        <PageContainer>
          <Title />
          <Menu currentPage="Projects" />
          <p>This is my website I'm making using GatsbyJS</p>
        </PageContainer>
      </div>
    )
}
