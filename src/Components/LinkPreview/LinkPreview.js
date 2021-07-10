import {useEffect, useState } from 'react';
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
import "./LinkPreview.scss";
import Logo from "../../Assets/Logo.png"

function LinkPreview({data, allowEdits=false,deleteLink}) {
	const [previewData,setPreviewData] = useState({});

	useEffect(()=>{
		if(!data) 
			return
		let slowDat = {};
		axiosWithAuth().get("https://cors-anywhere.herokuapp.com/" + data.url).then(res=>{
			let htmlContent = (new DOMParser()).parseFromString(res.data,"text/html");
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
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);


	return (
		<div className="linkPreview-wrapper">
			<div className="image-wrapper">
				<img className="background" src={previewData.image?previewData.image:Logo} alt="preview background"></img>
				<img className="foreground" src={previewData.image?previewData.image:Logo} alt="preview foreground"></img>
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
			{allowEdits?<button className="cta delete" onClick={()=>{deleteLink(data.id)}}>Borrar</button>:null}
		</div>
	);
}

export default LinkPreview;



