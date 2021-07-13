
import React, { useEffect, useState } from "react"
import {axiosWithAuth} from '../../../Utils/axiosWithAuth';
import './NewUser.scss';

function NewUser() {

	const [userInfo,setUserInfo] = useState({username:"", password:"", email:""});
	const [error,setError] = useState(null);

	const changeHandler = (e) => {
		e.preventDefault();
		setUserInfo({...userInfo, [e.target.name]:e.target.value});
	}

	const createNewUser = () => {
		if(!error){

			axiosWithAuth().post("auth/register", {name: userInfo.name, password: userInfo.password, email: userInfo.email}).then(res => {
				console.log(res);
			}).catch(err=>{
				console.log(err);
			})
		}
	}

	const generatePassword = () => {
		var length = 64,
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%",
			nPass = "";
		for (var i = 0, n = charset.length; i < length; ++i) {
			nPass += charset.charAt(Math.floor(Math.random() * n));
		}
		setUserInfo({...userInfo, password:nPass})
	}
	

	return (
		<div className="login-wrapper page">
			<h1>Crear nuevo usuario</h1>
			<div className="form">
				<input name="email" onChange={changeHandler} type="email" placeholder="Correo electronico"/>
				<input name="username" onChange={changeHandler} type="text" placeholder="Usuario"/>
				<div className="password">
					<input name="password" onChange={changeHandler} type="text" value={userInfo.password} placeholder="Contraseña"/>
					<button className="cta" onClick={generatePassword}>Generar contraseña</button>
				</div>
				<button onClick={createNewUser}>Iniciar sesion</button>
				{error?<p>{error}</p>:null}
			</div>
		</div>
	);
}

export default NewUser;
