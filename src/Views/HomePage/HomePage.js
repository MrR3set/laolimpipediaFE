
import './HomePage.scss';
import Carrousel from "../../Components/Carrousel/Carrousel";
import { Link } from "react-router-dom";

const HomePageData = [
	{
		name:"Horarios y Resultados en directo", 
		path:"/admin/eventos", 
		imageUrl:"https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80"
	},
	{
		name:"Medallero", 
		path:"/admin/medallero", 
		imageUrl:"https://images.unsplash.com/photo-1511406471420-feeac25c74c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=699&q=80"
	},
	{
		name:"Guia oficial la Olimpipedia JJ.OO. Tokio 2020", 
		path:"/admin/guia",
		imageUrl:"https://images.pexels.com/photos/236937/pexels-photo-236937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
	},
	{
		name:"¿Cómo seguir los Juegos?", 
		path:"/admin/directo",
		imageUrl:"https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=622&q=80"
	},
	{
		name:"Contacto", 
		path:"/admin/contacto",
		imageUrl:"https://images.pexels.com/photos/5077065/pexels-photo-5077065.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
	},
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
			<img src={imageUrl} alt={name + " previsualizacion"} />
			<div className={`content ${inverted?"inv":''}`}>
				<Link to={path} className="link">
					{name}
				</Link>
			</div>
		</div>
	)
}