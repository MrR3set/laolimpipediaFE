
import './HomePage.scss';
import { Link } from "react-router-dom"

function HomePage() {


	return (
		<div className="home-wrapper page">
			<div>Carrousel</div>
			
			<div className="Links">

				<ShowCase name="Horarios y Resultados en directo" path="/admin/eventos" />
				<ShowCase name="Medallero" inverted path="/admin/medallero"/>
				<ShowCase name="Guia oficial la Olimpipedia JJ.OO. Tokio 2020" path="/admin/guia"/>
				<ShowCase name="Como seguir los juegos con nosotros?" inverted path="/admin/directo"/>
				<ShowCase name="Contacto" path="/admin/contacto"/>





			</div>
		</div>
	);
}

export default HomePage;


const ShowCase = ({imageUrl,inverted=false,path="/", name=""}) => {
	return (
		<div className="showcase">
			<img src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Showcase" />
			<div className={`content ${inverted?"inv":''}`}>
				<Link to={path} className="link">
					{name}
				</Link>
			</div>
		</div>
	)
}