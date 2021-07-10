
import { useEffect, useState } from 'react';
import './DatePicker.scss';


function DatePicker({startDate='2021-07-22',endDate='2021-08-08'}) {


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
	},[])


	return (
		<div className="date-picker-wrapper">
			{dates.map((d,i)=>{
				return <DateElement date={d} key={i}/>
			})}

		</div>
	);
}

export default DatePicker;



const DateElement = ({date}) => {
	
	
	const [day,setDay] = useState("");
	const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

	useEffect(()=>{
		setDay(String(days[new Date(date).getDay()]))
	},[])

	return (
		<div className="date-wrapper">
			<div className="day">
				{day.slice(0,3)}
			</div>
			<div className="month">
				{String(date).slice(8,10)}
			</div>
		</div>

	);


  };