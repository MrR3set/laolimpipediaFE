
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import "./Nav.scss"

import Logo from "../../Assets/Logo.png";

import { ReactComponent as CloseIcon } from '../../Assets/CrossIcon.svg'
import { ReactComponent as HamburgerIcon } from '../../Assets/HamburgerMenu.svg'

function Nav() {

	const [isOpen,setIsOpen] = useState(false);

	const toggleMenu = () => {
		if(window.innerWidth > 768){
			return
		}
		setIsOpen(!isOpen);
	}

	return (
		<div className="nav-wrapper">
			<div className="logo">
				<img src={Logo} alt="Logo"/>
				<h1>La Olimpipedia</h1>
			</div>

			<div className={`links-wrapper ${isOpen?"isOpen":''}`}>
				<div className="links">
					<NavLink exact to="/" onClick={toggleMenu}>Inicio</NavLink>
					<NavLink to="/admin/eventos" onClick={toggleMenu}>Horarios</NavLink>
					<NavLink to="/admin/medallero" onClick={toggleMenu}>Medallero</NavLink>
					<NavLink to="/admin/directo" onClick={toggleMenu}>En Directo</NavLink>
					<NavLink to="/guia" onClick={toggleMenu}>Guia</NavLink>
					<NavLink to="/contacto" onClick={toggleMenu}>Contacto</NavLink>
				</div>
			</div>

			<div className={`menu ${isOpen?"isOpen":''}`} onClick={toggleMenu}>
				{isOpen?<CloseIcon />:<HamburgerIcon />}
			</div>
		</div>
	)

}

export default Nav;
