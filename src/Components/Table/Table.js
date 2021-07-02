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

const TableRow = ({name,country, allowEdits, score, index, updateEntry, isNew=false}) => {

	const [editing,setEditing] = useState(false);
	const [newInfo, setNewInfo] = useState({name:'', country:'', score:''})

	useEffect(()=>{
		if(isNew)
			setEditing(true)
		else
			setNewInfo({name,country,score:score?score:0})
	},[]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setNewInfo({...newInfo, [e.target.name]:e.target.value});
	}

	const saveChanges = (e) => {
		e.preventDefault();
		if(isNew){
			updateEntry(newInfo);
		}else{
			updateEntry(newInfo, index);
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
						<input name="country" value={newInfo.country} placeholder="country"  onChange={onChangeHandler}/>
						<input name="name" value={newInfo.name} placeholder="name" onChange={onChangeHandler}/>
					</>:
					<>
						<ReactCountryFlag countryCode={country?country:"es"} svg className="flag"/>
						{name}
					</>
				}
			</td> 	
			<td>
				{editing && !isNew?
					<input name="score" value={newInfo.score} placeholder="score" type="number"  onChange={onChangeHandler}/>
					:
					score
				}
			</td>

			{editing?<>
				{isNew?
				<>
					<button onClick={saveChanges}>Añadir atleta</button>
				</>
				:<>
				<button onClick={saveChanges}>S</button>
				<button onClick={cancelChanges}>C</button>
			</>:<button onClick={()=>{setEditing(true)}}>E</button>}

		</tr> 	

	);


  };
