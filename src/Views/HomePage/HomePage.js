
import './HomePage.scss';
import Carrousel from "../../Components/Carrousel/Carrousel";
import { Link } from "react-router-dom";

const HomePageData = [
	{name:"Horarios y Resultados en directo", path:"/admin/eventos", imageUrl:"https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80"},
	{name:"Medallero", path:"/admin/medallero"},
	{name:"Guia oficial la Olimpipedia JJ.OO. Tokio 2020", path:"/admin/guia"},
	{name:"¿Como seguir los juegos con nosotros?", path:"/admin/directo"},
	{name:"Contacto", path:"/admin/contacto"},
]


function HomePage() {
	return (
		<div className="home-wrapper">
			<Carrousel items={HomePageData}></Carrousel>

			<div className="Links">
				{HomePageData.map(({name,path,imageUrl},i)=>{
					return <ShowCase name={name} path={path} inverted={i%2===0?true:false} imageUrl={imageUrl} key={i}/>
				})}
			</div> 
		</div>
	);
}

export default HomePage;


const ShowCase = ({imageUrl,inverted=false,path="/", name=""}) => {
	return (
		<div className="showcase">
			<img src={imageUrl} alt="Showcase" />
			<div className={`content ${inverted?"inv":''}`}>
				<Link to={path} className="link">
					{name}
				</Link>
			</div>
		</div>
	)
}