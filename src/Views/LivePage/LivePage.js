import {useEffect, useState } from 'react';
import LinkPreview from '../../Components/LinkPreview/LinkPreview';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import { ReactComponent as AddIcon } from '../../Assets/PlusIconRounded.svg';
import "./LivePage.scss";

function EventPage({allowEdits=false}) {

	const [links,setLinks] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [newLink,setNewLink] = useState({url:"",activeDate:new Date(Date.now()).toISOString().slice(0,19),title:"", description:""})

	useEffect(()=>{
		axiosWithAuth().get(`admin/livelinks/`).then(res=>{
			setLinks(res.data);
		})
	},[]);

	const toggleAdding = () => {
		setIsAdding(!isAdding)
	}

	const onChangeHandler = (e) => {
		e.preventDefault();
		setNewLink({...newLink, [e.target.name]:e.target.value});
	}


	const uploadLink = () => {
		axiosWithAuth().post(`admin/livelinks/`, newLink).then(res=>{
			if(res.status===201)
				setNewLink({url:"",activeDate:new Date(Date.now()).toISOString().slice(0,19),title:"", description:""})
		})
	}

	const deleteLink = (id) => {
		let confirmation = window.confirm("Confirmar")
		if(confirmation)
			axiosWithAuth().delete(`admin/livelinks/${id}`).then(res=>{
				console.log(res);
			})
	}

	
	return (
		<div className="livePage-wrapper page">
 
			{links.map((linkData,i)=>{
				return <LinkPreview data={linkData} deleteLink={deleteLink} allowEdits={allowEdits} key={i}/>
			})} 

			{allowEdits?isAdding?
				<div className="linkPreview-wrapper addLink Form">
					<input name="title" placeholder="Titulo" value={newLink.title} onChange={onChangeHandler}/>
					<input name="description" placeholder="Descripcion" maxLength={50} value={newLink.description} onChange={onChangeHandler}/>
					<input name="url" placeholder="Link" type="url" value={newLink.url} onChange={onChangeHandler}/>
					<input name="activeDate" placeholder="Date" type="datetime-local" value={newLink.activeDate} onChange={onChangeHandler}/>

					<div className="controls">
						<button onClick={uploadLink} className="cta">Guardar</button>
						<button onClick={toggleAdding} className="cta">Cancelar</button>
					</div>

				</div>:<div className="linkPreview-wrapper addLink" onClick={toggleAdding}>
					<AddIcon/>
				</div>
			:null}

		</div>
	);
}

export default EventPage;



