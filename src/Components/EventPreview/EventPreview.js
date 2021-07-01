
import React from 'react';

function EventPreview({date, name, status, results}) {
	
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
				{results ? "Resultados" : "Participantes"}
			</td>
		</tr>
	)
	
}

export default EventPreview;
