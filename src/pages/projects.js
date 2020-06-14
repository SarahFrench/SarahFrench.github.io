import React from "react"

import PageContainer from "../components/PageContainer"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Lights from "../components/Lights"


export default function Projects() {

    return (
        <div>
            <Lights />
            <PageContainer>
                <Header headerText="Projects" />
                <Menu currentPage="Projects" />
                <p>This is my website I'm making using GatsbyJS</p>
            </PageContainer>
        </div>
    )
}
