
import './EventPage.scss';
import EventPreview from "../../Components/EventPreview/EventPreview";
import axios from "axios";
import {useEffect, useState} from 'react';

function EventPage() {
	// Here we get all the events...

	const [events,setEvents] = useState([])

	useEffect(()=>{
		axios.get("http://localhost:5001/api/admin/events").then(res=>{
			setEvents(res.data);
		})
	},[])

	console.log(events)

	return (
		<div className="event-page">
			<table>
				<thead>
					<tr>
						<th>Hora</th>
						<th>Deporte</th>
						<th>Estado</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{events.map((event,index)=>{
						return <EventPreview id={event.aId} name={event.sName} sport={event.sSport} 
							status={event.sStatus} date={event.tDate} results={event.bHasResults} key={index}/>
					})}
				</tbody>
        	</table>
		</div>
	);
}

export default EventPage;
