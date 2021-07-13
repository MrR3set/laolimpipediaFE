import React from "react";
import {Route,Redirect} from "react-router-dom"

const PrivateRoute = ({component:Component, authorized, path,...rest})=>{
	console.log(authorized)
    return <Route
        {...rest}
        render={(props)=>{
            if(localStorage.getItem("token") && authorized)
                return <Component {...props} allowEdits={authorized}/>
            else if (String(path).split("/").includes("/admin") &&  !String(path).split("/").includes("/auth"))
                return <Redirect to={String(path).replace("/admin", "")}/>
			else
				return <Redirect to={"/"}/>
        }}
    />
}

export default PrivateRoute