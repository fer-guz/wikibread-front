import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from "../public/Logowiki.png";

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" style={{padding: "0px"}}>
               
                <div className="container">
                    <Link className="navbar-brand" to="/">
                    <img src={Logo} width="110" className="d-inline-block align-top" alt="LOGO"/>
    
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Explorar</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Agregar</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}