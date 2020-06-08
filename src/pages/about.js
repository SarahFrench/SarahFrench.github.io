import React from 'react';
import { Link } from "gatsby"
import Header from "../components/header"

export default function About() {
  return (
    <div style={{ color: `purple` }}>
      <Header headerText="About" />
      <Link to="/">Home</Link>
      <p>Wee I made a link to another page!</p>
    </div>
  )
}
