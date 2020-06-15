import React from "react";
import { Link } from "gatsby"
import './Menu.css';

export default function Menu(props) {

    const links = function(props){

        let links = [
            { href: "/", text: "About" },
            { href: "/projects", text: "Projects" },
        ];

        for(let link of links){
            if(link.text === props.currentPage){
                link.className="current";
            }
        }

        return links;
    }

    const listItems = function(props){


        return links(props).map(link => {
            if(link.className==="current"){
                return (
                  <Link
                    className={link.className}
                    key={link.text}
                    to={link.href}
                  >
                    <h1>
                        {link.text}
                    </h1>
                  </Link>
                )
            }else{
                return (
                    <Link key={link.text} to={link.href}>
                        {link.text}
                    </Link>
                )
            }
        })
    }

	return (<nav className="Menu">
            {listItems(props)}
        </nav>
    );
}
