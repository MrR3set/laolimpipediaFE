import React, {useEffect, useState} from "react"
import ReactCountryFlag from "react-country-flag"

import './Versus.scss';

function Versus({results, saveResults, allowEdits=false, discardResults}) {


	const [data,setData] = useState([{country:'es', name:'', score:""},{country:'es', name:'', score:''}]);

	useEffect(()=>{
		if(results && results.length===2)
			setData(results)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const updateEntry = (value,index) => {
		setData(data.map((e,i)=>i===index?value:e));
	}

    return (
        <div className="versus-wrapper">
			<div className="teams-wrapper">
				{data.map(({name,country,score},i)=>{
					return <TeamResult name={name} country={country} score={score} key={i} allowEdits={allowEdits} index={i} updateEntry={updateEntry}></TeamResult>
				})}
			</div>

			<div className="results-controls">
				<button className="cta" onClick={(e)=>{e.preventDefault(); saveResults(data)}}>Guardar resultados</button>
			</div>
		</div>
    );
}

export default Versus;

const TeamResult = ({country='es', name, score=0, allowEdits, index, updateEntry}) => {

	const [teamData,setTeamData] = useState({country:'es', name:"", score:5});
	const [editing,setEditing] = useState(false);

	useEffect(()=>{
		setTeamData({country,name,score});
	},[country,name,score]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setTeamData({...teamData, [e.target.name]:e.target.value})
	}

	const discardChanges = () => {
		setTeamData({country,name,score});
		setEditing(false);
	}

	const saveChanges = () => {
		updateEntry(teamData,index)
		setEditing(false);
	}

	return <div className="team-wrapper">
		<ReactCountryFlag countryCode={teamData.country} svg className="flag"/>
		{editing?<>
			<input name="score" type="number" className="score" value={teamData.score} placeholder="0" onChange={onChangeHandler}></input>
			<input name="country" className="title" value={teamData.country} placeholder="Pais" onChange={onChangeHandler}></input>
			<input name="name" className="title" value={teamData.name} placeholder="Titulo" onChange={onChangeHandler}></input>
		</>:<>
			<p className="score">{teamData.score}</p>
			<h1 className="title">{teamData.name}</h1>
		</>}


		{allowEdits?<div className="controls">
			{editing?
				<>
					<button className="cancel-controls cta" onClick={discardChanges}>C</button>
					<button className="save-controls cta" onClick={saveChanges}>G</button>
				</>:<>
					<button className="edit-controls cta" onClick={(e)=>{e.preventDefault(); setEditing(true)}}>E</button>
				</>
			}
		</div>:null}


	</div>

}
