import React from "react";
import { Link } from "gatsby"

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
            <li key={link.text}>
              <Link to={link.href} className={link.className}>
                {link.text}
              </Link>
            </li>
          )
        })
    }

	return (<ul>
            {listItems(props)}
        </ul>
    );
}
