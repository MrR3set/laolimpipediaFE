
import './EventsPage.scss';
import EventPreview from "../../Components/EventPreview/EventPreview";
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import DatePicker from '../../Components/Datepicker/DatePicker';

function EventsPage({allowEdits=false}) {
	const [events,setEvents] = useState([]);
	const [dateFilter,setDateFilter] = useState('');
	const [initialDate, setInitialDate]= useState() // Date that will be filtered on first load and when date is cleared
	const [sportFilter,setSportFilter] = useState("");

	useEffect(()=>{
		axiosWithAuth().get(`admin/events`).then(res=>{
			setEvents(res.data);
		})
	},[])

	useEffect(()=>{
		const today = new Date(Date.now())
		const firstDay = (new Date('2021-07-22'))
		const lastDay = (new Date('2021-08-08'))

		if(today < firstDay){
			setInitialDate(firstDay.toISOString().slice(0,10))
		}else if(today > lastDay){
			setInitialDate(lastDay.toISOString().slice(0,10))
		}else{
			setInitialDate(today.toISOString(0,10))
		}
	},[])

	useEffect(()=>{
		setDateFilter(initialDate);
	},[initialDate])

	useEffect(()=>{
		if(sportFilter==="" && dateFilter===""){
			setDateFilter(initialDate);
		}else if(sportFilter==="" && dateFilter!==""){
			setDateFilter(dateFilter);
		}else{
			setDateFilter("");
		}
	},[sportFilter]);

	useEffect(()=>{
		if(dateFilter!=="")
			setSportFilter("")
	},[dateFilter]);


	return (
		<div className="events-wrapper page">

			<div className="header">
				<img className="background" src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80" alt="Carrousel background"></img>
				<h1>Horarios</h1>
			</div>

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
							<th>Evento</th>
							<th>Ronda</th>
							<th>Estado</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{events.filter(e=>	String(e.date).slice(0,10) === dateFilter || dateFilter==="" ).filter(e=>	String(e.sport) === sportFilter || sportFilter==="" ).map((event,index)=>{
							return <EventPreview id={event.id} name={event.name} sport={event.sport} setFilter={setSportFilter} filter={sportFilter}
								status={event.status} date={String(event.date).slice(11,16).replace("T", " ")} results={event.hasResults} key={index} allowEdits={allowEdits} round={event.round}/>
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EventsPage;
