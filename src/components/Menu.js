import React from "react";
import { Link } from "gatsby"
import './Menu.css';

export default function Menu(props) {

    const links = function(props){

        let links = [
            { href: "/", text: "Home" },
            { href: "/about", text: "About" },
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
          return (
              <Link key={link.text}
                to={link.href}
                className={link.className}>{link.text}
              </Link>
          )
        })
    }

	return (<nav className="Menu">
            {listItems(props)}
        </nav>
    );
}
