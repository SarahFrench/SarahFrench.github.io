import React from "react"

import PageContainer from "../components/PageContainer"
import Menu from "../components/Menu"
import Lights from "../components/Lights"
import ProjectList from "../components/ProjectList"


export default function Projects() {

    return (
      <div>
        <Lights />
        <PageContainer>
          <Menu currentPage="Projects" />
          <ProjectList/>
        </PageContainer>
      </div>
    )
}
