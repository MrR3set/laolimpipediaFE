import {useEffect, useState } from 'react';
import LinkPreview from '../../Components/LinkPreview/LinkPreview';
import axios from "axios";
import { ReactComponent as AddIcon } from '../../Assets/PlusIconRounded.svg';
import "./LivePage.scss";

function EventPage({allowEdits=true}) {

	const [links,setLinks] = useState([]);



	const [newLink,setNewLink] = useState({url:"",date:"",title:""})

	// useEffect(()=>{
	// 	axios.get(`http://localhost:5001/api/admin/livelinks/`).then(res=>{
	// 		setLinks(res.data);
	// 	})
	// },[]);

	
	return (
		<div className="livePage-wrapper page">

			{/* {links.map(linkData=>{
				return <LinkPreview data={linkData}/>
			})} */}

			<LinkPreview/>


			<div className="linkPreview-wrapper newLink">
				<AddIcon/>
			</div>


		</div>
	);
}

export default EventPage;



