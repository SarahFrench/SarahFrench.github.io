import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default function Home() {
    return (
        <div style={{ color: `purple` }}>
            <Header headerText="Hello World" />
            <Link to="/about/">About</Link>
            <p>If this text has changed then pushes to my develop branch trigger Travis to build the project and push to master.</p>
            <img src="https://source.unsplash.com/random/400x200" alt="" />
        </div>
    )
}
