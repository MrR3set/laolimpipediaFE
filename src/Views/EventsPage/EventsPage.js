
import './EventsPage.scss';
import EventPreview from "../../Components/EventPreview/EventPreview";
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import DatePicker from '../../Components/Datepicker/DatePicker';

function EventsPage({allowEdits=false}) {
	const [events,setEvents] = useState([]);
	const [dateFilter,setDateFilter] = useState("2021-06-30");
	const [sportFilter,setSportFilter] = useState("");

	useEffect(()=>{
		axiosWithAuth().get(`admin/events`).then(res=>{
			setEvents(res.data);
		})
	},[])

	useEffect(()=>{
		setDateFilter("");
	},[sportFilter]);

	useEffect(()=>{
		setSportFilter("")
	},[dateFilter]);


	return (
		<div className="events-wrapper page">
			{allowEdits?
				<div className="controls">
					<Link to="/admin/eventos/new" className="cta">Añadir evento</Link>
				</div>
			:null}
			<DatePicker startDate='2021-07-22' endDate='2021-08-08' setFilter={setDateFilter} filter={dateFilter}/>
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
						{events.filter(e=>	String(e.date).slice(0,10) === dateFilter || dateFilter==="" ).filter(e=>	String(e.sport) === sportFilter || sportFilter==="" ).map((event,index)=>{
							return <EventPreview id={event.id} name={event.name} sport={event.sport} setFilter={setSportFilter} filter={sportFilter}
								status={event.status} date={String(event.date).slice(11,16).replace("T", " ")} results={event.hasResults} key={index}/>
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EventsPage;
