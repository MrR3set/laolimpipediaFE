import React, {useEffect, useState} from "react"
import ReactCountryFlag from "react-country-flag"

import './Versus.scss';

function Versus({results, saveResults, discardResults, allowEdits=false}) {

	const [data,setData] = useState([{countryCode:'es', name:"", score:5},{countryCode:'es', name:"", score:5}]);

	useEffect(()=>{
		if(results)
			setData(results)
	},[results]);
	

    return (
        <div className="versus-wrapper">
			<div className="teams-wrapper">
				{results.map(({name,countryCode,score},i)=>{
					return <TeamResult name={"Team X"} countryCode={countryCode} score={score} key={i}></TeamResult>
				})}
			</div>
		</div>
    );
}

export default Versus;

const TeamResult = ({countryCode='es', name, score=0, allowEdits, index, updateEntry}) => {

	const [teamData,setTeamData] = useState({countryCode:'es', name:"", score:5});
	const [editing,setEditing] = useState(false);

	useEffect(()=>{
		setTeamData({countryCode,name,score});
	},[]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setTeamData({...teamData, [e.target.name]:e.target.value})
	}

	const discardChanges = () => {
		setTeamData({countryCode,name,score});
		setEditing(false);
	}

	const saveChanges = () => {
		updateEntry(teamData,index)
		setEditing(false);
	}

	return <div className="team-wrapper">
		<ReactCountryFlag countryCode={teamData.countryCode} svg className="flag"/>
		{editing?<>
			<input name="score" type="number" className="score" value={teamData.score} placeholder="Titulo" onChange={onChangeHandler}></input>
			<input name="countryCode" className="title" value={teamData.countryCode} placeholder="Pais" onChange={onChangeHandler}></input>
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
