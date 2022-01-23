import React, { useContext } from "react"
import {NavLink} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const NavBar = () => {
    const authContext = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        authContext.logout()
    }

    return (
        <nav>
            <div className="nav-wrapper blue">
                <span className="brand-logo">Short links</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}