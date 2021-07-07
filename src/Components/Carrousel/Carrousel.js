import React, { useState, useContext, useEffect } from 'react';
import './Carrousel.scss';

function ProductsCarrousel({results=[], className='', title, description}) {
    const target = React.createRef();
    
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollSize, setScrollSize] = useState(4);

	useEffect(()=>{
		console.log(scrollProgress)
	},[scrollProgress])

    useEffect(()=>{
        target.current.addEventListener('scroll', scrollListener);
        return () => target.current && target.current.removeEventListener('scroll', scrollListener);
    })

    const scrollListener = () => {
		if(!target.current)
			return

        const element = target.current;
        const windowScroll = element.scrollLeft;
        const totalWidth = element.scrollWidth - element.clientWidth;
        
        if (windowScroll === 0)
            return setScrollProgress(0);
        
        if(windowScroll > totalWidth)
            return setScrollProgress(4);

        setScrollProgress(Math.floor((windowScroll/totalWidth) * 4 ));

    }
    
    const scrollToPage = (i) => {
		if(!target.current)
			return

        const element = target.current;
        const firstChild = element.children[0]; 

        element.scrollTo({
            top:100,
            left:firstChild.offsetWidth * i,
            behavior:'smooth'
        })
    }

    const scrollToNextPage = (direction) => {
		if(!target.current)
			return
        const element = target.current;
        const pageSize = element.children[0].offsetWidth; 

		if(direction==="prev" && scrollProgress==0){
			scrollToPage(4)
		}else if(direction==="next" && scrollProgress>=3){
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
				<CarrouselItem></CarrouselItem>
				<CarrouselItem></CarrouselItem>
				<CarrouselItem></CarrouselItem>
				<CarrouselItem></CarrouselItem>


			</div>
			<div className='scrollProgress'>
				{[...Array(scrollSize)].map((e,i)=>{
					return <div className={`step ${scrollProgress===i?"active":''}`}  onClick={()=>{scrollToPage(i)}} ></div>
				})}
			</div>

            <div className="controls next" onClick={()=>{scrollToNextPage("next")}}
                disabled={scrollSize<=1  || Math.ceil(scrollProgress)===100 }
            >&#10095;</div>
            <div className="controls prev" onClick={()=>{scrollToNextPage("prev")}}
                disabled={Math.floor(scrollProgress)===0}
            >&#10094;</div>

        </div>
    );

}

export default ProductsCarrousel;


const CarrouselItem = ({imageUrl,inverted=false,path="/", name=""}) => {
	return (
		<div className="carrousel-Item">
			<img className="foreground" src="https://images.unsplash.com/photo-1625687489204-d15818940ef8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80"></img>
			<img className="background" src="https://images.unsplash.com/photo-1625687489204-d15818940ef8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80"></img>

			<div className="content">
				<h1>Title</h1>

			</div>
		</div>
	)
}