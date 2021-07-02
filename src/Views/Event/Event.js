
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
	const [editing, setEditing] = useState(false);
	const [addResults,setAddResults]=useState(true);
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
		<div className="event-page">

			{isNew || editing?<>
			
				<input name="name" placeholder="name" value={event.name} onChange={onChangeHandler}/>
			
				<input name="sport" placeholder="sport" value={event.sport} onChange={onChangeHandler}/>
			
				<input name="status" placeholder="status" value={event.status} onChange={onChangeHandler}/>
			
				<select name="type" onChange={onChangeHandler} defaultValue={event.type?event.type:"info"}>
					<option value="info" disabled>Tipo de competicion</option>
					<option value="bracket">Bracket</option>
					<option value="table">Table</option>
				</select>
		
				<input name="date" placeholder="date" type="datetime-local" value={String(event.date).slice(0,16)} onChange={onChangeHandler}/>
			
				<button onClick={handleSave}>S</button>
			</>:<>
				<h3>{event.name}</h3>
				<p>{event.sport}</p>
				<p>{event.status} - {String(event.date).slice(0,16).replace("T", " ")}</p>
				<div>{event.type}</div>
				<button onClick={(e)=>{e.preventDefault(); setEditing(true)}}>E</button>
			</>}



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
