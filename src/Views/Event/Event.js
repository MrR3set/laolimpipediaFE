
import './Event.scss';
import axios from "axios";
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function EventPage() {
	// Here we get all the events...
	const {id} = useParams()

	const [event,setEvent] = useState({});
	const [isNew, setIsNew] = useState(id === 'new')


	useEffect(()=>{
		if (!isNew && !Object.keys(event).length > 0)
			axios.get(`http://localhost:5001/api/admin/events/${id}`).then(res=>{
				setEvent(res.data);
				console.log(res.data)
			})
		else
			console.log("nah")
	},[]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		console.log(e.target.name);
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


	return (
		<div className="event-page">

			{isNew?<>
				<input name={"name"} placeholder={"name"} onChange={onChangeHandler}/>
				<input name={"sport"} placeholder={"sport"} onChange={onChangeHandler}/>
				<input name={"status"} placeholder={"status"} onChange={onChangeHandler}/>
				<input name={"type"} placeholder={"type"} onChange={onChangeHandler}/>
				<input name={"date"} placeholder={"date"} type="datetime-local" onChange={onChangeHandler}/>
				<button onClick={handleSave}>S</button>
			</>:<>
				<h3>{event.name}</h3>
				<p>{event.sport}</p>
				<p>{event.status} - {event.date}</p>
				<div>{event.type} - {event.results}</div>
			</>}

		</div>
	);
}

export default EventPage;
