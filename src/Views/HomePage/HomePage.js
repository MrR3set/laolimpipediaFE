
import './HomePage.scss';
import Carrousel from "../../Components/Carrousel/Carrousel";
import { Link } from "react-router-dom";

const HomePageData = [
	{name:"Horarios y Resultados en directo", path:"/admin/eventos"},
	{name:"Medallero", path:"/admin/medallero"},
	{name:"Guia oficial la Olimpipedia JJ.OO. Tokio 2020", path:"/admin/guia"},
	{name:"¿Como seguir los juegos con nosotros?", path:"/admin/directo"},
	{name:"Contacto", path:"/admin/contacto"},
]


function HomePage() {
	return (
		<div className="home-wrapper page">
			<Carrousel items={HomePageData}></Carrousel>
			
			<div className="Links">
				{HomePageData.map(({name,path,imageUrl},i)=>{
					return <ShowCase name={name} path={path} inverted={i%2===0?true:false}/>
				})}
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