import React,{useContext, useEffect} from "react";
import LoggedUserContext from "../Context/LoggedUserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Dashboard = () => {
   const {loggedUser, setLoggedUser} = useContext(LoggedUserContext);
    // console.log(loggedUser.data.name);
    // let token = loggedUser.data.token;
    let token = loggedUser?.data?.token;
    console.log(token);
    const navigate = useNavigate();


    
    useEffect(()=>{
         if(!loggedUser){
                navigate("/login");
         }
    },[loggedUser])


    async function logout(){
    try{
       const response = await axios.delete(`${baseUrl}api/auth/logout`,{
                headers:{
                    Authorization:token
                }
             })
        console.log(response.data);
        setLoggedUser(null);

        // delete logged in user from localstorage
        localStorage.removeItem("loggedInUser");
        }
    catch(error){
            console.log(error);
        }
             
    }


    return(

        <div>


            {loggedUser && <h1>Welcome {loggedUser.data.name}</h1>}


            <div> 
                <button onClick={logout}> Logout </button>
            </div>
        </div>
    )
}

export default Dashboard;