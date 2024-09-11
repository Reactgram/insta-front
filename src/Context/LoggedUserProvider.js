import React, { useState,useEffect } from "react";
import LoggedUserContext from "./LoggedUserContext";


const LoggedUserProvider = (props) => {

     const [loggedUser, setLoggedUser] = useState(null);
     console.log(loggedUser);


     // check if user is already logged in: , from localstorage
   useEffect(()=>{
        let user_json = localStorage.getItem("loggedInUser");
        let user = JSON.parse(user_json);
        setLoggedUser(user);
   },[])
     
     return(
        <LoggedUserContext.Provider value={{loggedUser, setLoggedUser}}>
            {props.children}
        </LoggedUserContext.Provider>
     )

}

export default LoggedUserProvider;