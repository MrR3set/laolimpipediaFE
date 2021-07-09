import React from "react";
import {Route,Redirect} from "react-router-dom"

const PrivateRoute = ({component:Component, authorized, path,...rest})=>{
	console.log(authorized, String(path).replace("/admin", ""))
    return <Route
        {...rest}
        render={(props)=>{
            if(localStorage.getItem("token") && authorized)
                return <Component {...props} allowEdits={authorized}/>
            else
                return <Redirect to={String(path).replace("/admin", "")}/>
        }}
    />
}

export default PrivateRoute