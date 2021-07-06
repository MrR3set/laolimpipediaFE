
import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom'
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
					<Link to="/" onClick={toggleMenu}>Inicio</Link>
					<Link to="/admin/eventos" onClick={toggleMenu}>Horarios</Link>
					<Link to="/admin/medallero" onClick={toggleMenu}>Medallero</Link>
					<Link to="/admin/enDirecto" onClick={toggleMenu}>En Directo</Link>
					<Link to="/admin/guia" onClick={toggleMenu}>Guia</Link>
					<Link to="/admin/contacto" onClick={toggleMenu}>Contacto</Link>
				</div>
			</div>
			<div className="menu" onClick={toggleMenu}>N</div>
		</div>
	)

}

export default Nav;
