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

const TeamResult = ({countryCode='es', name, score=0}) => {

	return <div className="team-wrapper">
		<ReactCountryFlag countryCode={countryCode} svg className="flag"/>
		<p className="score">{score}</p>
		<h1 className="title">{name}</h1>
	</div>

}
