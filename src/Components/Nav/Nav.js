
import React, {useEffect, useRef, useState} from 'react';
import { NavLink } from 'react-router-dom'
import "./Nav.scss"

import Logo from "../../Assets/Logo.png"

function Nav() {

	const [isOpen,setIsOpen] = useState(false);

	const toggleMenu = () => {
		if(window.innerWidth > 711){
			return
		}
		setIsOpen(!isOpen);
	}

	return (
		<div className="nav-wrapper">
			<div className="logo">
				<img src={Logo}></img>
				<h1>La Olimpipedia</h1>
			</div>

			<div className={`links-wrapper ${isOpen?"isOpen":''}`}>
				<div className="links">
					<NavLink exact to="/" onClick={toggleMenu}>Inicio</NavLink>
					<NavLink to="/admin/eventos" onClick={toggleMenu}>Horarios</NavLink>
					<NavLink to="/admin/medallero" onClick={toggleMenu}>Medallero</NavLink>
					<NavLink to="/admin/enDirecto" onClick={toggleMenu}>En Directo</NavLink>
					<NavLink to="/admin/guia" onClick={toggleMenu}>Guia</NavLink>
					<NavLink to="/admin/contacto" onClick={toggleMenu}>Contacto</NavLink>
				</div>
			</div>
			<div className="menu" onClick={toggleMenu}>N</div>
		</div>
	)

}

export default Nav;
