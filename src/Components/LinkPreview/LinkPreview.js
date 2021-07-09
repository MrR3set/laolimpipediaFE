import {useEffect, useState } from 'react';
import axios from "axios"
import "./LinkPreview.scss";
import Logo from "../../Assets/Logo.png"

function LinkPreview({data, allowEdits=false,deleteLink}) {
	const [previewData,setPreviewData] = useState({});

	useEffect(()=>{
		if(!data) 
			return
		let slowDat = {};
		axios.get("https://cors-anywhere.herokuapp.com/" + data.url).then(res=>{
			let htmlContent = (new DOMParser).parseFromString(res.data,"text/html");
			["title","image","description","site_name"].forEach((tag)=>{
				if(htmlContent.querySelector(`meta[property='og:${tag}']`)){
					slowDat[tag]=htmlContent.querySelector(`meta[property='og:${tag}']`).content
				}else{
					slowDat[tag]=data[tag];
				}
			})
			if(!data["platform"])
				slowDat["domain"] = String(data.url).split("/")[2].replace("www."," ");
		}).finally(()=>{
			setPreviewData({...data, ...slowDat})
			// setPreviewData({activeDate: "2021-06-25T12:25:25.000Z",
			// created: "2021-07-07T03:27:01.891Z",
			// deleted: null,
			// description: "Hi, I play survival games and stuff. ",
			// domain: " twitch.tv",
			// id: 2,
			// image: "https://static-cdn.jtvnw.net/jtv_user_pictures/254d5df2-8e55-4f5a-b767-7c1c87d86547-profile_image-300x300.jpg",
			// site_name: "Twitch",
			// title: "St1mpee - Twitch",
			// updated: "2021-07-07T03:27:01.891Z",
			// url: "https://www.twitch.tv/st1mpee"})
		})
	},[]);


	return (
		<div className="linkPreview-wrapper">
			<div className="image-wrapper">
				<img className="background" src={previewData.image?previewData.image:Logo}></img>
				<img className="foreground" src={previewData.image?previewData.image:Logo}></img>
			</div>
			<div className="content-wrapper">
		
				<h1 className="title">{previewData.title}</h1>
		
				<div className="description">
					<p>{previewData.description}</p>
				</div>
				<div className="info">
					<p className="domain">{previewData.domain}Domain</p>
					<p className="date">{String(previewData.activeDate).slice(0,16).replace("T", " ")}</p>
				</div>
			</div>
			<button className="cta delete" onClick={()=>{deleteLink(data.id)}}>Borrar</button>
		</div>
	);
}

export default LinkPreview;



