import React from "react"
import Sun from "./Sun"
import Moon from "./Moon"

import "./LightsController.css"

function LightsController(props) {
  return (
    <g id="lights-controller" transform={props.translate()}>
      <g className="controller__panel">
        {/* controller */}
        <rect x="1.5" width="15" height="30" rx="7.5" y="244"></rect>
      </g>
      <Moon />
      <Sun />
    </g>
  )
}

export default LightsController
