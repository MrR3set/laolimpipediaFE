
import React from 'react';
import {useHistory, Link} from 'react-router-dom';

function EventPreview({id, date, sport, name, status, results}) {

	return (
		<tr className="eventPreview-wrapper">
			<td>
				{date}
			</td>
			<td>
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
