import React from 'react';

import PageContainer from "../components/PageContainer"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Lights from "../components/Lights"

import { Link } from "gatsby"


export default function About() {
    return (
      <div style={{ color: `purple` }}>
        <Lights />
        <PageContainer>
          <Header headerText="About" />
          <Menu
            links={[
              { href: "/", text: "Home" },
              { href: "/about", text: "About" },
            ]}
          />
          <Link to="/">Home</Link>
          <p>All about me.</p>
        </PageContainer>
      </div>
    )
}
