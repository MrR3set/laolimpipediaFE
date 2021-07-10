
import React from 'react';
import { Link } from 'react-router-dom';

function EventPreview({id, date, sport, name, status, results, setFilter, filter}) {

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
				{status}
			</td>
			<td>
				<Link className="cta eventlink" to={"/admin/eventos/" + id }>{results ? "Resultados" : "Participantes"}</Link>
			</td>
		</tr>
	)

}

export default EventPreview;
