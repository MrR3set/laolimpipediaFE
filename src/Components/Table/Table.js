import React, {useEffect, useState} from "react"
import ReactCountryFlag from "react-country-flag"

import './Table.scss';

function Table({results, saveResults, discardResults, allowEdits=false}) {

	const [data,setData] = useState([]);

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

    return (
        <div className="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>nombre</th>
						<th>resultado</th>
						{allowEdits?<th></th>:null}
					</tr>
				</thead>
				<tbody>
					{data.sort((a,b) => Number(a.score) < Number(b.score) ? 1 : -1).map(({name,country, score},i)=>{
						return <TableRow name={name} country={country} score={score} key={i} index={i} updateEntry={updateEntry} deleteEntry={deleteEntry} allowEdits={allowEdits}/>
					})}
				</tbody>
        	</table>
			{allowEdits?
				<>
					<TableRow isNew={true} updateEntry={addNewAthlete}/>
				</>
			:null}

			<div className="controls">
				<button className="cta" onClick={(e)=>{e.preventDefault(); saveResults(data)}}>Guardar resultados</button>
				<button className="cta" onClick={discardResults}>Descartar cambios</button> 
			</div>
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

	useEffect(()=>{
		setNewInfo({name,country,score:score?score:0});
	},[editing]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setNewInfo({...newInfo, [e.target.name]:e.target.value});
	}

	const saveChanges = (e) => {
		e.preventDefault();

		if(isNew){
			updateEntry(newInfo);
		}else{
			updateEntry({name:newInfo.name, country:newInfo.country, score:newInfo.score>0?newInfo.score:null}, index);
			setEditing(false);
		}
		setNewInfo({name:'', country:'', score:''})
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
						<input name="country" value={newInfo.country} placeholder="cc"  onChange={onChangeHandler}/>
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

			{isNew?<button className="cta addNew" onClick={saveChanges}>Añadir atleta</button>:null}

			{allowEdits
				?editing?<>
					<button className="cta" onClick={saveChanges}>S</button>
					<button className="cta" onClick={cancelChanges}>C</button>
					<button className="cta delete" onClick={()=>{setEditing(false); deleteEntry(index)}}>D</button>
				</>:<button className="cta" onClick={()=>{setEditing(true)}}>E</button>
			:null}

		</tr> 	

	);


  };
