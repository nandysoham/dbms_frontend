import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const SignupPageCustomer = () => {
    let navigate = useNavigate();

    const onChange =(e)=>{
        setsignup({...signup,[e.target.name]:e.target.value})
    }

    const [signup, setsignup] = useState({
        firstname :"",
        lastname : "",
        email:"",
        password:"",
        confirm_password:"",
        phone: "",
        address1 : "",
        address2 : "",
        city : "",
        state : "",
        country : "",
        pincode : "",
    })

    const submitsignup = async (profilePictures)=>{
        console.log(signup)
        let formData = new FormData();
        formData.append('firstname', signup.firstname);
        formData.append('lastname', signup.lastname)
        formData.append('email', signup.email);
        formData.append('password', signup.password);
        formData.append('phone', signup.phone);
        formData.append('address1', signup.address1);
        formData.append('address2', signup.address2);
        formData.append('city', signup.city);
        formData.append('state', signup.state);
        formData.append('country', signup.country);
        formData.append('pincode', signup.pincode);
        if(profilePictures.length != 0){
            formData.append('profilePicture', profilePictures[0])
        }

        console.log(formData)
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/createuser",{

            method :"POST",
            headers : {
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN
            },
            body : formData

        })


        const resp = await response.json()
        console.log(resp)

        // console.log(formData)
    }

    const handleClick = (e)=>{
        e.preventDefault();
        const profilePictures = e.target.profilePicture.files;
        submitsignup(profilePictures);
        
    }

    return (
        <div className="container my-4" style={{}}>
              <h2>User Signup</h2>
            <form onSubmit={handleClick}>
                <div class="form-row ">
                    <div class="form-group col-md-6 my-2">
                        <label for="inputEmail4">Email</label>
                        <input onChange={onChange} type="email" class="form-control" id="inputEmail4" placeholder="Email" name="email" />
                    </div>
                    <div class="form-group col-md-6 my-2">
                        <label for="inputPassword4">Password</label>
                        <input onChange={onChange} type="password" class="form-control" id="inputPassword4" placeholder="Password" name="password" />
                    </div>
                    <div class="form-group col-md-6 my-2">
                        <label for="inputPassword4">Confirm Password</label>
                        <input onChange={onChange} type="password" class="form-control" id="inputPassword4" placeholder="Password again" name="confirm_password" />
                    </div>


                    <div class="form-group col-md-6 my-2">
                        <label for="inputPassword4">Phone Number</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputPassword4" placeholder="XXXXXXXXXX" name="phone" />
                    </div>
                </div>
                
                <div class="form-group col-md-4 my-2">
                    <label for="inputAddress">First Name</label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress" placeholder="Paul" name="firstname" />
                </div>
                <div class="form-group col-md-4 my-2">
                    <label for="inputAddress2">Last Name</label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress2" placeholder="Walker" name="lastname" />
                </div>
                <div class="form-group my-2">
                    <label for="inputAddress">Address Line 1 </label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name="address1" />
                </div>
                <div class="form-group my-2">
                    <label for="inputAddress2">Address Line 2</label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="address2" />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6 my-2" >
                        <label for="inputCity">City</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputCity" name="city" />
                    </div>
                    <div class="form-group col-md-4 my-2">
                        <label for="inputState">State</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputState" name="state" />
                    </div>
                    <div class="form-group col-md-4 my-2">
                        <label for="inputCountry">Country</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputCountry" name="country" />
                    </div>
                    <div class="form-group col-md-2 my-2">
                        <label for="inputZip">Pincode</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputZip" name="pincode"/>
                    </div>
                </div>

                <div class="form-group" >
                                    <label for="blogpictures" className="my-2">Profile Picture</label>
                                    {/* <input type="file" class="form-control" id="blogpictures" name="blogpictures" aria-describedby="pictureHelp" /> */}
                                    <input className="form-control" type='file' multiple='multiple' accept='image/*' name='profilePicture' id='file' />

                                </div>
                


                <button type="submit" class="my-5 btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

export default SignupPageCustomer