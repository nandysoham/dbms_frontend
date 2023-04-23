import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


// env.config({ path: __dirname + '/./../.env' })
const LoginPageCustomer = () => {
    let navigate = useNavigate();
    const [signin, setsignin] = useState({email:"", password:""})

    const onChange =(e)=>{
        setsignin({...signin,[e.target.name]:e.target.value})
    }


    const submitsignin = async(email,password)=>{
        console.log("hello you just submitted your form");
        console.log(email, password);
        console.log(process.env.REACT_APP_BACKENDURL)

    
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/customer/login",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN
            },
            body : JSON.stringify({email,password})

        })

        const token = await response.json();
        console.log(token)

        // // you can ideally pass a success parameter for everything
        if(token.success == "true"){
            console.log(token.authtoken);
            localStorage.setItem("authtoken",token.authtoken);
            localStorage.setItem("user","customer");
            localStorage.setItem("firstname",token.user.firstname);
            localStorage.setItem("picture",token.user.profilePicture.img);
            navigate("../", { replace: true });
        }
        else{
            alert(token.msg)
            
        }
    }

    const handleClick = (e)=>{
        e.preventDefault();
        submitsignin(signin.email, signin.password);
        // setsignin({email:"", password:""})    // open this if you want your user to reenter the credentials after he logged out
    }


  return (
    <div>
        
      <div className="container" style={{minHeight: "100vh", width:"50vw"}}>
      <div className="container">
        <h2 className="my-5 text-center " style={{ paddingTop:"80px"}}> User Login</h2>
    </div>
        <form onSubmit={handleClick}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name = "email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
              placeholder="Password"
              onChange={onChange} 
            />
          </div>
          
          <button type="submit" class="my-3 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPageCustomer;
