import React from "react"

import PageContainer from "../components/PageContainer"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Lights from "../components/Lights"

export default function Home() {
 return (
   <div>
     <Lights />
     <PageContainer>
       <Header headerText="Sarah French" />
       <Menu currentPage="Home" />
       <p>This is my website I'm making using GatsbyJS</p>
     </PageContainer>
   </div>
 )
}
