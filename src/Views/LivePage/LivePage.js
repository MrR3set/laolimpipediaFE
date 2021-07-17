import {useEffect, useState } from 'react';
import LinkPreview from '../../Components/LinkPreview/LinkPreview';
import { axiosWithAuth } from '../../Utils/axiosWithAuth';
import { ReactComponent as AddIcon } from '../../Assets/PlusIconRounded.svg';
import "./LivePage.scss";
import Logo from "../../Assets/Logo.png"
import tdp from "../../Assets/tdp.jpg";
import eurosport from "../../Assets/eurosport.jpg"
import seguimiento from "../..//Assets/comoseguir.jpg"


const starredLinks = [
	{title:"Instagram", url:"https://www.instagram.com/laolimpipedia", image:Logo},
	{title:"Twitch", url:"https://www.twitch.tv/laolimpipedia", image:Logo},
	{title:"Teledeporte", url:"https://www.rtve.es/play/videos/directo/tdp/", image:tdp},
	{title:"Eurosport", url:"https://www.eurosportplayer.com/", image:eurosport},
]

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

			<div className="header">
				<img className="background" src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80" alt="Carrousel background"></img>
				<h1>¿Cómo seguir los Juegos?</h1>
			</div>
 
			<img src={seguimiento} alt="??"/>
			<p>Pincha en los siguientes enlaces:</p>


			{starredLinks.map((starredLinks,i)=>{
				// Move this to Link Preview. it didnt want to work properly... image wise
				return <a className="linkPreview-wrapper" href={starredLinks.url} target="_blank">
						<div className="image-wrapper">
								<img className="background" src={starredLinks.image} alt="preview background"></img>
								<img className="foreground" src={starredLinks.image} alt="preview foreground"></img>
					</div>

					<div className="content-wrapper">
					
							<h1 className="title">{starredLinks.title}</h1>
					
							<div className="description">
								<p>{starredLinks.description}</p>
							</div>
							<div className="info">
								<p className="domain">{starredLinks.domain}</p>
								{starredLinks.date?<p className="date">{String(starredLinks.activeDate).slice(0,16).replace("T", " ")}</p>:null}
							</div>
						</div>
					</a>
			})}

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



