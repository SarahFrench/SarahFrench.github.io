import React from "react"

import PageContainer from "../components/PageContainer"
import Menu from "../components/Menu"
import Lights from "../components/Lights"
import Section from "../components/Section"
import SectionLanguages from "../components/SectionLanguages"
import SectionLayout from "../components/SectionLayout"


export default function Home() {
    return (
      <div>
        <Lights />
        <PageContainer>
          <Menu currentPage="About" />
          <SectionLayout>
            <Section />
            <SectionLanguages />
          </SectionLayout>
        </PageContainer>
      </div>
    )
}
