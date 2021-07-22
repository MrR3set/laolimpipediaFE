
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
			setInitialDate(today.toISOString().slice(0,10))
		}
	},[])

	useEffect(()=>{
		setDateFilter(initialDate);
	},[initialDate])

	useEffect(()=>{
		if(dateFilter!=="")
			setSportFilter("")
	},[dateFilter]);

	const toggleSportFilter = (filter) =>	{
		if(filter===''){
			setDateFilter(initialDate);
			setSportFilter("");
		}else{
			setDateFilter('')
			setSportFilter(filter);
		}
	}

	return (
		<div className="events-wrapper page">

			<div className="header">
				<img className="background" src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80" alt="Carrousel background"></img>
				<h1>Horarios</h1>
			</div>


			<div className="info">

				<p>Este portal, para facilitar la accesibilidad a la representación nacional y siguiendo la línea de nuestro trabajo durante todo el ciclo, únicamente recoge los horarios y resultados en directo de los españoles. Para acceder al calendario completo, visita la web oficial de <a target="_blank" href="https://olympics.com/">Tokio 2020</a></p>

				<p className="notes">Los eventos con asterisco* dependen de si se consigue la clasificación a esa ronda o no; podrán ser borrados de este calendario si se produce la eliminación del deportista en fases o rondas previas</p>

				<p className="notes">Pincha sobre el nombre de cada modalidad en la columna “deporte” para filtrar los horarios y el calendario únicamente de ese deporte</p>
				
				<p className="notes">En una gran parte de las pruebas faltan por confirmarse los cuadros y/o turnos de participación, por lo que sus respectivos horarios aparecen de forma aproximada o en la franja horaria que la organización les ha asignado. Conforme vayan confirmándose los horarios exactos de todas las rondas y pruebas que quedan por hacerlo, estos calendarios diarios irán actualizándose al minuto</p>

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
							<th>{sportFilter!==""?"Fecha":"Hora"}</th>
							<th>Deporte</th>
							<th>Evento</th>
							<th>Ronda</th>
							<th>Estado</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{/* Use memo would be good here */}
						{events.filter(e=>	String(e.date).slice(0,10) === dateFilter || dateFilter==="" ).filter(e=>	String(e.sport) === sportFilter || sportFilter==="" ).map((event,index)=>{
							return <EventPreview id={event.id} name={event.name} sport={event.sport} 
								setFilter={toggleSportFilter} filter={sportFilter}
								status={event.status} time={String(event.date).slice(11,16).replace("T", " ")} 
								results={event.hasResults} date={String(event.date).slice(5,10)} 
								key={index} allowEdits={allowEdits} round={event.round} isFiltered={sportFilter!==""}/>
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default EventsPage;
