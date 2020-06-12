import React from "react"

import PageContainer from "../components/PageContainer"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Lights from "../components/Lights"

export default function Home() {
 return (
   <div style={{ color: `purple` }}>
     <Lights />
     <PageContainer>
       <Header headerText="sarah french" />
       <Menu currentPage="Home" />
       <p>This is my website I'm making using GatsbyJS</p>
       <img src="https://source.unsplash.com/random/400x200" alt="" />
     </PageContainer>
   </div>
 )
}
