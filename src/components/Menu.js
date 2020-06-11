import React from "react";
import { Link } from "gatsby"

export default function Menu(props) {

    const listItems = function(props){
        return props.links.map( link => {
            return (
				<li key={link.text}>
					<Link to={link.href}>{link.text}</Link>
				</li>
            );
        })
    }

	return (<ul>
            {listItems(props)}
        </ul>
    );
}
