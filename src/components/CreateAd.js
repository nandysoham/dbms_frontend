import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const AdPageSeller = () => {
    let navigate = useNavigate();

    const onChange =(e)=>{
        setsignup({...signup,[e.target.name]:e.target.value})
    }

    const [signup, setsignup] = useState({
        Description : "",
    })

    const submitsignup = async (profilePictures)=>{
        console.log(signup)
        let formData = new FormData();
        formData.append('description', signup.firstname);
        
        if(profilePictures.length != 0){
            formData.append('profilePicture', profilePictures[0])
        }

        console.log(formData)
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/createad",{

            method :"POST",
            headers : {
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },
            body : formData

        })


        const resp = await response.json()
        console.log(resp)
        alert(resp.msg)

        // console.log(formData)
    }

    const handleClick = (e)=>{
        e.preventDefault();
        const profilePictures = e.target.profilePicture.files;
        submitsignup(profilePictures);
        
    }

    return (
        <div className="container my-4" style={{}}>
              <h2>Ad Signup</h2>
            <form onSubmit={handleClick}>
                <div class="form-row ">
                    <div class="form-group col-md-6 my-2">
                        <label for="inputEmail4">Description</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputEmail4" placeholder="Enter Text" name="description" />
                    </div>
                
                </div>
                
               
                <div class="form-group" >
                                    <label for="blogpictures" className="my-2">Profile Picture</label>
                                    {/* <input type="file" class="form-control" id="blogpictures" name="blogpictures" aria-describedby="pictureHelp" /> */}
                                    <input className="form-control" type='file' multiple='multiple' accept='image/*' name='profilePicture' id='file' />

                                </div>
                


                <button type="submit" class="my-5 btn btn-primary">Get Ad in </button>
            </form>
        </div>
    )
}

export default AdPageSeller