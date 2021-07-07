import './Event.scss';
import axios from "axios";
import {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Table from "../../Components/Table/Table"

function EventPage() {
	// Here we get all the events...
	const {id} = useParams();
	const history = useHistory()
	const isNew = id == 'new'

	const [event,setEvent] = useState({});
	const [editing, setEditing] = useState(false);
	const [addResults,setAddResults]=useState(false);
	const [results,setResults]=useState([]);

	useEffect(()=>{
		if(isNew)
			setEditing(true);
	},[isNew]);

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
		setEditing(false);
	}

	const pushUpdate = (e) => {
		e.preventDefault();
		console.log(isNew)
		if(isNew){
			axios.post(`http://localhost:5001/api/admin/events/`, event).then(res=>{
				history.push('/admin/eventos/'+res.data.id)
			})
		}else{
			axios.put(`http://localhost:5001/api/admin/events/${id}`, event).then(res=>{
	
			})
		}

	}

	const saveResults = (newValues) => {
		setResults(newValues);

		const isDiff = (arrA,arrB) => {
			if(arrA.length !== arrB.length ){
				return true
			}else{
				return !arrA.every((e,i)=>{
					return e===arrB[i]
				})
			}
		}	

		if(!event.results || (newValues.length > 0 && isDiff(newValues,event.results[0])) )
			axios.post(`http://localhost:5001/api/admin/events/${id}`, {results:{0:newValues}}).then(res=>{
				setEvent({...event, results:res.data.results})
			})
	}

	const deleteEvent = () => {
		
		let confirmation = window.confirm("Confirmar")
		
		if(confirmation)
			axios.delete(`http://localhost:5001/api/admin/events/${id}`).then(res=>{
				console.log(res);
				history.push('/admin/eventos')
			})
	}

	const discardResults = (e) => {
		e.preventDefault();
		if(event.results){
			setResults(event.results[0])
		}
		setAddResults(false);
	}
	
	return (
		<div className="event-wrapper page">

			<div className="header">
				{editing?<>
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
						<button className="edit-controls cta" onClick={handleSave}>Guardar cambios</button>
					</div>
				</>:<>
					<div className="left">
						<h1 className="title">{event.name}</h1>
						<p className="date">{String(event.date).slice(0,16).replace("T", " - ")}</p>
						<p className="sport">{event.sport}</p>
					</div>

					<div className="right">
						<div className="bckg"></div>
						<button className="save-controls cta" onClick={pushUpdate}>Subir cambios</button>
						<button className="delete-controls cta" onClick={deleteEvent}>Borrar evento</button>
						<button className="edit-controls cta" onClick={(e)=>{e.preventDefault(); setEditing(true)}}>Editar</button>
					</div>

				</>}
			</div>


			<div className="content">
				{results.length>0 || addResults
				?
					<>
						<Table results={results} saveResults={saveResults} discardResults={discardResults} allowEdits={true}/>
					</>
				:
					<div className="controls">
						<button className="cta" onClick={(e)=>{e.preventDefault(); setAddResults(true)}}>Añadir resultados</button>
					</div>
				}
			</div>
		</div>
	);
}

export default EventPage;
