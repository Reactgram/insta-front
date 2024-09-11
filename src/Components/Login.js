
import React,{useState, useContext, useEffect} from "react";
import LoggedUserContext from "../Context/LoggedUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const baseUrl = process.env.REACT_APP_BASE_URL
console.log(baseUrl);

const Login = () => {
       const [user, setUser] = useState({ email: "", password: ""});
       let {email, password} = user; 

      let {loggedUser,setLoggedUser} = useContext(LoggedUserContext);

      const navigate = useNavigate();
      
      // console.log(loggedUser);

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
            if(!email || !password){
              alert("Please fill all the fields");
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
                //  console.log(`${baseUrl}api/auth/login`);
               let loginResponse =  await axios.post(`${baseUrl}api/auth/login`, {email, password})

            //    console.log(signupResponse.data);

               setLoggedUser(loginResponse.data);
               // add user to localstorage: 
               let data_json = JSON.stringify(loginResponse.data);
               
               localStorage.setItem("loggedInUser", data_json);


               alert("Login Successfull");
               navigate("/dashboard");
            }
            catch(error){
                console.log(error);
            }
         



    }

    return(
        <div>
            <h1>Login</h1>

            <form onSubmit={hadleSubmit}>
               
                <div>
                   <input type="email" placeholder="Enter your email" name="email" onChange={updateUser}/>
                </div>
                <div>
                   <input type="password" placeholder="Enter your password" name="password"  onChange={updateUser}/>
                </div>
               
                <div>
                   <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;