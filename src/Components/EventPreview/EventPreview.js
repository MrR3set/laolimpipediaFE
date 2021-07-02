
import React from 'react';
import {useHistory, Link} from 'react-router-dom';

function EventPreview({id, date, name, status, results}) {

	return (
		<tr className="eventPreview-wrapper">
			<td>
				{date}
			</td>
			<td>
				{name}
			</td>
			<td>
				{status}
			</td>
			<td>
				<Link to={"/admin/eventos/" + id }>{results ? "Resultados" : "Participantes"}</Link>
			</td>
		</tr>
	)

}

export default EventPreview;
