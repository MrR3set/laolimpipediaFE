
import React from 'react';
import { Link } from 'react-router-dom'
import "./Nav.scss"

import Logo from "../../Assets/Logo.png"

function Nav() {
	return (
		<div className="nav-wrapper">
			<div className="logo">
				<img src={Logo}></img>
				<h1>La olimpipedia</h1>
			</div>


			{/* Horarios - Medallero - En Directo (para el apartado que ponía lo de ¿como seguir los juegos con nosotros?) - Guía - Contactó */}




			<div className="links-wrapper">
				<div className="links">
					<Link>Inicio</Link>
					<Link>Horarios</Link>
					<Link>Medallero</Link>
					<Link>En Directo</Link>
					<Link>Guia</Link>
					<Link>Contacto</Link>
				</div>
			</div>
		</div>
	)

}

export default Nav;
