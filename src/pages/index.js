import React from "react"

import Layout from "../components/Layout"
import SectionAboutMe from "../components/SectionAboutMe"
import SectionLanguages from "../components/SectionLanguages"
import SectionLayout from "../components/SectionLayout"


export default function Home() {
    return (
      <Layout currentPage="About">
        <SectionLayout>
          <SectionAboutMe />
          <SectionLanguages />
        </SectionLayout>
      </Layout>
    )
}
