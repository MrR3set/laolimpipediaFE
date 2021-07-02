import React, {useEffect, useState} from "react"
import ReactCountryFlag from "react-country-flag"

import './Table.scss';

function Table({results,saveResults}) {

	const [data,setData] = useState([]);

	// Todo
	const [allowEdits,setAllowEdits] = useState(true);

	useEffect(()=>{
		if(results)
			setData(results)
	},[results]);

	const addNewAthlete = (newAthlete) => {
		setData([...data, newAthlete]);
	}
	
	const updateEntry = (value,index) => {
		setData(data.map((e,i)=>i===index?value:e));
	}

	const deleteEntry = (index) => {
		setData(data.filter((e,i)=>i!==index));
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
						return <TableRow name={name} country={country} score={score} key={i} index={i} updateEntry={updateEntry} deleteEntry={deleteEntry}/>
					})}
				</tbody>
        	</table>
			{
				// TODO
				allowEdits?
					<>
						<TableRow isNew={true} updateEntry={addNewAthlete}/>
					</>
				:null
			}

			<button onClick={(e)=>{e.preventDefault(); saveResults(data)}}>Guardar resultados</button>
		</div>
    );
}

export default Table;

const TableRow = ({name,country, allowEdits, score, index, updateEntry, isNew=false, deleteEntry}) => {

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
			updateEntry({name:newInfo.name, country:newInfo.country, score:newInfo.score>0?score:null}, index);
			setEditing(false);
		}
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
					<button onClick={()=>{setEditing(false); deleteEntry(index)}}>D</button>
				</>}
			</>:<button onClick={()=>{setEditing(true)}}>E</button>}

		</tr> 	

	);


  };
