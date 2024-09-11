
import React,{useState, useContext,useEffect} from "react";
import LoggedUserContext from "../Context/LoggedUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const baseUrl = process.env.REACT_APP_BASE_URL;
console.log(baseUrl);

const Signup = () => {
       const [user, setUser] = useState({name: "", email: "", password: "", confirmPassword: ""});
       let {name, email, password, confirmPassword} = user; 

      let {loggedUser,setLoggedUser} = useContext(LoggedUserContext);

      const navigate = useNavigate();

      useEffect(()=>{
         // console.log("I am in login page", loggedUser);
           if(loggedUser){
               console.log("I am in login page", loggedUser);
               navigate("/dashboard");
           }
     },[loggedUser])




    //   console.log(user);    
    function updateUser(e){
         let key = e.target.name;
         let value = e.target.value;
         setUser({...user, [key]: value});
    }

    async function hadleSubmit(e){
          e.preventDefault()
            if(!name || !email || !password || !confirmPassword){
              alert("Please fill all the fields");
              return 
            }
            if(password !== confirmPassword){
                alert("Password and Confirm Password should be same");
                return
            }
            // try{
            //     let signupResponse = await axios.post("https://node-backend-seven-brown.vercel.app/api/auth/signup", {name, email, password})

            //     console.log(signupResponse);
            // }
            // catch(error){
            //     console.log(error);
            // }

            // baseurl followed by axios:

            // let baseUrl = "https://node-backend-seven-brown.vercel.app/";

            try{
               let signupResponse =  await axios.post(`${baseUrl}api/auth/signup`, {name, email, password})

            //    console.log(signupResponse.data);

               setLoggedUser(signupResponse.data);

               // add user to localstorage: 
               let data_json = JSON.stringify(signupResponse.data);
               
               localStorage.setItem("loggedInUser", data_json);

               // redirect to dashboard
               navigate("/dashboard");
            }
            catch(error){
                console.log(error);
            }
         



    }

    return(
        <div>
            <h1>Signup</h1>

            <form onSubmit={hadleSubmit}>
                <div>
                   <input type="text" placeholder="Enter your name" name="name" onChange={updateUser}/>
                </div>
                <div>
                   <input type="email" placeholder="Enter your email" name="email" onChange={updateUser}/>
                </div>
                <div>
                   <input type="password" placeholder="Enter your password" name="password"  onChange={updateUser}/>
                </div>
                <div>
                   <input type="password" placeholder="Confirm your password"  name="confirmPassword" onChange={updateUser}/>
                </div>
                <div>
                   <button type="submit">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;