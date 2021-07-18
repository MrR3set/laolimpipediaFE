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
						<th>posición</th>
						{allowEdits?<th></th>:null}
					</tr>
				</thead>
				<tbody>
					{data.sort((a, b) => {
						// First clean all non numeric values 
						if(typeof(a.position) === "undefined")
							return 1	
						
						if(a.position === "")
							return 1
			
						if(typeof(a.position) === "undefined")
							return -1

						if(b.position === "")
							return -1

						if (Number(a.position) > Number(b.position))
							return 1
						if (Number(a.position) < Number(b.position))
							return -1

						return 0
					}).map(({name, country, score, position}, i) => {
						return <TableRow name={name} country={country} score={score} key={i} index={i} position={position} updateEntry={updateEntry} deleteEntry={deleteEntry} allowEdits={allowEdits} />
					})}
				</tbody>
        	</table>
			{allowEdits?
				<>
					<TableRow isNew={true} updateEntry={addNewAthlete}/>
					<div className="controls">
						<button className="cta" onClick={(e)=>{e.preventDefault(); saveResults(data)}}>Guardar resultados</button>
						<button className="cta" onClick={discardResults}>Descartar cambios</button> 
					</div>
				</>
			:null}
		</div>
    );
}

export default Table;

const TableRow = ({name,country, allowEdits, score, index, updateEntry, isNew=false, deleteEntry, position}) => {

	const [editing,setEditing] = useState(false);
	const [newInfo, setNewInfo] = useState({name:'', country:'es', score:'', position:''})

	useEffect(()=>{
		if(isNew)
			setEditing(true)
		else
			setNewInfo({name,country,score:score?score:0, position})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(()=>{
		setNewInfo({name,country,score:score?score:0,position});
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			updateEntry({name:newInfo.name, country:newInfo.country, score:newInfo.score, position:newInfo.position}, index);
			setEditing(false);
		}
		setNewInfo({name:'', country:'', score:'', position:''})
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
					<input name="score" type="text" value={newInfo.score} placeholder="Marcador"  onChange={onChangeHandler}/>
					:
					score
				}
			</td>
			<td>
				{editing && !isNew?
					<input name="position" value={newInfo.position} placeholder="Posicion"  onChange={onChangeHandler}/>
					:
					position
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
