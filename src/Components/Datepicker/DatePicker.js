
import { useEffect, useState } from 'react';
import './DatePicker.scss';


function DatePicker({startDate='2021-07-22',endDate='2021-08-08', setFilter, filter}) {
	const [dates,setDates] = useState([])

	useEffect(()=>{
		let arr = [];
		let currDate = new Date(startDate);
		let strDate = startDate

		while(strDate < endDate){
			strDate = currDate.toISOString().slice(0,10);
			arr.push(strDate);
			currDate.setDate(currDate.getDate()+1)
		}
		setDates(arr);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const filterDate = (date) =>{
		if(date===filter){
			setFilter("")
		}else{
			setFilter(date);
		}
	}


	return (
		<div className="date-picker-wrapper">
			{dates.map((d,i)=>{
				return <div className="date-wrapper" onClick={()=>{filterDate(d)}}>
					<DateElement date={d} key={i} active={d===filter}/>
				</div>
			})}

		</div>
	);
}

export default DatePicker;



const DateElement = ({date, active}) => {
	
	const [day,setDay] = useState("");
	const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

	useEffect(()=>{
		setDay(String(days[new Date(date).getDay()]))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<>
			<div className="day">
				{day.slice(0,3)}
			</div>
			<div className={`month ${active?"active":""}`}>
				{String(date).slice(8,10)}
			</div>
		</>
	);


  };