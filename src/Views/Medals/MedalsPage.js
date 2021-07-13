
import './MedalsPage.scss';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import {useEffect, useState} from 'react';
import ReactCountryFlag from 'react-country-flag';

function MedalsPage({allowEdits=false}) {

	const [medalData,setMedalData] = useState([])
	// const [filter, setFilter] = useState("gold");
	// const [ascendingFilter, setAscendingFilter] = useState(true);

	const [filterConfig,setFilterConfig] = useState({key:"gold", ascending:true})


	useEffect(()=>{
		axiosWithAuth().get("admin/medals").then(res=>{
			setMedalData(res.data);
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const uploadChanges = (id, data) => {
		console.log(id,data)
		axiosWithAuth().put("admin/medals/" + id, data).then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})
	}

	medalData.sort((a,b)=>{
		if(Number(a[filterConfig.key]) < Number(b[filterConfig.key])){
			return filterConfig.ascending?1:-1;
		}
		if(Number(a[filterConfig.key]) > Number(b[filterConfig.key])){
			return filterConfig.ascending?-1:1;
		}
		return 0
	})

	const handleFilter = (key) => {
		if(key === filterConfig.key){
			setFilterConfig({...filterConfig, ascending:!filterConfig.ascending})
		}else{
			setFilterConfig({key, ascending:true})
		}
	}

	return (
		<div className="medals-page-wrapper page">

			<div className="header">
				<img className="background" src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80" alt="Carrousel background"></img>
				<h1>Medallero</h1>
			</div>
			

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th onClick={()=>{handleFilter("gold")}}>Pos</th>
							<th onClick={()=>{handleFilter("country")}}>Pais</th>
							<th className="medalType" onClick={()=>{handleFilter("gold")}}>Oro</th>
							<th className="medalType" onClick={()=>{handleFilter("silver")}}>Plata</th>
							<th className="medalType" onClick={()=>{handleFilter("bronce")}}>Bronce</th>
							{allowEdits?<th className="controls"></th>:null}
						</tr>
					</thead>
					<tbody>
						{medalData.map(({countryCode, country, gold, silver, bronce, id},i)=>{
							return <TableRow countryCode={countryCode} country={country} gold={gold} silver={silver} bronce={bronce} key={i} id={id} allowEdits={allowEdits} uploadChanges={uploadChanges} position={i+1}/>
						})}
					</tbody>

				</table>

			</div>

		</div>
	);
}

export default MedalsPage;



const TableRow = ({countryCode,country, allowEdits, gold, silver, bronce, id, uploadChanges, position}) => {

	const [editing,setEditing] = useState(false);
	const [newInfo, setNewInfo] = useState({gold:"0", silver:"0", bronce:"0"})

	useEffect(()=>{
		if(editing===true)
			setNewInfo({gold:String(gold), silver:String(silver), bronce:String(bronce)})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[editing]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setNewInfo({...newInfo, [e.target.name]:e.target.value});
	}

	const saveChanges = (e) => {
		e.preventDefault();
		setEditing(false);
		uploadChanges(id,newInfo)
	}

	const cancelChanges = (e) => {
		e.preventDefault();
		setNewInfo({gold,silver,bronce});
		setEditing(false);
	}

	return (
		<tr>
			<td>
				{position}º
			</td> 	
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
					{gold}
				</td>
				<td>
					{silver}
				</td>
				<td>
					{bronce}
				</td>
			</>}

			{allowEdits
				?editing?<>
					<button className="cta" onClick={saveChanges}>S</button>
					<button className="cta" onClick={cancelChanges}>C</button>
				</>:<>
					<button className="cta" onClick={()=>{setEditing(true)}}>E</button>
					{/* <button className="cta" onClick={()=>{uploadChanges(id,newInfo)}}>U</button> */}
				</>
			:null}
		</tr> 	

	);


  };