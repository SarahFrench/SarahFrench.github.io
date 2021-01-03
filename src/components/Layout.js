import React from "react"
import favicon from "../images/favicon.png"
import Helmet from "react-helmet"
import PageContainer from "../components/PageContainer"
import Lights from "../components/Lights"

function Layout(props) {
  return (
    <div>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Sarah French: Developer Portfolio</title>
      </Helmet>
      <Lights />
      <PageContainer>{props.children}</PageContainer>
    </div>
  )
}

export default Layout
