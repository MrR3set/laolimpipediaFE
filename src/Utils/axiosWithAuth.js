import axios from "axios"

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token")
    return axios.create({
        baseURL:"https://laolimpipedia-be-testing.herokuapp.com/api",
        headers:{
            authorization:token
        }
    })
}