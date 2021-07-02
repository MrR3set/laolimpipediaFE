
import './EventsPage.scss';
import EventPreview from "../../Components/EventPreview/EventPreview";
import axios from "axios";
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom"

function EventsPage() {
	// Here we get all the events...

	const [events,setEvents] = useState([])

	useEffect(()=>{
		axios.get("http://localhost:5001/api/admin/events").then(res=>{
			setEvents(res.data);
		})
	},[])

	return (
		<div className="events-wrapper page">
			<div className="controls">
				<Link to="/admin/eventos/new" className="cta">Añadir evento</Link>
			</div>
			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Hora</th>
							<th>Deporte</th>
							<th>Nombre</th>
							<th>Estado</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{events.map((event,index)=>{
							return <EventPreview id={event.id} name={event.name} sport={event.sport} 
								status={event.status} date={String(event.date).slice(11,16).replace("T", " ")} results={event.hasResults} key={index}/>
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EventsPage;
