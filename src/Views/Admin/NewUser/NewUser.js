
import React, { useEffect, useState } from "react"
import {axiosWithAuth} from '../../../Utils/axiosWithAuth';
import './NewUser.scss';
import Copy from "../../../Assets/Copy";

function NewUser() {

	const [userNewInfo,setNewUserInfo] = useState({username:"", password:"", email:""});
	const [userData, setUserData] = useState("");
	const [error,setError] = useState(null);

	const changeHandler = (e) => {
		e.preventDefault();
		setNewUserInfo({...userNewInfo, [e.target.name]:e.target.value});
	}

	const createNewUser = () => {
		if(!error){
			axiosWithAuth().post("auth/register", userNewInfo).then(res => {
				if(res.status===201){
					console.log(res.data.username);
					setUserData({username:res.data.username, password:userNewInfo.password});
				}else if(res.status===202){
					setError("Ese usuario ya existe");
				}
			}).catch(err=>{
				if(err.response && err.response.status && err.response.status===400){
					setError("Todos lo campos son requieridos");
				}
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
		setNewUserInfo({...userNewInfo, password:nPass})
	}

	const copyInformation = () => {
		const el = document.createElement('textarea');
		el.value = `Usuario: ${userData.username}\nContraseña: ${userData.password}`;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}
	
	return (
		<div className="new-user-wrapper page">
			{!userData?<>
				<h1>Crear nuevo usuario</h1>

				<div className="form">
					<input name="email" onChange={changeHandler} type="email" placeholder="Correo electronico"/>
					<input name="username" onChange={changeHandler} type="text" placeholder="Usuario"/>
					<div className="password">
						<input name="password" onChange={changeHandler} type="text" value={userNewInfo.password} placeholder="Contraseña"/>
						<button className="cta" onClick={generatePassword}>Generar contraseña</button>
					</div>
					<button onClick={createNewUser}>Crear usuario</button>
					{error?<p>{error}</p>:null}
				</div>

			</>:<>
				<h1>Datos del nuevo usuario</h1>
				<div className="user-info">
					<div>
						<label>Usuario:</label>
						<p>{userData.username}</p>
					</div>
					<div>
						<label>Contraseña:</label>
						<p>{userData.password}</p>
					</div>
					<div className="copyIconWrapper" onClick={copyInformation}>
						Copiar informacion <Copy/>
					</div>
				</div>
			</>}
		</div>
	);
}

export default NewUser;
