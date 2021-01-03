import React from "react"
import Title from "../components/Title"
import "./Fonts.css"
import "./PageContainer.css"

function PageContainer(props) {
  return (
    <div className="PageContainer light">
      <Title />
      {props.children}
    </div>
  )
}

export default PageContainer
