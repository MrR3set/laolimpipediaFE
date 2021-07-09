
import { Route, Switch, useHistory } from "react-router-dom";
import EventsPage from './Views/EventsPage/EventsPage';
import LivePage from './Views/LivePage/LivePage';
import Event from './Views/Event/Event';
import Nav from "./Components/Nav/Nav"
import HomePage from "./Views/HomePage/HomePage";
import MedalsPage from "./Views/Medals/MedalsPage";
import PrivateRoute from "./Utils/PrivateRoute";
import {useEffect, useState} from "react";
import { axiosWithAuth } from "./Utils/axiosWithAuth";
import { ReactComponent as Spinner } from './Assets/puff.svg'
import './App.scss';

function App() {

	const history = useHistory();
	
	const [authorized,setAuthorized] = useState(false);
	const [isLoading,setIsLoading] = useState(true);

	useEffect(()=>{
		axiosWithAuth().get("/auth/whoami").then(res=>{
			setAuthorized(true);
		}).catch(err=>{
			if(err.response.status===401){
				console.log(history)//replace location pathname admin to nothing...
				// window.localStorage.removeItem("token")
			}
		}).finally(()=>{
			setIsLoading(false);
			setTimeout(()=>{
			},Math.floor(Math.random() * 1500))
		})
	},[])


	return (!isLoading?
		<div className="App">

			<Nav></Nav>

			<Switch>
				<Route path="/eventos" component={EventsPage}/>
				<Route path="/eventos/:id" component={Event}/>
				<Route path="/medallero" component={MedalsPage}/>
				<Route path="/directo" component={LivePage}/>
				
				<PrivateRoute exact path="/admin/eventos" component={EventsPage} authorized={authorized}/>
				<PrivateRoute path="/admin/eventos/:id" component={Event} authorized={authorized}/>
				<PrivateRoute path="/admin/medallero" component={MedalsPage} authorized={authorized}/>
				<PrivateRoute path="/admin/directo" component={LivePage} authorized={authorized}/>
				<Route  path="/" component={HomePage}></Route>
			</Switch>
			
		</div>:<div className="loader" >
			<Spinner/>
		</div>
  );
}

export default App;
