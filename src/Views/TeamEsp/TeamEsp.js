
import './TeamEsp.scss';
import React from 'react';

function TeamEsp() {
	
	return (
		<div className="TeamEsp-page-wrapper page">

			<div className="header">
				<img className="background" src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80" alt="Carrousel background"></img>
				<h1>Team Esp</h1>
			</div>
			
			<div className="content-wrapper">
				<img src={require(`../../Assets/teamESP_Images/Diapositiva${1}.JPG`).default}></img>

			</div>

		</div>
	);
}

export default TeamEsp;


