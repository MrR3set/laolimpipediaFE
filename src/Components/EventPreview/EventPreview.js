
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

function EventPreview({id, date, sport, name, status, results, setFilter, filter, allowEdits, round}) {

	const filterSport = () => {
		if(filter===sport){
			setFilter("");
		}else{	
			setFilter(sport);
		}
	}

	return (
		<tr className="eventPreview-wrapper">
			<td>
				{date}
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
