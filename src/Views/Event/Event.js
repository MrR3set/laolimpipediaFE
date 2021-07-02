
import './Event.scss';
import axios from "axios";
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Table from "../../Components/Table/Table"

function EventPage() {
	// Here we get all the events...
	const {id} = useParams()

	const [event,setEvent] = useState({});
	const [isNew, setIsNew] = useState(id === 'new');
	const [editing, setEditing] = useState(true);
	const [addResults,setAddResults]=useState(false);
	const [results,setResults]=useState([]);

	useEffect(()=>{
		if (!isNew && !Object.keys(event).length > 0)
			axios.get(`http://localhost:5001/api/admin/events/${id}`).then(res=>{
				setEvent(res.data);
			})
	},[]);

	useEffect(()=>{
		if(event.results){
			setResults(event.results[0])
		}

	},[event]);


	const onChangeHandler = (e) => {
		e.preventDefault();
		setEvent({...event, [e.target.name]:e.target.value});
	}
	
	const handleSave = (e) => {
		e.preventDefault();
		setIsNew(false);
		setEditing(false);
	}

	const pushUpdate = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:5001/api/admin/events/${id}`, event).then(res=>{
			console.log(res)
		})
	}

	const saveResults = (newValue) => {
		setResults(newValue);
	}

	const pushResults = (e) => {
		e.preventDefault();

		if(results.length > 0)
			axios.post(`http://localhost:5001/api/admin/events/${id}`, {results:{0:results}}).then(res=>{
				console.log(res)
			})
	}
	

	

	return (
		<div className="event-wrapper page">

			<div className="header">
				{isNew || editing?<>
				

		
			
				


				<div className="left">
					<input	className="title" name="name" placeholder="titulo" value={event.name} onChange={onChangeHandler}/>
				
					<input className="date" name="date" placeholder="fecha" type="datetime-local" value={String(event.date).slice(0,16)} onChange={onChangeHandler}/>
					
					<select className="type" name="type" onChange={onChangeHandler} defaultValue={event.type?event.type:"info"}>
						<option value="info" disabled>Tipo de competicion</option>
						<option value="bracket">Bracket</option>
						<option value="table">Table</option>
					</select>

					<input className="status" name="status" placeholder="estado" value={event.status} onChange={onChangeHandler}/>
					
					<input className="sport" name="sport" placeholder="deporte" value={event.sport} onChange={onChangeHandler}/>
				</div>

				<div className="right">
					<button className="edit-controls" onClick={handleSave}>Guardar cambios</button>
				</div>



			</>:<>
				
				
				<div className="left">
					<h1 className="title">{event.name}</h1>
					<p className="date">{String(event.date).slice(0,16).replace("T", " - ")}</p>
					<p className="sport">{event.sport}</p>
				</div>

				<div className="right">
					<div className="bckg"></div>
					<button className="edit-controls" onClick={(e)=>{e.preventDefault(); setEditing(true)}}>Editar</button>
				</div>


			</>}
			</div>



			<button onClick={pushUpdate}>Actualizar informacion del evento</button>



			<br></br>

			<button onClick={pushResults}>Subir resultados</button> 

			
			
			<button onClick={(e)=>{e.preventDefault(); setAddResults(true)}}>Añadir resultados</button>

			{
				addResults?
				<div>					
					<Table results={results} saveResults={saveResults}/>
				</div>:null
			}



		</div>
	);
}

export default EventPage;
