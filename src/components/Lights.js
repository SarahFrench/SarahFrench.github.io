import React from "react"
import "./Lights.css";

 class Lights extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            svgRef: React.createRef(),
            width: window.innerWidth,
            height: "100vh",
            viewBox : {
                x:0,
                y:0,
                width: 786, //values come from Inkscape 
                height: 444
            }
        }
    }

     componentDidMount = () => {
        this.handleSvgDimensions();
        window.addEventListener('resize', this.handleSvgDimensions)
     }

     componentDidUpdate = () => {
        console.log("update")
     }

     handleSvgDimensions = () => {
         console.log("resizing, width is now:", this.state.svgRef.current.clientWidth)
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
     }

    viewboxSettings = () => {
        const {x, y, height, width} = this.state.viewBox
        return `${x} ${y} ${width} ${height}`;
    }

    translate = () => {
        //translate left to hide trailing wire when screen is narrower tha 500px
        let offsetX = 0;
        let offsetY = 0;

        if (window.innerWidth < 500){
            offsetX = -50;
        }

        return `translate(${offsetX},${offsetY})`;
    }

    render(){
        return (
            <svg ref={this.state.svgRef} preserveAspectRatio="xMinYMin slice" className="lights" width={this.state.width} height={this.state.height} version="1.1" viewBox={this.viewboxSettings()} xmlns="http://www.w3.org/2000/svg">
                <path transform={this.translate()} d="m38.411 368.24c47.128-62.744 2.1787-70.176 2.1787-105.71s9.7658-175.98 3.3392-203.95c-6.4266-27.97 48.409 26.302 138.38 36.129 89.973 9.8274 81.404-40.264 156.38-41.02 74.977-0.75595 129.48 3.412 213.03 7.9477 83.546 4.5357 76.169 56.507 121.16 48.191 44.986-8.3155 49.271-16.631 79.262-12.851 29.991 3.7798 34.275 6.0476 34.275 6.0476v-102.81h-786.19l1.1077 443.94 28.365-53.204z" fill="#731c7f"/>
            </svg>
        )
    }
}

export default Lights;