import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({links}) => {
    if(!links.length){
        return <h3>Links is absent</h3>
    }

    return(
        <div>
            <table>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Original</th>
                    <th>Shorted</th>
                    <th>Open</th>
                </tr>
                </thead>

                <tbody>
                {links.map((link, index) => {
                    return(
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}