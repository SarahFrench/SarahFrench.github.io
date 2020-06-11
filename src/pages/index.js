import React from "react"
import Header from "../components/Header"
import Menu from "../components/Menu"
import Lights from "../components/Lights"

export default function Home() {
 return (
   <div style={{ color: `purple` }}>
     <Lights />
     <Header headerText="sarah french" />
     <Menu
       links={[
         { href: "/", text: "Home" },
         { href: "/about", text: "About" },
       ]}
     />
     <p></p>
     <img src="https://source.unsplash.com/random/400x200" alt="" />
   </div>
 )
}
