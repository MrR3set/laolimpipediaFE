import React, {useEffect, useState} from "react"
import ReactCountryFlag from "react-country-flag"

import './Table.scss';

function Table({results}) {


	const [data,setData] = useState([{name: "sa", country: "as"},
	{name: "qc", country: "us"}]);
	const [athleteInfo, setAthleteInfo] = useState({name:'', country:''});

	const [allowEdits,setAllowEdits] = useState(true);
	const [editing,setEditing] = useState(true)




	useEffect(()=>{
		if(results[0])
			setData(results)
	},[]);
	useEffect(()=>{
		console.log(data)
	},[data]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setAthleteInfo({...athleteInfo, [e.target.name]:e.target.value});
	}

	const addNewAthlete = (e) => {
		e.preventDefault();
		setData([...data, athleteInfo]);
		setAthleteInfo({name:'', country:''});
	}
	
	const toggleEdit = (e) => {
		e.preventDefault();
		setEditing(!editing)
	}

	// data = data.sort((a,b) => a.score < b.score ? 1 : -1)

    return (
        <div className="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>nombre</th>
						<th>resultado</th>
					</tr>
				</thead>
				<tbody>
					{data.map(({name,country, score},i)=>{
						return <TableRow name={name} country={country} score={score} key={i} index={i}/>
					})}
				</tbody>
        	</table>
			{
				// TODO
				allowEdits?
					<>
						<input name="country" placeholder="country" value={athleteInfo.country} onChange={onChangeHandler}/>
						<input name="name" placeholder="name" value={athleteInfo.name} onChange={onChangeHandler} />
						<button onClick={addNewAthlete}>Add athlete</button>
					</>
				:null
			}
		</div>
    );
}

export default Table;

const TableRow = ({name,country, allowEdits, score}) => {

	const [editing,setEditing] = useState(true);
	const [newInfo, setNewInfo] = useState({name:'', country:'', score:''})

	useEffect(()=>{
		setNewInfo({name,country,score})
	},[name,country,score])


	const saveChanges = (e) => {
		e.preventDefault();
		setEditing(false);
	}

	const cancelChanges = (e) => {
		e.preventDefault();
		setNewInfo({name,country,score});
		setEditing(false);
	}

	return (
		<tr>
			<td>
				{editing?
					<>
						<ReactCountryFlag countryCode={country} svg className="flag"/>
						<input name="name" value={newInfo.name}/>
					</>:
					<>
						<ReactCountryFlag countryCode={country} svg className="flag"/>
						{name}
					</>
				}
			</td> 	
			<td>
				{score}
			</td>

			{editing?<>
				<button onClick={saveChanges}>S</button>
				<button onClick={cancelChanges}>C</button>
			</>:<button onClick={()=>{setEditing(true)}}>E</button>}

		</tr> 	

	);


  };
