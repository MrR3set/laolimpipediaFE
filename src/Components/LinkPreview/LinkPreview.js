import {useEffect, useState } from 'react';
import axios from "axios"

function LinkPreview({data}) {
	// Here we get all the events...
	const [previewData,setPreviewData] = useState({});


	console.log(data)

	useEffect(()=>{
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
			console.log("done", slowDat)
			setPreviewData({...data, ...slowDat})
		})
			
		
	},[]);

	return (
		<div className="linkPreview-wrapper">
			<div className="image"></div>
			<div className="content">
				<h1>{previewData.title}</h1>
				<img src={previewData.image}></img>
				<p>{previewData.description}</p>
			</div>
		</div>
	);
}

export default LinkPreview;



