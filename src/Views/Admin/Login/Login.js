
import './Login.scss';
import React, {useState} from "react"
import {axiosWithAuth} from '../../../Utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

function LoginPage() {

	const [userInfo,setUserInfo] = useState({username:"", password:""});
	const history = useHistory()

	const changeHandler = (e) => {
		e.preventDefault();
		setUserInfo({...userInfo, [e.target.name]:e.target.value});
	}

	const handleLogin = () => {
		console.log("Login with ", userInfo)

		axiosWithAuth().post("auth/login", userInfo).then(res=>{
			if(res.status && res.status===200){
				localStorage.setItem("token",res.data.token)
				history.push("/");
			}
		}).catch(err=>{
			console.log(err)
		})



	}

	return (
		<div className="login-wrapper page">
			<h1>Inicio de sesion</h1>
			<div className="form">
				<input name="username" onChange={changeHandler} type="text" placeholder="Usuario"/>
				<input name="password" onChange={changeHandler} type="password" placeholder="Contraseña"/>
				<button onClick={handleLogin}>Iniciar sesion</button>
			</div>
		</div>
	);
}

export default LoginPage;
