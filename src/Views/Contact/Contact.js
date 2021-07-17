
import React from 'react';
import './Contact.scss';
import { ReactComponent as InstagramIcon } from '../../Assets/instagram.svg'
import { ReactComponent as MailOutlineIcon } from '../../Assets/gmail.svg'
import { ReactComponent as TwitchIcon } from '../../Assets/twitch.svg'

function Contact() {


	return (
		<div className="contact-page-wrapper page">

			<div className="header">
				<img className="background" src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80" alt="Carrousel background"></img>
				<h1>Contacto</h1>
			</div>

			<div className="content">


			
				<p>
					El deporte olímpico para nosotros siempre ha sido y será una gran referencia para el día a día de cualquier persona, tanto deportistas como gente de a pie. Es por ello que dedicamos nuestro tiempo a la mayor difusión posible del mismo, dando cabida a un gran número de disciplinas que carecen de un altavoz como el nuestro durante gran parte de cada ciclo olímpico. A diario nos encargamos de mantener informada a toda la comunidad olímpica de las últimas noticias, resultados, competiciones y novedades de todo el deporte español, acompañando a todos y cada uno de los atletas en sus diferentes objetivos. Siente deporte con nosotros, forma parte de esto y contáctanos. 
				</p>
				<br></br>
				<p>
					¡Vive los Juegos, vive el deporte, vive La Olimpipedia!
				</p>
			</div>

			<div className="link">
				<a href="mailto:olimpipedia@gmail.com" ><MailOutlineIcon/></a>
        		<a href="https://instagram.com/laolimpipedia" ><InstagramIcon/></a>
        		<a href="https://www.twitch.tv/laolimpipedia" ><TwitchIcon/></a>
			</div>

		</div>
	);
}

export default Contact;


