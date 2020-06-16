import React from "react"

import PageContainer from "../components/PageContainer"
import Menu from "../components/Menu"
import Lights from "../components/Lights"
import SectionAboutMe from "../components/SectionAboutMe"
import SectionLanguages from "../components/SectionLanguages"
import SectionLayout from "../components/SectionLayout"


export default function Home() {
    return (
      <div>
        <Lights />
        <PageContainer>
          <Menu currentPage="About" />
          <SectionLayout>
            <SectionAboutMe />
            <SectionLanguages />
          </SectionLayout>
        </PageContainer>
      </div>
    )
}
