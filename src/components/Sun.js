import React from "react"

function Sun() {

   const translate = () => {
    //translate needed to make it look normal
    let offsetX = 0.5
    let offsetY = 18.5

    if (window.innerWidth < 500) {
      offsetX = -100
    }

    return `translate(${offsetX},${offsetY})`
  }

    return (
      <g id="Sun" className="controller__sun light">
        <ellipse
          ry="5.8015633"
          rx="5.8015623"
          cy="266.50955"
          cx="9.0397892"
          className="controller__background"
        />
        <path d="m 4.8596155,266.6444 2.2131594,0.63405 c -0.3135425,0.73115 -0.6861513,1.39478 -1.0194247,2.10339 l 2.1696776,-0.97636 0.7978783,2.27524 0.789925,-2.26132 v 0 l 0.00781,-0.008 2.1379609,1.02828 -0.981272,-2.16187 c 0.740587,-0.30052 1.456094,-0.5669 2.190963,-0.83741 l -2.15365,-0.72951 c 0.313819,-0.73103 0.686124,-1.39479 1.019425,-2.10339 l -2.1696781,0.97636 -0.7978811,-2.27524 -0.7899232,2.26132 v 0 l -0.00811,0.008 -2.1379589,-1.02827 0.9842961,2.16464 z" />
        <circle
          r="2"
          cy="266.52087"
          cx="9"
          className="controller__background"
        />
      </g>
    )
}

export default Sun
