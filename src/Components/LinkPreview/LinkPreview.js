import {useEffect, useState } from 'react';
import axios from "axios"
import "./LinkPreview.scss"

function LinkPreview({data}) {
	const [previewData,setPreviewData] = useState({});

	useEffect(()=>{
		// let slowDat = {};
		// // axios.get("0.0.0.0:8080/" + data.url).then(res=>{
		// axios.get("https://cors-anywhere.herokuapp.com/" + data.url).then(res=>{
		// 	let htmlContent = (new DOMParser).parseFromString(res.data,"text/html");
		// 	["title","image","description","site_name"].forEach((tag)=>{
		// 		if(htmlContent.querySelector(`meta[property='og:${tag}']`)){
		// 			slowDat[tag]=htmlContent.querySelector(`meta[property='og:${tag}']`).content
		// 		}else{
		// 			slowDat[tag]=data[tag];
		// 		}
		// 	})
		// 	if(!data["platform"])
		// 		slowDat["domain"] = String(data.url).split("/")[2].replace("www."," ");
		// }).finally(()=>{
		// 	console.log("done", slowDat)
		// 	setPreviewData({...data, ...slowDat})
		// })

		setPreviewData({activeDate: "2021-06-25T12:25:25.000Z",
		created: "2021-07-07T03:27:01.891Z",
		deleted: null,
		description: "Hi, I play survival games and stuff. ",
		domain: " twitch.tv",
		id: 2,
		image: "https://static-cdn.jtvnw.net/jtv_user_pictures/254d5df2-8e55-4f5a-b767-7c1c87d86547-profile_image-300x300.jpg",
		site_name: "Twitch",
		title: "St1mpee - Twitch",
		updated: "2021-07-07T03:27:01.891Z",
		url: "https://www.twitch.tv/st1mpee"})
			
	},[]);

	console.log(previewData)


	return (
		<div className="linkPreview-wrapper">
			<div className="image-wrapper">
				<img src={previewData.image}></img>
			</div>
			<div className="content-wrapper">
		
				<h1 className="title">{previewData.title}</h1>
		
				<div className="description">
					<p>{previewData.description}</p>
				</div>
				<div className="info">
					<p className="domain">{previewData.domain}Domain</p>
					{/* <p className="date">{previewData.activeDate}</p> */}
					<p className="date">{String(previewData.activeDate).slice(0,16).replace("T", " ")}</p>


					
				</div>
			</div>
		</div>
	);
}

export default LinkPreview;



