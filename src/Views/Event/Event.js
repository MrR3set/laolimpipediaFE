import './Event.scss';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Table from "../../Components/Table/Table";
import Versus from "../../Components/Versus/Versus";
import { Link } from "react-router-dom";

function EventPage({allowEdits=false}) {
	const {id} = useParams();
	const history = useHistory()
	const isNew = id === 'new'

	const [event,setEvent] = useState({});
	const [editing, setEditing] = useState(false);
	const [addResults,setAddResults]=useState(false);
	const [results,setResults]=useState([]);
	const [links,setLinks]=useState([]);
	const [addLinks,setAddLink] = useState(false);
	const [linkData,setLinkData] = useState({name:"",link:"",date:""})

	useEffect(()=>{
		if(isNew)
			setEditing(true);
	},[isNew]);

	useEffect(()=>{
		if (!isNew && !Object.keys(event).length > 0)
			axiosWithAuth().get(`admin/events/${id}`).then(res=>{
				setEvent(res.data);
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(()=>{
		if(event.results){
			setResults(event.results[0])
		}
		if(event.relatedLinks){
			setLinks(event.relatedLinks[0])
		}
	},[event]);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setEvent({...event, [e.target.name]:e.target.value});
	}

	const onChangeHandlerLinks = (e) => {
		e.preventDefault();
		setLinkData({...linkData, [e.target.name]:e.target.value});
	}

	const uploadLinks = (e) => {
		e.preventDefault();
		axiosWithAuth().post(`admin/events/${id}/links`, {relatedLinks:{0:links}}).then(res=>{
			console.log(res)
		})
	}

	const saveLink = (e) => {
		e.preventDefault();
		setLinks([...links, linkData])
		setAddLink(false);
	}

	const deleteLink = (e,index) => {
		e.preventDefault();
		setLinks(links.filter((e,i)=>i!==index));
	}
	
	const handleSave = (e) => {
		e.preventDefault();
		setEditing(false);
	}

	const pushUpdate = (e) => {
		e.preventDefault();
		if(isNew){
			axiosWithAuth().post(`admin/events/`, event).then(res=>{
				history.push('/admin/eventos/'+res.data.id)
			})
		}else{
			axiosWithAuth().put(`admin/events/${id}`, event).then(res=>{
	
			})
		}

	}

	const saveResults = (newValues) => {
		const isDiff = (arrA,arrB) => {
			if(arrA.length !== arrB.length ){
				return true
			}else{
				return !arrA.every((e,i)=>{
					return e===arrB[i]
				})
			}
		}	

		if(!event.results || (event.results[0] && newValues.length > 0 && isDiff(newValues,event.results[0])) ){
			axiosWithAuth().post(`admin/events/${id}`, {results:{0:newValues}}).then(res=>{
				setEvent({...event, results:res.data.results})
			})
		}	
	}

	const deleteEvent = () => {
		
		let confirmation = window.confirm("Confirmar")
		
		if(confirmation)
		axiosWithAuth().delete(`admin/events/${id}`).then(res=>{
				history.push('/admin/eventos')
			})
	}

	const discardResults = (e) => {
		e.preventDefault();
		if(event.results){
			setResults(event.results[0])
		}
		setAddResults(false);
	}

	const resultType = () => {
		if(event.type === "table")
			return <Table results={results} saveResults={saveResults} discardResults={discardResults} allowEdits={allowEdits}/>
		else if(event.type==="bracket")
			return <Versus results={results} saveResults={saveResults} allowEdits={allowEdits}/>
	}
	
	return (
		<div className="event-wrapper page">

			<div className="header">
				{editing?<>
					<div className="left">
						<input	className="title" name="name" placeholder="titulo" value={event.name} onChange={onChangeHandler}/>
					
						<input className="date" name="date" placeholder="fecha" type="datetime-local" value={String(event.date).slice(0,16)} onChange={onChangeHandler}/>
						
						<select className="type" name="type" onChange={onChangeHandler} defaultValue={event.type?event.type:"info"}>
							<option value="info" disabled>Tipo de competicion</option>
							<option value="bracket">Bracket</option>
							<option value="table">Table</option>
						</select>

						<select className="status" name="status" onChange={onChangeHandler} defaultValue={event.status?event.status:"info"}>
							<option value="info" disabled>Estado</option>
							<option value="Oficial">Oficial</option>
							<option value="Directo">En Directo</option>
							<option value="Programado">Programado</option>
						</select>
						
						<input className="sport" name="sport" placeholder="deporte" value={event.sport} onChange={onChangeHandler}/>
					</div>

					<div className="right">
						<div className="controls">
							<button className="save-controls cta" onClick={handleSave}>Guardar cambios</button>
						</div>
					</div>
				</>:<>
					<div className="left">
						<h1 className="title">{event.name}</h1>
						<p className="date">{String(event.date).slice(0,16).replace("T", " - ")}</p>
						<p className="sport">{event.sport}</p>
					</div>

					<div className="right">
						{allowEdits?<div className="controls">
							{editing?<><button className="save-controls cta" onClick={handleSave}>Guardar cambios</button></>:<>
								<button className="save-controls cta" onClick={pushUpdate}>Subir cambios</button>
								<button className="delete-controls cta" onClick={deleteEvent}>Borrar evento</button>
								<button className="edit-controls cta" onClick={(e)=>{e.preventDefault(); setEditing(true)}}>Editar</button>
							</>}
						</div>:null}
					</div>

				</>}
			</div>


			<div className="content">
				{results.length>0 || addResults
				?
					<>
						{resultType()}
					</>
				:allowEdits?<div className="results-controls">
					<button className="cta" onClick={(e)=>{e.preventDefault(); setAddResults(true)}}>Añadir resultados</button>
				</div>:null}
			</div>

			<div className="links">
				<h1 className="title">Eventos relacionados</h1>



					
				{links.map((link,i)=>{
					return <div className="link-wrapper">
						<Link to={link.path} key={i} className="link">{link.name}</Link>
						{allowEdits?<button className="cta" onClick={(event)=>{deleteLink(event,i)}}>Borrar</button>:null}
					</div>
				})}
				
				{addLinks?
					<div className="form">
						<input name="path" placeholder="Link" onChange={onChangeHandlerLinks}/>
						<input name="name" placeholder="Nombre" onChange={onChangeHandlerLinks}/>
						<button className="cta" onClick={saveLink}>guardar</button>
					</div>
				:null}


				{allowEdits?<div className="controls">
						<button className="cta" onClick={(e)=>{e.preventDefault(); setAddLink(true)}}>+</button>
						<button className="cta" onClick={uploadLinks}>Subir links</button>
					</div>
				:null}



			</div>
		</div>
	);
}

export default EventPage;
