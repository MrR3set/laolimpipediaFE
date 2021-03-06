import React, { useState, useEffect } from 'react';
import './Carrousel.scss';
import { Link } from "react-router-dom"

function Carrousel({items=[], autoPlay=true}) {
    const target = React.createRef();
    
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollSize, setScrollSize] = useState(0);

	useEffect(()=>{
		setScrollSize(items.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(()=>{
		if(autoPlay)
			setInterval(()=>{
				scrollToNextPage("next")
			},5000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[target])

    useEffect(()=>{
        target.current.addEventListener('scroll', scrollListener);
		// eslint-disable-next-line
        return () => target.current && target.current.removeEventListener('scroll', scrollListener);
    })

    const scrollListener = () => {
		if(!target.current)
			return

        const element = target.current;
        const windowScroll = Math.ceil(element.scrollLeft);
        const totalWidth = element.scrollWidth - element.clientWidth;
		const pageSize = element.children[0].offsetWidth; 

        if (windowScroll === 0)
            return setScrollProgress(0);
        
        if(windowScroll > pageSize*(items.length-2))
            return setScrollProgress(items.length-1);


        setScrollProgress(Math.floor((windowScroll/totalWidth) * items.length )  );

    }
    
    const scrollToPage = (i) => {
		if(!target.current)
			return

        const element = target.current;
		const pageSize = element.children[0].offsetWidth; 

        element.scrollTo({
            top:100,
            left:pageSize * i,
            behavior:'smooth'
        })
    }

    const scrollToNextPage = (direction) => {
		if(!target.current)
			return
        const element = target.current;
        const pageSize = element.children[0].offsetWidth; 

		if(direction==="prev" && scrollProgress===0){
			scrollToPage(items.length)
		}else if(direction==="next" && scrollProgress>=items.length-1){
			scrollToPage(0);
		}else{
			element.scrollTo({
				top:100,
				left:  direction==="next"?(element.scrollLeft + pageSize):(element.scrollLeft - pageSize),
				behavior:'smooth'
			})
		}
    }

    return (
        <div className="carrousel-wrapper"> 



			<div className="carrouselView" ref={target}>
				{items.map(({name,path,imageUrl},i)=>{
					return <CarrouselItem name={name} imageUrl={imageUrl} path={path} key={i}/>
				})}
			</div>


			<div className='scrollProgress'>
				{[...Array(scrollSize)].map((e,i)=>{
					return <div className={`step ${scrollProgress===i?"active":''}`}  onClick={()=>{scrollToPage(i)}} key={i}></div>
				})}
			</div>

            <div className="controls next" onClick={()=>{scrollToNextPage("next")}}>
				&#10095;
			</div>
            <div className="controls prev" onClick={()=>{scrollToNextPage("prev")}}>
				&#10094;
			</div>

        </div>
    );

}

export default Carrousel;


const CarrouselItem = ({imageUrl,path="/", name=""}) => {
	return (
		<div className="carrousel-Item">
			<img className="foreground" src={imageUrl} alt="Carrousel foreground"></img>
			<img className="background" src={imageUrl} alt="Carrousel background"></img>

			<div className="content">
				<Link to={path} className="title">
					{name}
				</Link>
			</div>
		</div>

	)
}