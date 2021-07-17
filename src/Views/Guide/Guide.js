
import './Guide.scss';
import React from 'react';
import PortadaHQ from "../../Assets/PortadaHQ.jpg";

function Guide() {
	
	return (
		<div className="guide-page-wrapper page">

			<h1 className="header">GUÍA LA OLIMPIPEDIA JJ.OO. TOKIO 2020</h1>
			<p>La revista digital deportiva más completa que puedas encontrar. Estadísticas, horarios detallados participación española, calendarios completos, análisis, colaboraciones con deportistas y periodistas... ¡y mucho más! Cerca de 200 páginas para que no se te escape nada durante los Juegos Olímpicos de Tokio; ¡NO TE LA PIERDAS!</p>

			<a href="https://drive.google.com/file/d/1O_3Qegd6vKoFJdnDe9-YBFN1urUTZ67_/view?usp=sharing" target="_blank">- Descárgala pinchando aquí -</a>


			<img className="guideImg" src={PortadaHQ} alt="Portada guia"></img>

		</div>
	);
}

export default Guide;


