
import './Login.scss';
import React, {useEffect, useState} from "react"
import {axiosWithAuth} from '../../../Utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

function LoginPage({setAuthorized}) {

	const [userInfo,setUserInfo] = useState({username:"", password:""});
	const [error,setError] = useState(null);
	const history = useHistory()

	const changeHandler = (e) => {
		e.preventDefault();
		setUserInfo({...userInfo, [e.target.name]:e.target.value});
	}

	const handleLogin = () => {
		axiosWithAuth().post("auth/login", userInfo).then(res=>{
			if(res.status && res.status===200){
				localStorage.setItem("token",res.data.token)
				setAuthorized(true)
				history.push("/");
			}
		}).catch(err=>{
			if(err.response.status===401){
				setError("Contraseña o usuario incorrecto");
			}
		})
	}
	

	useEffect(()=>{
		if(localStorage.getItem("token")){
			history.push("/");
		}
	},[])

	return (
		<div className="login-wrapper page">
			<h1>Inicio de sesion</h1>
			<div className="form">
				<input name="username" onChange={changeHandler} type="text" placeholder="Usuario"/>
				<input name="password" onChange={changeHandler} type="password" placeholder="Contraseña"/>
				<button onClick={handleLogin}>Iniciar sesion</button>
				{error?<p>{error}</p>:null}
			</div>
		</div>
	);
}

export default LoginPage;
