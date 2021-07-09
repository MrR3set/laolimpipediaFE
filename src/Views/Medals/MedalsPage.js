
import './MedalsPage.scss';
import axios from "axios";
import {useEffect, useState} from 'react';
import ReactCountryFlag from 'react-country-flag';

function MedalsPage({allowEdits=true}) {

	const [medalData,setMedalData] = useState([])

	useEffect(()=>{
		axios.get("http://localhost:5001/api/admin/medals").then(res=>{
			setMedalData(res.data);
		})
	},[])

	const uploadChanges = (id, data) => {
		console.log(data);
		axios.put("http://localhost:5001/api/admin/medals/" + id, data).then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})

	}

	return (
		<div className="medals-page-wrapper page">

			<div className="header">
				<h1>Medallero</h1>
			</div>

			<table>
				<thead>
					<tr>
						<th>Pais</th>
						<th className="medalType">Oro</th>
						<th className="medalType">Plata</th>
						<th className="medalType">Bronce</th>
						{allowEdits?<th className="controls"></th>:null}
					</tr>
				</thead>
				<tbody>
					{medalData.sort((a,b) => Number(a.score) < Number(b.score) ? 1 : -1).map(({countryCode, country, gold, silver, bronce, id},i)=>{
						return <TableRow countryCode={countryCode} country={country} gold={gold} silver={silver} bronce={bronce} key={i} id={id} allowEdits={allowEdits} uploadChanges={uploadChanges}/>
					})}
				</tbody>

			</table>
		</div>
	);
}

export default MedalsPage;



const TableRow = ({countryCode,country, allowEdits, gold, silver, bronce, id, uploadChanges}) => {

	const [editing,setEditing] = useState(false);
	const [newInfo, setNewInfo] = useState({gold:0, silver:0, bronce:0})

	useEffect(()=>{
		setNewInfo({gold, silver, bronce})
	},[]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setNewInfo({...newInfo, [e.target.name]:e.target.value});
	}

	const saveChanges = (e) => {
		e.preventDefault();
		setEditing(false)
	}

	const cancelChanges = (e) => {
		e.preventDefault();
		setNewInfo({gold,silver,bronce});
		setEditing(false);
	}

	return (
		<tr>
			<td>
				<ReactCountryFlag countryCode={countryCode} svg className="flag"/>
				{country}
			</td> 	

			{editing?<>
				<td>
					<input type="number" min={0} name="gold" value={newInfo.gold} onChange={onChangeHandler}/>
				</td>
				<td>
					<input type="number" min={0} name="silver" value={newInfo.silver} onChange={onChangeHandler}/>
				</td>
				<td>
					<input type="number" min={0} name="bronce" value={newInfo.bronce} onChange={onChangeHandler}/>
				</td>
			</>:<>
				<td>
					{newInfo.gold}
				</td>
				<td>
					{newInfo.silver}
				</td>
				<td>
					{newInfo.bronce}
				</td>
			</>}

			{allowEdits
				?editing?<>
					<button className="cta" onClick={saveChanges}>S</button>
					<button className="cta" onClick={cancelChanges}>C</button>
				</>:<>
					<button className="cta" onClick={()=>{setEditing(true)}}>E</button>
					<button className="cta" onClick={()=>{uploadChanges(id,newInfo)}}>U</button>
				</>
			:null}
		</tr> 	

	);


  };