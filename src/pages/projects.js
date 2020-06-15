import React from "react"

import PageContainer from "../components/PageContainer"
import Menu from "../components/Menu"
import Lights from "../components/Lights"


export default function Projects() {

    return (
      <div>
        <Lights />
        <PageContainer>
          <Menu currentPage="Projects" />
          <p>Eventually I'll get round to populating this page</p>
        </PageContainer>
      </div>
    )
}
