
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function EventPreview({id, time, date, sport, name, status, setFilter, filter, allowEdits, round, isFiltered=false}) {

	const filterSport = () => {
		if(filter===sport){
			setFilter("");
		}else{	
			setFilter(sport);
		}
	}
	

	const [showDate,setShowDate] = useState(false)

	useEffect(()=>{
		if(isFiltered){
			setShowDate(true)
		}else{
			setShowDate(false)
		}
	},[isFiltered])


	return (
		<tr className="eventPreview-wrapper">
			<td>
				{time}
				{showDate?<>
					<br/>{date.slice((0,2) === "07")?"Julio":"Agosto"}
					<br/>{date.slice((2,3))}
				</>:null}
				
			</td>
			<td onClick={filterSport}>
				{sport}
			</td>
			<td>
				{name}
			</td>
			<td>
				{round}
			</td>
			<td>
				{status==="Directo"?"En directo":status}
			</td>
			<td>
				<Link className={`cta eventlink ${status}`} to={(allowEdits?'/admin/eventos/':'/eventos/') + id}>Resultados</Link>
			</td>
		</tr>
	)

}

export default EventPreview;
